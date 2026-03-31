type PageHeaderProps = {
  title: string
  subtitle: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="header">
      <div>
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>
    </header>
  )
}
