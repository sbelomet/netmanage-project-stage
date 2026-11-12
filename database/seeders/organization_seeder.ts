import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ClientFactory } from '#database/factories/client_factory'
import { ClientAdminFactory } from '#database/factories/client_admin_factory'
import { DepartmentFactory } from '#database/factories/department_factory'
import { DepartmentMembershipFactory } from '#database/factories/department_membership_factory'
import { UserFactory } from '#database/factories/user_factory'
import Role from '#models/role'

export default class OrganizationSeeder extends BaseSeeder {
  async run() {
    const memberRole = await Role.findByOrFail('name', 'member')
    const adminRole = await Role.findByOrFail('name', 'admin')
    const clientGroups = []

    for (let index = 0; index < 3; index++) {
      const client = await ClientFactory.create()
      const departments = await DepartmentFactory.merge({ clientId: client.id }).createMany(4)
      clientGroups.push({ client, departments })
    }

    const users = await UserFactory.createMany(5)

    for (const [userIndex, user] of users.entries()) {
      const clientGroup = clientGroups[userIndex % clientGroups.length]
      if (!clientGroup) {
        throw new Error('Expected a client group for each user')
      }

      const isClientAdmin = Math.random() < 0.5

      if (isClientAdmin) {
        await ClientAdminFactory.merge({
          userId: user.id,
          clientId: clientGroup.client.id,
        }).create()
        continue
      }

      const availableDepartments = [...clientGroup.departments]
      const departmentCount = Math.floor(Math.random() * (availableDepartments.length - 1)) + 1
      const departmentsForUser = []

      for (let index = 0; index < departmentCount; index++) {
        const departmentIndex = Math.floor(Math.random() * availableDepartments.length)
        const [department] = availableDepartments.splice(departmentIndex, 1)
        if (department) {
          departmentsForUser.push(department)
        }
      }

      for (const department of departmentsForUser) {
        await DepartmentMembershipFactory.merge({
          userId: user.id,
          departmentId: department.id,
          roleId: Math.random() < 0.5 ? memberRole.id : adminRole.id,
        }).create()
      }
    }
  }
}
