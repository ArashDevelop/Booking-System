interface AlertProps {
  severity: 'success' | 'error'
  children: React.ReactNode
}

const styles = {
  success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
}

export default function Alert({ severity, children }: AlertProps) {
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${styles[severity]}`}>
      {children}
    </div>
  )
}
