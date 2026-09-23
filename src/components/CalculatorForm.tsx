"use client";

import { useState, useCallback } from "react";
import type { CalculatorConfig } from "@/lib/calculators";
import { calculate } from "@/lib/calculations";

export default function CalculatorForm({ config }: { config: CalculatorConfig }) {
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const field of config.fields) {
      if (field.defaultValue !== undefined) {
        initial[field.name] = field.defaultValue;
      } else if (field.type === "select" && field.options?.length) {
        initial[field.name] = Number(field.options[0].value);
      }
    }
    return initial;
  });

  const handleChange = useCallback((name: string, value: string) => {
    setInputs((prev) => ({ ...prev, [name]: value === "" ? 0 : Number(value) }));
  }, []);

  const allFilled = config.fields
    .filter((f) => !f.label.includes("optional") && !f.label.includes("Optional"))
    .slice(0, 3)
    .every((f) => inputs[f.name] && inputs[f.name] > 0);

  const results = allFilled ? calculate(config.slug, inputs) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Enter Your Measurements</h2>
        <div className="space-y-4">
          {config.fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-1">
                {field.label}
                {field.unit && <span className="text-muted ml-1">({field.unit})</span>}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  value={inputs[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {field.options?.map((opt) => (
                    <option key={String(opt.value)} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  type="number"
                  step="any"
                  placeholder={field.placeholder}
                  value={inputs[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
              {field.helperText && (
                <p className="mt-1 text-xs text-muted">{field.helperText}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Results</h2>
        {results ? (
          <div className="space-y-3">
            {config.results.map((r) => (
              <div
                key={r.key}
                className="flex items-center justify-between border-b border-border pb-3 last:border-0"
              >
                <span className="text-sm text-muted">{r.label}</span>
                <span className="text-lg font-bold text-foreground">
                  {r.unit === "$" ? "$" : ""}
                  {typeof results[r.key] === "number"
                    ? results[r.key].toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })
                    : "—"}
                  {r.unit && r.unit !== "$" ? (
                    <span className="text-sm font-normal text-muted ml-1">{r.unit}</span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-muted text-sm">
            Enter your measurements to see results
          </div>
        )}
      </div>
    </div>
  );
}
