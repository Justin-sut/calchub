import Link from "next/link";

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
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#calculators" className="text-muted hover:text-foreground transition-colors">
            All Calculators
          </Link>
          <Link href="/about" className="text-muted hover:text-foreground transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
