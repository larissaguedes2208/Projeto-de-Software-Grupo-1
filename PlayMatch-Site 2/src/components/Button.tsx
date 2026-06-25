import { Link, type To } from 'react-router-dom'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  to?: To
  state?: unknown
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  disabled?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-primary/40',
  secondary:
    'bg-white text-dark border-2 border-slate-200 hover:border-primary hover:text-primary',
  outline:
    'bg-transparent text-white border-2 border-white/40 hover:bg-white/10 hover:border-white',
  ghost: 'bg-transparent text-slate-600 hover:text-primary hover:bg-primary-light/50',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  state,
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} state={state} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}
