import { Link } from 'react-router-dom'

const LOGO_SRC = '/playmatch-logo.png'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
  asLink?: boolean
}

const sizes = {
  sm: { img: 'h-10 w-10', text: 'text-lg' },
  md: { img: 'h-12 w-12', text: 'text-xl' },
  lg: { img: 'h-24 w-24 sm:h-28 sm:w-28', text: 'text-3xl sm:text-4xl' },
  xl: { img: 'h-32 w-32 sm:h-36 sm:w-36', text: 'text-3xl sm:text-4xl' },
}

export default function Logo({
  size = 'md',
  showText = true,
  className = '',
  asLink = true,
}: LogoProps) {
  const s = sizes[size]

  const content = (
    <>
      <img
        src={LOGO_SRC}
        alt="PlayMatch"
        className={`${s.img} object-contain shrink-0 group-hover:scale-105 transition-transform`}
      />
      {showText && (
        <span className={`${s.text} font-bold`}>
          <span className="text-secondary">Play</span>
          <span className="text-primary">Match</span>
        </span>
      )}
    </>
  )

  const classes = `flex items-center gap-2.5 group shrink-0 ${className}`

  if (asLink && size !== 'lg' && size !== 'xl') {
    return (
      <Link to="/" className={classes}>
        {content}
      </Link>
    )
  }

  return <div className={classes}>{content}</div>
}

export { LOGO_SRC }
