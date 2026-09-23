import Link from "next/link";
import { calculators } from "@/lib/calculators";

const footerSections = [
  {
    title: "Construction",
    href: "/",
    calcs: ["concrete-calculator", "roofing-calculator", "lumber-calculator", "deck-calculator", "fence-calculator"],
  },
  {
    title: "HVAC",
    href: "/hvac",
    calcs: ["btu-calculator", "ac-tonnage-calculator", "duct-size-calculator", "heat-loss-calculator", "refrigerant-charge-calculator"],
  },
  {
    title: "Electrical",
    href: "/electrical",
    calcs: ["ohms-law-calculator", "voltage-drop-calculator", "wire-gauge-calculator", "circuit-breaker-calculator", "electrical-load-calculator"],
  },
  {
    title: "Plumbing",
    href: "/plumbing",
    calcs: ["water-heater-calculator", "pipe-size-calculator", "drain-slope-calculator", "sump-pump-calculator", "fixture-unit-calculator"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="text-xl font-bold">CalcHub</span>
            </div>
            <p className="text-sm text-gray-400">
              Free construction, HVAC, electrical, and plumbing calculators. Get accurate estimates in seconds.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <Link href={section.href} className="font-semibold mb-3 text-sm block hover:text-primary transition-colors">
                {section.title}
              </Link>
              <ul className="space-y-2">
                {section.calcs.map((slug) => {
                  const calc = calculators.find((c) => c.slug === slug);
                  if (!calc) return null;
                  return (
                    <li key={slug}>
                      <Link href={`/${slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                        {calc.shortTitle}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} CalcHub. All calculators provide estimates only — verify with local suppliers and codes.
        </div>
      </div>
    </footer>
  );
}
