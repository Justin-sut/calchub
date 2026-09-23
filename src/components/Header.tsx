import Link from "next/link";

const navLinks = [
  { href: "/", label: "Construction" },
  { href: "/hvac", label: "HVAC" },
  { href: "/electrical", label: "Electrical" },
  { href: "/plumbing", label: "Plumbing" },
];

export default function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CH</span>
          </div>
          <span className="text-xl font-bold text-foreground">CalcHub</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
