import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Nearby gym',
        description: 'Some description',
        phone: '2199999999',
        latitude: -22.8571124,
        longitude: -43.0686464,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Far gym',
        description: 'Some description',
        phone: '2199999999',
        latitude: -22.5611978,
        longitude: -42.7083367,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -22.8571124, longitude: -43.0686464 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Nearby gym',
      }),
    ])
  })
})
