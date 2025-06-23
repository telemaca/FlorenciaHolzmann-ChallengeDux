import React from "react";

import { Button } from "primereact/button";

export default function NavBar() {
  return (
    <nav className="flex flex-col items-center bg-[#2D3E50] p-1 w-16 min-h-screen">
      <Button
        icon="pi pi-box"
        style={{ color: "white" }}
        className="p-button-text"
      />
      <Button
        icon="pi pi-box"
        style={{ color: "white" }}
        className="p-button-text"
      />
      <Button
        icon="pi pi-box"
        style={{ color: "white" }}
        className="p-button-text"
      />
      <Button
        icon="pi pi-box"
        style={{ color: "white" }}
        className="p-button-text"
      />
      <Button
        icon="pi pi-box"
        style={{ color: "white" }}
        className="p-button-text"
      />
      <Button
        icon="pi pi-box"
        style={{ color: "white" }}
        className="p-button-text"
      />
    </nav>
  );
}
