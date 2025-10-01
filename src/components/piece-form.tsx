"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  onResult: (data: { preco: string; justificativa: string }) => void;
};

export default function PieceForm({ onResult }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // MOCK - aqui depois entra a chamada para Gemini API
    setTimeout(() => {
      onResult({
        preco: "R$ 80 - R$ 120",
        justificativa:
          "Jaqueta jeans oversize Levi’s em bom estado. Vintage em alta, tecido resistente e marca de valor agregado.",
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tipo">Tipo de peça</Label>
            <Input id="tipo" placeholder="Ex: Jaqueta jeans oversize" required />
          </div>

          <div>
            <Label htmlFor="marca">Marca</Label>
            <Input id="marca" placeholder="Ex: Levi’s" />
          </div>

          <div>
            <Label htmlFor="condicao">Condição</Label>
            <Input id="condicao" placeholder="Ex: Usada, bom estado" />
          </div>

          <div>
            <Label htmlFor="material">Material</Label>
            <Input id="material" placeholder="Ex: Algodão, couro" />
          </div>

          <div>
            <Label htmlFor="tendencia">Tendência (opcional)</Label>
            <Input id="tendencia" placeholder="Ex: Vintage, Streetwear" />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Gerando preço..." : "Gerar Preço"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
