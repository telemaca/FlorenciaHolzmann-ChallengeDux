"use client";
import React from "react";

import { Button } from "primereact/button";
import useUsersContext from "../contexts/Userscontext";

import { ComponentUserProps } from "@/types/ComponentUserProps";
import User from "@/types/User";

export default function DeleteUserButton({ user }: ComponentUserProps) {
  const { setDeleteUserDialogOpen, setSelectedUser, setDialogActionType } =
    useUsersContext();

  const handleUserDelete = (user: User) => {
    setDialogActionType("delete");
    setSelectedUser(user);
    setDeleteUserDialogOpen(true);
  };

  return (
    <Button
      onClick={() => handleUserDelete(user)}
      className="pi pi-trash"
      text
      severity="danger"
    />
  );
}
