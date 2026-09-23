import Link from "next/link";
import { calculators, categoryLabels } from "@/lib/calculators";

export default function Home() {
  const categories = Object.keys(categoryLabels);

  return (
    <>
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Construction Calculators
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Free, fast, and accurate material estimators for concrete, roofing,
            lumber, landscaping, and more. No sign-up required.
          </p>
        </div>
      </section>

      <section id="calculators" className="max-w-6xl mx-auto px-4 py-12">
        {categories.map((cat) => {
          const items = calculators.filter((c) => c.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {categoryLabels[cat]}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/${calc.slug}`}
                    className="bg-white border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all group"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {calc.title}
                    </h3>
                    <p className="text-sm text-muted">{calc.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="bg-white border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Why Use CalcHub?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">&#9889;</span>
              </div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-muted">
                Enter your dimensions and get material estimates immediately. No
                waiting, no sign-up.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">&#9989;</span>
              </div>
              <h3 className="font-semibold mb-2">Accurate Formulas</h3>
              <p className="text-sm text-muted">
                Industry-standard calculations with waste factors built in so
                you order the right amount.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">&#128176;</span>
              </div>
              <h3 className="font-semibold mb-2">Save Money</h3>
              <p className="text-sm text-muted">
                Stop over-ordering materials or making extra trips. Get it right
                the first time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
