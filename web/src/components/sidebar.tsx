import { CopyIcon } from 'lucide-react'
import { Suspense } from 'react'
import logotype from '../assets/logotype.svg'
import { IconButton } from './ui/icon-button'
import { WebhooksList } from './webhooks-list'

export function Sidebar() {
	return (
		<div className="flex h-screen flex-col">
			<div className="flex items-center justify-between border-b border-zinc-700 px-4 py-5">
				<div className="flex items-baseline">
					<img src={logotype} alt="Logo" className="h-10" />
				</div>
			</div>

			<div className="flex items-center gap-2 border-b border-b-zinc-700 bg-zinc-800 px-4 py-2.5">
				<div className="flex-1 min-w-0 flex items-center gap-1 text-xs font-mono text-zinc-300">
					<span className="truncate">https://api.example.com/webhooks</span>
				</div>
				<IconButton icon={<CopyIcon className="size-4" />} />
			</div>

			<Suspense fallback={<p>Loading...</p>}>
				<WebhooksList />
			</Suspense>
		</div>
	)
}
