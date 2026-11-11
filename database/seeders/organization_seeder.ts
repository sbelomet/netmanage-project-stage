import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ClientFactory } from '#database/factories/client_factory'
import { ClientMembershipFactory } from '#database/factories/client_membership_factory'
import { DepartmentFactory } from '#database/factories/department_factory'
import { DepartmentMembershipFactory } from '#database/factories/department_membership_factory'
import { UserFactory } from '#database/factories/user_factory'

export default class OrganizationSeeder extends BaseSeeder {
  async run() {
    const client = await ClientFactory.create()
    const departments = await DepartmentFactory.merge({ clientId: client.id }).createMany(3)
    const users = await UserFactory.createMany(3)

    for (const [index, user] of users.entries()) {
      await ClientMembershipFactory.merge({
        userId: user.id,
        clientId: client.id,
        isAdmin: index === 0,
      }).create()

      for (const [departmentIndex, department] of departments.entries()) {
        await DepartmentMembershipFactory.merge({
          userId: user.id,
          departmentId: department.id,
          isAdmin: index === 1 && departmentIndex === 0,
        }).create()
      }
    }
  }
}
