// decision: 'eat' | 'modify' | 'avoid'
const config = {
  eat: {
    label: 'EAT',
    icon: 'check_circle',
    color: 'text-primary',
    glow: 'neon-glow-primary',
    bg: 'bg-primary/10 border-primary/30',
    chipBg: 'bg-primary/10 text-primary border-primary/20',
  },
  modify: {
    label: 'MODIFY',
    icon: 'warning',
    color: 'text-secondary',
    glow: 'neon-glow-secondary',
    bg: 'bg-secondary/10 border-secondary/30',
    chipBg: 'bg-secondary/10 text-secondary border-secondary/20',
  },
  avoid: {
    label: 'AVOID',
    icon: 'cancel',
    color: 'text-error',
    glow: 'neon-glow-error',
    bg: 'bg-error/10 border-error/30',
    chipBg: 'bg-error/10 text-error border-error/20',
  },
}

export default function DecisionBadge({ decision = 'eat', size = 'lg' }) {
  const c = config[decision] ?? config.eat
  const iconSize = size === 'lg' ? 'text-7xl md:text-8xl' : 'text-3xl'
  const labelSize = size === 'lg' ? 'text-5xl md:text-6xl' : 'text-xl'

  return (
    <div className={`flex flex-col items-center gap-3 ${c.glow}`}>
      <span
        className={`material-symbols-outlined ${iconSize} ${c.color}`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {c.icon}
      </span>
      <span className={`font-headline font-black tracking-widest ${labelSize} ${c.color}`}>
        {c.label}
      </span>
    </div>
  )
}
