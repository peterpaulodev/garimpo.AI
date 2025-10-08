import Image from "next/image";
import Link from "next/link";

export default function UniqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header fixo */}
      <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-background">
        <div className="container mx-auto px-4 py-3">
          <Link href="/">
            <div className="flex items-center justify-center md:justify-start">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={190}
                height={100}
                priority
              />
            </div>
          </Link>
        </div>
      </header>

      {/* Conteúdo principal com scroll */}
      <main className="flex-1 overflow-y-hidden">
        <div className="min-h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
