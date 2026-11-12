import Client from '#models/client'
import Department from '#models/department'
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

    return inertia.render('departments/show', {
      departmentName: department.name ?? 'Unnamed department',
      clientName,
    })
  }
}
