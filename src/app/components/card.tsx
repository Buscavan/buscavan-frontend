export default function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`min-h-24 h-fit rounded-lg shadow-sm bg-white border border-zinc-200 px-6 py-6 ${className}`}
    >
      {children}
    </div>
  )
}
