import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientAdminsController {
  async show({ bouncer, inertia, params, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const clientName = client.name ?? 'Unnamed client'

    if (clientName !== params.clientName) {
      return response.abort(404)
    }

    await bouncer.authorize('viewClientAdminPage', client)

    return inertia.render('clients/admin/show', {
      clientName,
    })
  }
}
