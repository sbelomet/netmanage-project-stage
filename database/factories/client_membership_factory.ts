import factory from '@adonisjs/lucid/factories'
import ClientMembership from '#models/client_membership'

export const ClientMembershipFactory = factory
  .define(ClientMembership, async ({ faker }) => {
    return {
      isAdmin: faker.datatype.boolean(),
    }
  })
  .build()
