import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkinRepository: InMemoryCheckinsRepository
let sut: GetUserMetricsUseCase

describe('Fetch user check-in history use case', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckinsRepository()
    sut = new GetUserMetricsUseCase(checkinRepository)
  })

  it('should able to get check-ins count from metrics', async () => {
    await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkinRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
