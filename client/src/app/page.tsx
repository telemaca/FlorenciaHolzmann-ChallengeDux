"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

import { Button } from "primereact/button";

export default function HomePage() {
  const router = useRouter();
  return (
    <PrimeReactProvider>
      <main>
        <Button link onClick={() => router.push("/users")}>
          Ir a Usuarios
        </Button>
      </main>
    </PrimeReactProvider>
  );
}
