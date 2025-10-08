"use client";

import { Button } from "@/components/ui/button";

type Props = {
  onNext: () => void;
  onBack: () => void;
  disableBack?: boolean;
  disableNext?: boolean;
};

export default function StepNavigator({ onNext, onBack, disableBack, disableNext }: Props) {
  return (
    <div className="flex justify-between">
      <Button variant="outline" onClick={onBack} disabled={disableBack}>
        Voltar
      </Button>
      <Button onClick={onNext} disabled={disableNext}>Avançar</Button>
    </div>
  );
}
