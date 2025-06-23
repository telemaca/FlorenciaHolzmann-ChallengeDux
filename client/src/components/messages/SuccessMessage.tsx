"use client";
import React, { useEffect, useRef } from "react";
import useUsersContext from "../contexts/Userscontext";

import { Toast } from "primereact/toast";

export default function UserCreatedSuccess() {
  const { userActionCompleted, setUserActionCompleted, dialogActionType } =
    useUsersContext();

  const toast = useRef<Toast>(null);

  const getTextDetail = () => {
    switch (dialogActionType) {
      case "edit":
        return "Usuario actualizado";
      case "create":
        return "Usuario creado";
      case "delete":
        return "Usuario eliminado";
      default:
        return "Acción exitosa";
    }
  };

  const showSuccessMessage = () => {
    toast.current?.show({
      severity: "success",
      summary: "¡Éxito!",
      detail: getTextDetail(),
      sticky: true,
    });
  };

  useEffect(() => {
    if (userActionCompleted) {
      showSuccessMessage();
      setUserActionCompleted(false);
    }
  }, [userActionCompleted]);

  return <Toast ref={toast} />;
}
