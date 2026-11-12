import AppLayout from '~/layouts/app'
import Page from '~/components/page'
import Section from '~/components/section'

type ClientAdminPageProps = {
  clientName: string
  departments: {
    id: number
    name: string
    members: {
      id: number
      name: string | null
      email: string
      role: string
    }[]
  }[]
}

export default function ClientAdminShow({ clientName, departments }: ClientAdminPageProps) {
  return (
    <Page
      title={`Welcome to ${clientName}'s admin page`}
      description="Manage department memberships and content for this company."
    >
      <Section title="Manage members" titleLevel={2}>
        {departments.length > 0 ? (
          departments.map((department) => (
            <Section key={department.id} title={department.name} titleLevel={3}>
              {department.members.length > 0 ? (
                <ul>
                  {department.members.map((member) => (
                    <li key={member.id}>
                      {member.name ? `${member.name} (${member.email})` : member.email} -{' '}
                      {member.role}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No members in this department yet.</p>
              )}
            </Section>
          ))
        ) : (
          <p>No departments yet.</p>
        )}
      </Section>
      <Section title='Manage content' titleLevel={2}>
        {departments.length > 0 ? (
          departments.map((department) => (
            <Section key={department.id} title={department.name} titleLevel={3}>
              {
                <p>No content in this department yet.</p>
              }
            </Section>
          ))
        ) : (
          <p>No departments yet.</p>
        )}
      </Section>
    </Page>
  )
}

ClientAdminShow.layout = [AppLayout]
