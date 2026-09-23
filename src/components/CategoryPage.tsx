import Link from "next/link";
import { calculators, categoryLabels } from "@/lib/calculators";

interface CategoryPageProps {
  title: string;
  description: string;
  categories: string[];
}

export default function CategoryPage({ title, description, categories }: CategoryPageProps) {
  return (
    <>
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">{description}</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12">
        {categories.map((cat) => {
          const items = calculators.filter((c) => c.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="mb-12">
              {categories.length > 1 && (
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {categoryLabels[cat]}
                </h2>
              )}
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
    </>
  );
}
