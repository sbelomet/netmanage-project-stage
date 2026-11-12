import ClientMembership from '#models/client_membership'
import type Client from '#models/client'
import type Department from '#models/department'
import DepartmentMembership from '#models/department_membership'
import type { HttpContext } from '@adonisjs/core/http'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default class DashboardController {
  async show({ auth, inertia }: HttpContext) {
    const userId = auth.user!.id

    const [clientMemberships, departmentMemberships] = await Promise.all([
      ClientMembership.query()
        .where('userId', userId)
        .preload('client', (query: ModelQueryBuilderContract<typeof Client>) =>
          query.preload('departments')
        )
        .preload('role')
        .orderBy('id', 'asc'),
      DepartmentMembership.query()
        .where('userId', userId)
        // @ts-expect-error Lucid's relation inference drops this valid relation in this recursive model graph
        .preload('department', (query: ModelQueryBuilderContract<typeof Department>) =>
          query.preload('client')
        )
        .preload('role')
        .orderBy('id', 'asc'),
    ])

    const departmentAccess = new Map<
      number,
      { id: number; name: string; clientName: string; role: string }
    >()

    for (const membership of departmentMemberships) {
      departmentAccess.set(membership.department.id, {
        id: membership.department.id,
        name: membership.department.name ?? 'Unnamed department',
        clientName: membership.department.client.name ?? 'Unnamed client',
        role: membership.role.name,
      })
    }

    for (const membership of clientMemberships) {
      if (membership.role.name !== 'admin') continue

      for (const department of membership.client.departments) {
        departmentAccess.set(department.id, {
          id: department.id,
          name: department.name ?? 'Unnamed department',
          clientName: membership.client.name ?? 'Unnamed client',
          role: 'admin',
        })
      }
    }

    return inertia.render('dashboard', {
      clientMemberships: clientMemberships.map((membership) => ({
        id: membership.id,
        name: membership.client.name ?? 'Unnamed client',
        role: membership.role.name,
      })),
      departmentMemberships: [...departmentAccess.values()],
    })
  }
}
