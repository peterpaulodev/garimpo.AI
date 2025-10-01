import { Card, CardContent } from "@/components/ui/card";

type Props = {
  price: string;
  explanation: string;
};

export default function ResultCard({ price, explanation }: Props) {
  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold text-green-700 mb-2">{price}</h2>
        <p className="text-gray-700">{explanation}</p>
      </CardContent>
    </Card>
  );
}
