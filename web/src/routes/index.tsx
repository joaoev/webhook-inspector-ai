import { createFileRoute } from '@tanstack/react-router'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { Sidebar } from '../components/sidebar'

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {
	return (
		<div className="h-screen bg-zinc-900">
			<Group orientation="horizontal">
				<Panel defaultSize="20%" minSize="15%" maxSize="40%">
					<Sidebar />
				</Panel>
				<Separator />
				<Panel minSize="60%" defaultSize="80%">
					right
				</Panel>
			</Group>
		</div>
	)
}
