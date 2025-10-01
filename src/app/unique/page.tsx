import UniqueForm from "@/components/unique-form";

export default function UniquePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Precificação de peças únicas</h1>
      <div className="w-full max-w-md">
        <UniqueForm />
      </div>
    </main>
  );
}
