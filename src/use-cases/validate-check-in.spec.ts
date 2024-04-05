import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidadeCheckInUseCase } from './validate-check-in'
import { ResourceNotFindError } from './errors/resource-not-find-error'
import { LateCheckInValidateError } from './errors/late-check-in-validation-error'

let checkinRepository: InMemoryCheckinsRepository
let sut: ValidadeCheckInUseCase

describe('Validate checkin use case', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckinsRepository()
    sut = new ValidadeCheckInUseCase(checkinRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should able to validate the check-in', async () => {
    const createdCheckIn = await checkinRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkinRepository.checkins[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFindError)
  })

  it('should not be able to validate the checkins, after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkinRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    const twentyOntMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOntMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })
})
