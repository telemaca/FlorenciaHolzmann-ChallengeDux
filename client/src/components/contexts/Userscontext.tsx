"use client";
import React, { useState, useContext, createContext, ReactNode } from "react";

import User from "@/types/User";

type ContextProps = {
  children: ReactNode;
};

type UsersContextType = {
  selectedUser: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User>>;
  editUserDialogOpen: boolean;
  setEditUserDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUserDialogOpen: boolean;
  setDeleteUserDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogActionType: string;
  setDialogActionType: React.Dispatch<React.SetStateAction<string>>;
  userActionCompleted: boolean;
  setUserActionCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

const UsersProvider = ({ children }: ContextProps) => {
  const [selectedUser, setSelectedUser] = useState<User>({
    id: "",
    usuario: "",
    estado: "",
    sector: 0,
  });
  const [editUserDialogOpen, setEditUserDialogOpen] = useState<boolean>(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] =
    useState<boolean>(false);
  const [dialogActionType, setDialogActionType] = useState<string>("");
  const [userActionCompleted, setUserActionCompleted] =
    useState<boolean>(false);

  return (
    <UsersContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        editUserDialogOpen,
        setEditUserDialogOpen,
        deleteUserDialogOpen,
        setDeleteUserDialogOpen,
        dialogActionType,
        setDialogActionType,
        userActionCompleted,
        setUserActionCompleted,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error(
      "useUsersContext debe ser usado dentro de un UsersProvider"
    );
  }
  return context;
};

export { UsersProvider };
export default useUsersContext;
