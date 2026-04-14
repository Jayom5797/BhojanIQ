export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`glass-panel border border-outline-variant/20 rounded-2xl ${className}`}>
      {children}
    </div>
  )
}
