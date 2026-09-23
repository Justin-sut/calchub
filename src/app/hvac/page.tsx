import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "HVAC Calculators",
  description: "Free HVAC calculators — BTU sizing, AC tonnage, duct sizing, heat loss, superheat and subcooling. Instant results for HVAC professionals and homeowners.",
};

export default function HVACPage() {
  return (
    <CategoryPage
      title="HVAC Calculators"
      description="Free calculators for heating, ventilation, and air conditioning. Size equipment, design ductwork, and verify refrigerant charge."
      categories={["hvac"]}
    />
  );
}
