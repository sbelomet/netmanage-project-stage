import factory from '@adonisjs/lucid/factories'
import DepartmentMembership from '#models/department_membership'
import Role from '#models/role'

export const DepartmentMembershipFactory = factory
  .define(DepartmentMembership, async () => {
    return {}
  })
  .build()
