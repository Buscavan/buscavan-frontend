export default function Background({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="w-full h-full min-h-[90vh] bg-zinc-50">{children}</div>
}
