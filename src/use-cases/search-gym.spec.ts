import { beforeEach, describe, expect, it } from 'vitest'

import { SearchGymUseCase } from './search-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search gym uses case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should able to fetch search for gym', async () => {
    await gymsRepository.create({
      name: 'Javascript gym',
      description: null,
      phone: null,
      latitude: -22.8571124,
      longitude: -43.0686464,
    })

    await gymsRepository.create({
      name: 'Node gym',
      description: null,
      phone: null,
      latitude: -22.8571124,
      longitude: -43.0686464,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Javascript gym' })])
  })

  it('should able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Javascript gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.8571124,
        longitude: -43.0686464,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Javascript gym 21' }),
      expect.objectContaining({ name: 'Javascript gym 22' }),
    ])
  })
})
