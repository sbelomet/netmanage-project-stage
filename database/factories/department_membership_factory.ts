import factory from '@adonisjs/lucid/factories'
import DepartmentMembership from '#models/department_membership'

export const DepartmentMembershipFactory = factory
  .define(DepartmentMembership, async ({ faker }) => {
    return {
      isAdmin: faker.datatype.boolean(),
    }
  })
  .build()
