export default function Footer() {
  return (
    <footer className="w-full py-10 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-surface border-t border-surface-container">
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className="text-lg font-black text-primary font-headline tracking-widest uppercase">BhojanIQ</span>
        <span className="text-xs uppercase tracking-widest text-outline">© 2024 BhojanIQ Intelligence Command</span>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest text-outline">
        {['Privacy Policy', 'Terms of Service', 'Contact Support', 'API Documentation'].map(item => (
          <a key={item} href="#" className="hover:text-secondary transition-colors">{item}</a>
        ))}
      </div>
    </footer>
  )
}
