import Page from '~/components/page'
import Section from '~/components/section'
import AppLayout from '~/layouts/app'

type ClientMembership = {
  id: number
  name: string
  role: string
}

type DepartmentMembership = {
  id: number
  name: string
  clientName: string
  role: string
}

type DashboardProps = {
  clientMemberships: ClientMembership[]
  departmentMemberships: DepartmentMembership[]
}

export default function Dashboard({ clientMemberships, departmentMemberships }: DashboardProps) {
  return (
    <Page title="Dashboard" description="These are the clients and departments you have access to.">
      <Section title="Clients" description="Your client memberships">
        {clientMemberships.length > 0 ? (
          <ul className="access-grid">
            {clientMemberships.map((membership) => (
              <li className="panel access-card" key={membership.id}>
                <div>
                  <h3 className="access-card__name">{membership.name}</h3>
                  <p className="access-card__context">Client</p>
                </div>
                <span className="access-role">{membership.role}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="access-empty">You don&apos;t have access to any clients yet.</p>
        )}
      </Section>

      <Section
        title="Departments"
        description="Your department access, including access inherited from client admin roles"
      >
        {departmentMemberships.length > 0 ? (
          <ul className="access-grid">
            {departmentMemberships.map((membership) => (
              <li className="panel access-card" key={membership.id}>
                <div>
                  <h3 className="access-card__name">{membership.name}</h3>
                  <p className="access-card__context">{membership.clientName}</p>
                </div>
                <span className="access-role">{membership.role}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="access-empty">You don&apos;t have access to any departments yet.</p>
        )}
      </Section>
    </Page>
  )
}

Dashboard.layout = [AppLayout]
