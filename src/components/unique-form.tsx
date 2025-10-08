"use client";

import { useState } from "react";
import StepNavigator from "./step-navigator";
import ResultCard from "./result-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

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
          <>
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Detalhes da roupa
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Info className="h-4 w-4 text-primary" />
                Descreva o item com detalhes como modelo, tecido, cor e estilo
              </p>
            </div>
            <Input
              placeholder="Ex: Blazer de linho bege, Vestido midi floral, Calça jeans boyfriend"
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="mt-4"
            />
          </>
        );
      case 1:
        return (
          <>
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Marca
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Info className="h-4 w-4 text-primary" />
                Informe a marca da peça para uma precificação mais precisa
              </p>
            </div>
            <Input
              placeholder="Ex: Levi's, Zara, Renner"
              value={formData.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              className="mt-4"
            />
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Condição
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Info className="h-4 w-4 text-primary" />
                Informe a condição atual da peça (nova, seminova, usada, etc.)
              </p>
            </div>
            <Input
              placeholder="Ex: Usada, em bom estado"
              value={formData.condition}
              onChange={(e) => handleChange("condition", e.target.value)}
              className="mt-4"
            />
          </>
        );
      case 3:
        return (
          <>
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Material
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Info className="h-4 w-4 text-primary" />
                Informe a composição do material (ex: 100% algodão, viscose, etc.)
              </p>
            </div>
            <Input
              placeholder="Ex: 100% algodão, viscose com elastano"
              value={formData.material}
              onChange={(e) => handleChange("material", e.target.value)}
              className="mt-4"
            />
          </>
        );
      case 4:
        return (
          <>
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Tendência
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Info className="h-4 w-4 text-primary" />
                Descreva o estilo ou tendência (ex: vintage, streetwear, clássico)
              </p>
            </div>
            <Input
              placeholder="Ex: Vintage anos 90, streetwear, clássico atemporal"
              value={formData.trend}
              onChange={(e) => handleChange("trend", e.target.value)}
              className="mt-4"
            />
          </>
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
