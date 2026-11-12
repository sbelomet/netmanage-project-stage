import AppLayout from '~/layouts/app'
import Page from '~/components/page'
import Section from '~/components/section'

type DepartmentPageProps = {
  departmentName: string
  clientName: string
  isDepartmentAdmin: boolean
  members: {
    id: number
    name: string | null
    email: string
    role: string
  }[]
}

export default function DepartmentShow({
  departmentName,
  clientName,
  isDepartmentAdmin,
  members,
}: DepartmentPageProps) {
  return (
    <Page
      title={`Welcome to ${clientName}'s ${departmentName} department`}
      description="Happy learning!"
    >
      {isDepartmentAdmin && (
        <Section title="Manage members" titleLevel={2}>
          {members.length > 0 ? (
            <ul>
              {members.map((member) => (
                <li key={member.id}>
                  {member.name ? `${member.name} (${member.email})` : member.email} - {member.role}
                </li>
              ))}
              <button>Add Member</button>
            </ul>
          ) : (
            <p>No members in this department yet.</p>
          )}
        </Section>
      )}
    </Page>
  )
}

DepartmentShow.layout = [AppLayout]
