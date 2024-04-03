import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymsUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository

let sut: CreateGymsUseCase

describe('Register use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymsUseCase(gymsRepository)
  })

  it('should able to create a new user', async () => {
    const { gym } = await sut.execute({
      name: 'Javascript academy',
      description: null,
      phone: null,
      latitude: -22.8571124,
      longitude: -43.0686464,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
