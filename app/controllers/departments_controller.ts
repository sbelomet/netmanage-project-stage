import Client from '#models/client'
import Department from '#models/department'
import DepartmentMembership from '#models/department_membership'
import { clientNameToSlug } from '#services/client_slug_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class DepartmentsController {
  async show({ bouncer, inertia, params, response }: HttpContext) {
    const department = await Department.findOrFail(params.id)
    const client = await Client.findOrFail(department.clientId)
    const clientName = client.name ?? 'Unnamed client'

    if (clientNameToSlug(clientName) !== params.clientSlug) {
      return response.abort(404)
    }

    await bouncer.authorize('viewDepartmentContent', department)
    const isDepartmentAdmin = await bouncer.allows('manageDepartment', department)
    const memberships = isDepartmentAdmin
      ? await DepartmentMembership.query()
          .where('departmentId', department.id)
          .preload('user')
          .preload('role')
          .orderBy('id', 'asc')
      : []

    return inertia.render('departments/show', {
      departmentName: department.name ?? 'Unnamed department',
      clientName,
      isDepartmentAdmin,
      members: memberships.map((membership) => ({
        id: membership.id,
        name: membership.user.fullName,
        email: membership.user.email,
        role: membership.role.name,
      })),
    })
  }
}
