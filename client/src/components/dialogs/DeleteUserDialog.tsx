"use client";
import React from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import useUsersContext from "../contexts/Userscontext";

import { deleteUser } from "@/services/userService";

export default function DeleteUserDialog() {
  const {
    setDeleteUserDialogOpen,
    selectedUser,
    setSelectedUser,
    deleteUserDialogOpen,
    setUserActionCompleted,
  } = useUsersContext();

  const closeAndResetValues = () => {
    setDeleteUserDialogOpen(false);
    setSelectedUser({
      id: "",
      usuario: "",
      estado: "",
      sector: 0,
    });
  };

  const confirm = async () => {
    const userId = selectedUser.id;
    await deleteUser(userId);
    closeAndResetValues();
    setUserActionCompleted(true);
  };

  return (
    <Dialog
      header="Eliminar usuario"
      headerStyle={{ background: "red", color: "white" }}
      visible={deleteUserDialogOpen}
      style={{ width: "40vw" }}
      onHide={() => {
        if (!deleteUserDialogOpen) return;
        closeAndResetValues();
      }}
    >
      <div className="flex flex-col gap-8 pt-8">
        <div className="flex flex-col gap-2">
          <p>Vas a eliminar el siguiente usuario:</p>
          <p>
            <b>
              <span>Id: </span>
            </b>
            <span>{selectedUser.id}</span>
          </p>
          <p>
            <b>
              <span>Nombre: </span>
            </b>
            <span>{selectedUser.usuario}</span>
          </p>
          <p>
            <b>
              <span>Estado: </span>
            </b>
            <span>{selectedUser.estado}</span>
          </p>
          <p>
            <b>
              <span>Sector: </span>
            </b>
            <span>{selectedUser.sector}</span>
          </p>
        </div>
        <div className="pt-8 flex gap-6">
          <Button
            label="Eliminar"
            icon="pi pi-trash"
            onClick={confirm}
            severity="danger"
            autoFocus
          />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={closeAndResetValues}
            className="p-button-text"
            severity="danger"
          />
        </div>
      </div>
    </Dialog>
  );
}
