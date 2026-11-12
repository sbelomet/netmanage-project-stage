import AppLayout from '~/layouts/app'
import Page from '~/components/page'

type ClientAdminPageProps = {
  clientName: string
}

export default function ClientAdminShow({ clientName }: ClientAdminPageProps) {
  return (
    <Page
      title={`Welcome to ${clientName}'s admin page`}
      description="Manage department memberships and content for this company."
    />
  )
}

ClientAdminShow.layout = [AppLayout]
