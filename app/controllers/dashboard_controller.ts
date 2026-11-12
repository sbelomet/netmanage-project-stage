import ClientAdmin from '#models/client_admin'
import { clientNameToSlug } from '#services/client_slug_service'
import type Department from '#models/department'
import DepartmentMembership from '#models/department_membership'
import type { HttpContext } from '@adonisjs/core/http'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default class DashboardController {
  async show({ auth, inertia }: HttpContext) {
    const userId = auth.user!.id

    const [clientAdmins, departmentMemberships] = await Promise.all([
      ClientAdmin.query().where('userId', userId).preload('client').orderBy('id', 'asc'),
      DepartmentMembership.query()
        .where('userId', userId)
        // @ts-expect-error Lucid's relation inference drops this valid relation in this recursive model graph
        .preload('department', (query: ModelQueryBuilderContract<typeof Department>) =>
          query.preload('client')
        )
        .preload('role')
        .orderBy('id', 'asc'),
    ])

    return inertia.render('dashboard', {
      clientAdmins: clientAdmins.map((clientAdmin) => ({
        id: clientAdmin.id,
        clientId: clientAdmin.client.id,
        name: clientAdmin.client.name ?? 'Unnamed client',
        clientSlug: clientNameToSlug(clientAdmin.client.name ?? 'Unnamed client'),
      })),
      departmentMemberships: departmentMemberships.map((membership) => ({
        id: membership.id,
        departmentId: membership.department.id,
        name: membership.department.name ?? 'Unnamed department',
        clientName: membership.department.client.name ?? 'Unnamed client',
        clientSlug: clientNameToSlug(membership.department.client.name ?? 'Unnamed client'),
        role: membership.role.name,
      })),
    })
  }
}
