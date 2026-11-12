import AppLayout from '~/layouts/app'
import Page from '~/components/page'
import Section from '~/components/section'

type DepartmentPageProps = {
  departmentName: string
  clientName: string
  isDepartmentAdmin: boolean
}

export default function DepartmentShow({
  departmentName,
  clientName,
  isDepartmentAdmin,
}: DepartmentPageProps) {
  return (
    <Page
      title={`Welcome to ${clientName}'s ${departmentName} department`}
      description="Happy learning!"
    >
      {isDepartmentAdmin && <Section title="Department administration" description="You're a department admin">-</Section>}
    </Page>
  )
}

DepartmentShow.layout = [AppLayout]
