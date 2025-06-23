"use client";
import React from "react";

import { Button } from "primereact/button";
import useUsersContext from "../contexts/Userscontext";

import User from "@/types/User";

type DeleteUserProps = {
  user: User;
};

export default function DeleteUserButton({ user }: DeleteUserProps) {
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
