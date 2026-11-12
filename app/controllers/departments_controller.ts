import Client from '#models/client'
import Department from '#models/department'
import type { HttpContext } from '@adonisjs/core/http'

export default class DepartmentsController {
  async show({ bouncer, inertia, params, response }: HttpContext) {
    const department = await Department.findOrFail(params.id)
    const client = await Client.findOrFail(department.clientId)
    const clientName = client.name ?? 'Unnamed client'

    if (clientName !== params.clientName) {
      return response.abort(404)
    }

    await bouncer.authorize('viewDepartmentContent', department)

    return inertia.render('departments/show', {
      departmentName: department.name ?? 'Unnamed department',
      clientName,
    })
  }
}
