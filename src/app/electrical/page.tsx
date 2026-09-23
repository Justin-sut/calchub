import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Electrical Calculators",
  description: "Free electrical calculators — Ohm's Law, voltage drop, wire gauge sizing, breaker sizing, and residential load calculations. NEC compliant.",
};

export default function ElectricalPage() {
  return (
    <CategoryPage
      title="Electrical Calculators"
      description="Free calculators for electrical work. Size wire, calculate voltage drop, determine breaker ratings, and plan service panels — all NEC compliant."
      categories={["electrical"]}
    />
  );
}
