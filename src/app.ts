import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkinsRoutes } from './http/controllers/check-ins/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(cookie)
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkinsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Here, we should log to an external tool like Datalog, New Relic, or Sentry.
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
