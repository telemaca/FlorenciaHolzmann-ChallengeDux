import React from "react";
import Image from "next/image";

import { Button } from "primereact/button";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center bg-[#0763E7] p-1">
      <Image src="/dux-logo.png" alt="company logo" width="36" height="36" />
      <Button
        icon="pi pi-cog"
        style={{ color: "white" }}
        className="p-button-text"
      />
    </nav>
  );
}
