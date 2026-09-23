import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { calculators, getCalculatorBySlug, getRelatedCalculators } from "@/lib/calculators";
import CalculatorForm from "@/components/CalculatorForm";

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getCalculatorBySlug(slug);
  if (!config) return {};
  return {
    title: config.title,
    description: config.metaDescription,
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getCalculatorBySlug(slug);
  if (!config) notFound();

  const related = getRelatedCalculators(config.relatedSlugs);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.title,
    description: config.metaDescription,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.title,
        item: `/${config.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <nav className="text-sm text-muted mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{config.title}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {config.title}
        </h1>
        <p className="text-lg text-muted mb-8 max-w-3xl">{config.intro}</p>

        <CalculatorForm config={config} />

        <div className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How to Use This Calculator
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted">
            {config.howToUse.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How {config.shortTitle} Calculation Works
          </h2>
          <p className="text-muted mb-4">{config.howItWorks}</p>
          <div className="bg-white border border-border rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Formula
            </h3>
            <p className="text-sm text-muted font-mono">{config.formula}</p>
          </div>
        </div>

        <div className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {config.faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-border rounded-lg group"
              >
                <summary className="px-6 py-4 cursor-pointer font-medium text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </summary>
                <div className="px-6 pb-4 text-sm text-muted">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related Calculators
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="bg-white border border-border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {r.title}
                  </h3>
                  <p className="text-xs text-muted">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
