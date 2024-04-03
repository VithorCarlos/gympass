import fastify from 'fastify'
import { appRoute } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoute)

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
