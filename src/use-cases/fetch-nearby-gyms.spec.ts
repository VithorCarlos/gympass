import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should able to fetch search for gym', async () => {
    await gymsRepository.create({
      name: 'Near gym',
      description: null,
      phone: null,
      latitude: -22.8571124,
      longitude: -43.0686464,
    })

    await gymsRepository.create({
      name: 'Far gym',
      description: null,
      phone: null,
      latitude: -22.5611978,
      longitude: -42.7083367,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.8571124,
      userLongitude: -43.0686464,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near gym' })])
  })
})
