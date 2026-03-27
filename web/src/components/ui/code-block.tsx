import { type ComponentProps, useEffect, useRef } from 'react'
import { codeToHtml } from 'shiki'
import { twMerge } from 'tailwind-merge'

interface CodeBlockProps extends ComponentProps<'div'> {
	code: string
	language?: string
}

export function CodeBlock({
	className,
	code,
	language = 'json',
	...props
}: CodeBlockProps) {
	const divRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (code && divRef.current) {
			codeToHtml(code, { lang: language, theme: 'vesper' }).then((parsed) => {
				if (divRef.current) {
					divRef.current.innerHTML = parsed
				}
			})
		}
	}, [code, language])

	return (
		<div
			className={twMerge(
				'relative rounded-lg border border-zinc-700 overflow-x-auto',
				className,
			)}
			{...props}
		>
			<div
				ref={divRef}
				className="[&_pre]:p-4 [&_pre]:text-sm [&_pre]:font-mono [&_pre]:leading-relaxed"
			/>
		</div>
	)
}
