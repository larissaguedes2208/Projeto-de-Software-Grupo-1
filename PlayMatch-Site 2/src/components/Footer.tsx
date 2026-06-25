import { Share2, Globe, MessageCircle } from 'lucide-react'
import Logo from './Logo'

const socialLinks = [
  { icon: Share2, label: 'Instagram', href: 'https://instagram.com/playmatch' },
  { icon: Globe, label: 'Facebook', href: 'https://facebook.com/playmatch' },
  { icon: MessageCircle, label: 'Twitter', href: 'https://twitter.com/playmatch' },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center text-center gap-8">
          <Logo size="xl" showText={false} asLink={false} />

          <div className="flex items-center justify-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center text-slate-400 hover:text-accent hover:bg-primary/20 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700/80 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} PlayMatch. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
