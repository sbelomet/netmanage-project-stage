import Page from '~/components/page'
import Section from '~/components/section'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

type ClientAdmin = {
  id: number
  clientId: number
  name: string
}

type DepartmentMembership = {
  id: number
  departmentId: number
  name: string
  clientName: string
  role: string
}

type DashboardProps = {
  clientAdmins: ClientAdmin[]
  departmentMemberships: DepartmentMembership[]
}

export default function Dashboard({ clientAdmins, departmentMemberships }: DashboardProps) {
  return (
    <Page title="Dashboard" description="Welcome back !">
      {clientAdmins.length > 0 && (
        <Section title="Client administration" description="Manage your company's content">
          <ul className="access-grid">
            {clientAdmins.map((clientAdmin) => (
              <li key={clientAdmin.id}>
                <Link
                  route="clients.admin.show"
                  routeParams={{
                    clientName: clientAdmin.name,
                    id: clientAdmin.clientId,
                  }}
                  className="panel access-card access-card--link"
                >
                  <div>
                    <h3 className="access-card__name">{clientAdmin.name}</h3>
                  </div>
                  <span className="access-role">Admin</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Memberships" description="Your department memberships">
        {departmentMemberships.length > 0 ? (
          <ul className="access-grid">
            {departmentMemberships.map((membership) => (
              <li key={membership.id}>
                <Link
                  route="departments.show"
                  routeParams={{
                    clientName: membership.clientName,
                    id: membership.departmentId,
                  }}
                  className="panel access-card access-card--link"
                >
                  <div>
                    <h3 className="access-card__name">{membership.name}</h3>
                    <p className="access-card__context">{membership.clientName}</p>
                  </div>
                  <span className="access-role">{membership.role}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="access-empty">You don&apos;t have any memberships yet.</p>
        )}
      </Section>
    </Page>
  )
}

Dashboard.layout = [AppLayout]
