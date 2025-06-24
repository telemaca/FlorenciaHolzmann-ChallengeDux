"use client";
import React, { useState, useRef } from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import User from "@/types/User";
import ValidationResult from "@/types/ValidationResults";

import useUsersContext from "../contexts/Userscontext";
import { STATES, SECTORS } from "@/constants/constants";

import { updateUser, createUser, searchById } from "@/services/userService";

export default function EditUserDialog() {
  const {
    setEditUserDialogOpen,
    dialogActionType,
    selectedUser,
    setSelectedUser,
    editUserDialogOpen,
    setUserActionCompleted,
  } = useUsersContext();

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof User, string>>
  >({});

  const editUser = dialogActionType === "edit";

  const validateData = (userData: User): ValidationResult => {
    const errors: ValidationResult["errors"] = {};

    // Regex de validación para el input por seguridad, y evitar inyección de código malicioso.
    const safeRegexValidation = /^[a-zA-Z0-9\- ]+$/;

    if (!userData.usuario.trim()) {
      errors.usuario = "El nombre es obligatorio";
      setFormErrors({ ...formErrors, usuario: "El nombre es obligatorio" });
    }

    if (
      userData.usuario &&
      !safeRegexValidation.test(userData.usuario.trim())
    ) {
      errors.usuario = "Alguno de los caracteres usado no es válido";
      setFormErrors({
        ...formErrors,
        usuario: "Alguno de los caracteres usado no es válido",
      });
    }

    if (!userData.id.trim()) {
      errors.id = "El id es obligatorio";
      setFormErrors({ ...formErrors, id: "El id es obligatorio" });
    }

    const sectorNumber = Number(userData.sector);
    if (!userData.sector || isNaN(sectorNumber)) {
      errors.sector = "El sector es obligatorio";
      setFormErrors({ ...formErrors, sector: "El sector es obligatorio" });
    }

    if (!userData.estado.trim()) {
      errors.estado = "El estado es obligatorio";
      setFormErrors({ ...formErrors, estado: "El estado es obligatorio" });
    }

    setFormErrors(errors);

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const warningToast = useRef<Toast>(null);

  const showExistingIdWarning = () => {
    warningToast.current?.show({
      severity: "error",
      summary: "Alerta",
      detail: "Ese ID ya existe.",
      sticky: true,
    });
  };

  const closeAndResetValues = () => {
    setEditUserDialogOpen(false);
    setFormErrors({});
    setSelectedUser({
      id: "",
      usuario: "",
      estado: "",
      sector: 0,
    });
  };

  const confirm = async () => {
    const { isValid } = validateData(selectedUser);

    if (isValid) {
      const userId = selectedUser.id;

      if (editUser) {
        await updateUser(userId, selectedUser);
        closeAndResetValues();
        setUserActionCompleted(true);
        return;
      }

      const validateIfIdExists = async () => {
        const result = await searchById(userId);
        const userIdExists = !!result[0];

        if (userIdExists) {
          showExistingIdWarning();
          return;
        }

        await createUser(selectedUser);
        closeAndResetValues();
        setUserActionCompleted(true);
      };

      validateIfIdExists();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors({});
    const { name, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownChange = (e: { value: string }, field: keyof User) => {
    setFormErrors({});
    setSelectedUser((prev) => ({
      ...prev,
      [field]: field === "sector" ? Number(e.value) : e.value,
    }));
  };

  return (
    <Dialog
      header={editUser ? "Modificar usuario" : "Crear usuario"}
      headerStyle={{ background: "blue", color: "white" }}
      visible={editUserDialogOpen}
      style={{ width: "50vw" }}
      onHide={() => {
        if (!editUserDialogOpen) return;
        closeAndResetValues();
      }}
    >
      <div className="flex flex-col gap-8 pt-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="id-value" className="font-bold">
            id
          </label>
          <InputText
            id="id-value"
            name="id"
            aria-describedby="enter-id-value"
            value={selectedUser.id}
            onChange={handleInputChange}
            invalid={!!formErrors.id}
            disabled={editUser}
          />
          {!!formErrors.id && (
            <small className="p-error">{formErrors.id}</small>
          )}
          {editUser && (
            <small className="p-help">El id no se puede modificar.</small>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="usuario" className="font-bold">
            Nombre
          </label>
          <InputText
            id="usuario"
            name="usuario"
            aria-describedby="enter-name"
            value={selectedUser.usuario}
            onChange={handleInputChange}
            invalid={!!formErrors.usuario}
          />
          {!!formErrors.usuario && (
            <small className="p-error">{formErrors.usuario}</small>
          )}
        </div>
        <div className="card flex flex-col gap-2 justify-content-center">
          <label htmlFor="state" className="font-bold">
            Estado
          </label>
          <Dropdown
            id="state"
            value={selectedUser.estado}
            onChange={(e) => handleDropdownChange(e, "estado")}
            options={STATES}
            placeholder="Selecione un estado"
            className="w-full md:w-14rem"
            invalid={!!formErrors.estado}
          />
          {!!formErrors.estado && (
            <small className="p-error">{formErrors.estado}</small>
          )}
        </div>
        <div className="card flex flex-col gap-2 justify-content-center">
          <label htmlFor="state" className="font-bold">
            Sector
          </label>
          <Dropdown
            id="sector"
            value={selectedUser.sector}
            onChange={(e) => handleDropdownChange(e, "sector")}
            options={SECTORS}
            placeholder="Selecione un sector"
            className="w-full md:w-14rem"
            invalid={!!formErrors.sector}
          />
          {!!formErrors.sector && (
            <small className="p-error">{formErrors.sector}</small>
          )}
        </div>
        <div className="pt-8 flex gap-6">
          <Button
            label="Confirmar"
            style={{ backgroundColor: "blue" }}
            icon="pi pi-check"
            onClick={confirm}
            autoFocus
          />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            style={{ color: "blue" }}
            onClick={closeAndResetValues}
            className="p-button-text"
          />
        </div>
      </div>
      <Toast ref={warningToast} />
    </Dialog>
  );
}
