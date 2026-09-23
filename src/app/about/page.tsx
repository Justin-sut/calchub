import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About CalcHub — free construction and home improvement calculators for contractors, builders, and DIYers.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">About CalcHub</h1>
      <div className="prose prose-gray max-w-none space-y-4 text-muted">
        <p>
          CalcHub provides free, fast, and accurate construction calculators for
          contractors, builders, and DIY homeowners. Every calculator uses
          industry-standard formulas with built-in waste factors so you order the
          right amount of materials — no more, no less.
        </p>
        <p>
          We built CalcHub because estimating materials shouldn&apos;t require a
          spreadsheet or a trip to the store to ask someone. Enter your
          measurements, get your answer, and get to work.
        </p>
        <h2 className="text-xl font-semibold text-foreground mt-8">
          Important Note
        </h2>
        <p>
          All calculations are estimates based on standard formulas and typical
          material specifications. Actual requirements may vary based on your
          specific materials, local building codes, site conditions, and
          installation methods. Always verify quantities with your supplier and
          consult local building codes for structural projects.
        </p>
      </div>
    </div>
  );
}
