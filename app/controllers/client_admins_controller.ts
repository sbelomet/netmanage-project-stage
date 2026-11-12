import Client from '#models/client'
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

    return inertia.render('clients/admin/show', {
      clientName,
    })
  }
}
