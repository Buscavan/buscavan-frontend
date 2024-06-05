interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({
  children,
  className = '',
}: ContainerProps) {
  return (
    <section className={`w-full h-fit px-32 py-12 ${className}`}>
      {children}
    </section>
  )
}
