import AppLayout from '~/layouts/app'
import Page from '~/components/page'

type DepartmentPageProps = {
  departmentName: string
  clientName: string
}

export default function DepartmentShow({ departmentName, clientName }: DepartmentPageProps) {
  return (
    <Page title={`Welcome to ${clientName}'s ${departmentName} department`} description={`Happy learning!`} />
  )
}

DepartmentShow.layout = [AppLayout]
