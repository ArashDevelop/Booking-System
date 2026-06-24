'use client'

import { useState } from 'react'
import { Link } from '@/lib/navigation'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/Spinner'
import type { ButtonProps } from '@/components/ui/button'

interface NavButtonProps extends ButtonProps {
  href: string
  label: string
  loadingLabel?: string
}

export default function NavButton({ href, label, loadingLabel, ...buttonProps }: NavButtonProps) {
  const [navigating, setNavigating] = useState(false)

  return (
    <Link
      href={href}
      prefetch={true}
      onClick={() => setNavigating(true)}
    >
      <Button disabled={navigating} {...buttonProps}>
        {navigating && <Spinner className="mr-2" />}
        {navigating ? (loadingLabel || label) : label}
      </Button>
    </Link>
  )
}
