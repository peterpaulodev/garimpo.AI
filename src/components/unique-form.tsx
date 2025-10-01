"use client";

import { useState } from "react";
import StepNavigator from "./step-navigator";
import ResultCard from "./result-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const steps = ["Type", "Brand", "Condition", "Material", "Trend"];

export default function UniqueForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    type: "",
    brand: "",
    condition: "",
    material: "",
    trend: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    price: string;
    explanation: string;
  } | null>(null);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    // Mock result (replace later with API call)
    setTimeout(() => {
      setResult({
        price: "R$ 100 - R$ 150",
        explanation:
          "Vintage Levi’s jacket, good condition, trend in high demand.",
      });
      setLoading(false);
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Input
            placeholder="Ex: Oversized denim jacket"
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
          />
        );
      case 1:
        return (
          <Input
            placeholder="Ex: Levi’s"
            value={formData.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
          />
        );
      case 2:
        return (
          <Input
            placeholder="Ex: Used, good condition"
            value={formData.condition}
            onChange={(e) => handleChange("condition", e.target.value)}
          />
        );
      case 3:
        return (
          <Input
            placeholder="Ex: 100% cotton"
            value={formData.material}
            onChange={(e) => handleChange("material", e.target.value)}
          />
        );
      case 4:
        return (
          <Input
            placeholder="Ex: Vintage, streetwear"
            value={formData.trend}
            onChange={(e) => handleChange("trend", e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>{renderStep()}</div>

      {currentStep < steps.length - 1 ? (
        <StepNavigator
          onNext={handleNext}
          onBack={handleBack}
          disableBack={currentStep === 0}
        />
      ) : (
        <Button onClick={handleSubmit} className="w-full" disabled={loading}>
          {loading ? "Generating price..." : "Generate Price"}
        </Button>
      )}

      {result && (
        <ResultCard price={result.price} explanation={result.explanation} />
      )}
    </div>
  );
}
