interface ChipProps {
  label: string
  variant?: 'success' | 'default'
}

export default function Chip({ label, variant = 'default' }: ChipProps) {
  const styles = variant === 'success'
    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
    : 'bg-muted text-muted-foreground'

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}>
      {label}
    </span>
  )
}
