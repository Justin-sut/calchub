import Link from "next/link";
import { calculators, categoryLabels } from "@/lib/calculators";

export default function Footer() {
  const categories = Object.keys(categoryLabels);

  return (
    <footer className="bg-foreground text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="text-xl font-bold">CalcHub</span>
            </div>
            <p className="text-sm text-gray-400">
              Free construction and home improvement calculators. Get accurate material estimates in seconds.
            </p>
          </div>
          {categories.slice(0, 3).map((cat) => (
            <div key={cat}>
              <h3 className="font-semibold mb-3 text-sm">{categoryLabels[cat]}</h3>
              <ul className="space-y-2">
                {calculators
                  .filter((c) => c.category === cat)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link href={`/${c.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                        {c.shortTitle}
                      </Link>
                    </li>
                  ))}
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
