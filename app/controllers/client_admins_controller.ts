import Client from '#models/client'
import Department from '#models/department'
import DepartmentMembership from '#models/department_membership'
import { clientNameToSlug } from '#services/client_slug_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientAdminsController {
  async show({ bouncer, inertia, params, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const clientName = client.name ?? 'Unnamed client'

    if (clientNameToSlug(clientName) !== params.clientSlug) {
      return response.abort(404)
    }

    await bouncer.authorize('viewClientAdminPage', client)
    const departments = await Department.query().where('clientId', client.id).orderBy('name', 'asc')
    const departmentIds = departments.map((department) => department.id)
    const memberships = departmentIds.length
      ? await DepartmentMembership.query()
          .whereIn('departmentId', departmentIds)
          .preload('user')
          .preload('role')
          .orderBy('id', 'asc')
      : []
    const membersByDepartment = new Map<
      number,
      { id: number; name: string | null; email: string; role: string }[]
    >()

    for (const membership of memberships) {
      const members = membersByDepartment.get(membership.departmentId) ?? []
      members.push({
        id: membership.id,
        name: membership.user.fullName,
        email: membership.user.email,
        role: membership.role.name,
      })
      membersByDepartment.set(membership.departmentId, members)
    }

    return inertia.render('clients/admin/show', {
      clientName,
      departments: departments.map((department) => ({
        id: department.id,
        name: department.name ?? 'Unnamed department',
        members: membersByDepartment.get(department.id) ?? [],
      })),
    })
  }
}
