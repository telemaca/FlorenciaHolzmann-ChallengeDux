"use client";
import React from "react";

import { Button } from "primereact/button";
import useUsersContext from "../contexts/Userscontext";

import User from "@/types/User";

type EditUserProps = {
  user: User;
};

export default function EditUserButton({ user }: EditUserProps) {
  const { setEditUserDialogOpen, setSelectedUser, setDialogActionType } =
    useUsersContext();

  const handleUserEdit = (user: User) => {
    setSelectedUser(user);
    setDialogActionType("edit");
    setEditUserDialogOpen(true);
  };

  return (
    <Button
      link
      label={user.usuario}
      onClick={() => handleUserEdit(user)}
      style={{ textAlign: "left" }}
    />
  );
}
