"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { IconPlus, IconLibraryPlus } from "@tabler/icons-react";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const isLoading = false;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="flex justify-end w-full">
        <ModeToggle />
      </header>
      <main className="flex  flex-col gap-5 row-start-2 items-center sm:items-start">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-1">Garimpo.AI</h1>
          <p className="text-sm text-gray-500 mb-4">by Loopz Brechó</p>
          <p className="text-gray-600 max-w-md">
            Preços inteligentes para peças únicas de brechó. Escolha um modo abaixo
            para começar.
          </p>
        </div>

        <div className="flex justify-center gap-6">
          <Link href="/unique">
            <Button className="text-lg px-8 py-6">
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <IconPlus />
              )}
              Peça única
            </Button>
          </Link>

          <Link href="/batch">
            <Button variant="outline" className="text-lg px-8 py-6">
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <IconLibraryPlus />
              )}
              Peças em lote
            </Button>
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Histórico
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Saiba mais
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          GitHub →
        </a>
      </footer>
    </div>
  );
}
