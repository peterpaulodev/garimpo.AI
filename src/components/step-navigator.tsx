"use client";

import { Button } from "@/components/ui/button";

type Props = {
  onNext: () => void;
  onBack: () => void;
  disableBack?: boolean;
};

export default function StepNavigator({ onNext, onBack, disableBack }: Props) {
  return (
    <div className="flex justify-between">
      <Button variant="outline" onClick={onBack} disabled={disableBack}>
        Back
      </Button>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
}
