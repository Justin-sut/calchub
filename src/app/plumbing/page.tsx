import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Plumbing Calculators",
  description: "Free plumbing calculators — water heater sizing, pipe sizing, drain slope, sump pump sizing, fixture units, and water pressure loss.",
};

export default function PlumbingPage() {
  return (
    <CategoryPage
      title="Plumbing Calculators"
      description="Free calculators for plumbing projects. Size water heaters, pipes, drains, and sump pumps. Verify water pressure and fixture unit loads."
      categories={["plumbing"]}
    />
  );
}
