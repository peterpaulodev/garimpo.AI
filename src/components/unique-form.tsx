"use client";

import { useState, useEffect } from "react";
import StepNavigator from "./step-navigator";
import ResultCard from "./result-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const steps = ["Type", "Brand", "Condition", "Material", "Trend"];

export default function UniqueForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepIsFilled, setStepIsFilled] = useState(false);
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

  // Atualiza o stepIsFilled baseado no campo atual sempre que o currentStep mudar
  useEffect(() => {
    const currentField = Object.keys(formData)[
      currentStep
    ] as keyof typeof formData;
    const currentValue = formData[currentField];
    setStepIsFilled(currentValue.trim().length > 0);
  }, [currentStep, formData]);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Atualiza o stepIsFilled apenas se for o campo atual
    if (key === Object.keys(formData)[currentStep]) {
      setStepIsFilled(value.trim().length > 0);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/precify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: formData.type,
          brand: formData.brand,
          condition: formData.condition,
          material: formData.material,
          trend: formData.trend,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar a requisição");
      }

      const data = await response.json();
      console.log("🚀 ~ handleSubmit ~ data:", data);

      setResult({
        price: data.price || "Preço não disponível",
        explanation:
          data.explanation || "Não foi possível gerar uma justificativa.",
      });
    } catch (error) {
      console.error("Erro ao buscar precificação:", error);
      setResult({
        price: "Erro",
        explanation:
          "Não foi possível calcular o preço. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Info className="mr-2 h-6 w-6" />
                Detalhes da roupa
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-lg">
                Descreva o item com detalhes como modelo, tecido, cor e estilo.
              </p>
            </div>
            <Textarea
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
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Info className="mr-2 h-6 w-6" />
                Marca
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-lg">
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
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Info className="mr-2 h-6 w-6" />
                Condição
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-lg">
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
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Info className="mr-2 h-6 w-6" />
                Material
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-lg">
                Informe a composição do material (ex: 100% algodão, viscose,
                etc.)
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
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Info className="mr-2 h-6 w-6" />
                Tendência
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-lg">
                Descreva o estilo ou tendência (ex: vintage, streetwear,
                clássico)
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
          disableNext={!stepIsFilled}
        />
      ) : (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Voltar
          </Button>
          <Button className="w-3/4" onClick={handleSubmit} disabled={loading}>
            {loading ? "Gerando preço..." : "Gerar preço"}
          </Button>
        </div>
      )}

      {result && (
        <ResultCard price={result.price} explanation={result.explanation} />
      )}
    </div>
  );
}
