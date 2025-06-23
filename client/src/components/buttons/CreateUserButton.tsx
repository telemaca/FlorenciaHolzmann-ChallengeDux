"use client";
import React from "react";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

import { Button } from "primereact/button";

import useUsersContext from "../contexts/Userscontext";

export default function CreateUserButton() {
  const { setEditUserDialogOpen, setDialogActionType } = useUsersContext();

  const handleUserEdit = () => {
    setDialogActionType("create");
    setEditUserDialogOpen(true);
  };

  return (
    <div className="card flex flex-wrap justify-content-center gap-3">
      <Button
        label="Nuevo usuario"
        icon="pi pi-plus"
        onClick={handleUserEdit}
      />
    </div>
  );
}
