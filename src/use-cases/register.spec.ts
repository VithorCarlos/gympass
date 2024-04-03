import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it("should contain the hash of the user's password at the time of registration", async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'a@b.com',
      password: '123456',
    })

    const passowrdIsCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(passowrdIsCorrectlyHashed).toBe(true)
  })

  it('should not able to register a user with same email twice', async () => {
    const email = 'johndoe@exemple.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(
      async () =>
        await sut.execute({
          name: 'John Doe',
          email,
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should able to create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'a@b.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
