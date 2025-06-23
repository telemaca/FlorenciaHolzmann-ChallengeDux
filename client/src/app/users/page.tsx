import React from "react";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

import { UsersProvider } from "@/components/contexts/Userscontext";

import NavBar from "@/components/navs/NavBar";
import AsideNav from "@/components/navs/AsideNav";
import CreateUserButton from "@/components/buttons/CreateUserButton";
import EditUserDialog from "@/components/dialogs/EditUserDialog";
import DeleteUserDialog from "@/components/dialogs/DeleteUserDialog";
import UsersListWrapper from "@/components/lists/UsersListWrapper";
import SuccessMessage from "@/components/messages/SuccessMessage";

import { getAllUsers } from "@/services/userService";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <PrimeReactProvider>
      <UsersProvider>
        <NavBar />
        <main className="flex max-w-full">
          <AsideNav />
          <div className="p-8 min-w-[95%] flex flex-col m-auto mt-0">
            <div className="card flex flex-wrap justify-between gap-3 pb-6">
              <h1 className="text-[28px] font-bold">Usuarios</h1>
              <CreateUserButton />
            </div>
            <UsersListWrapper users={users} />
          </div>
          <EditUserDialog />
          <DeleteUserDialog />
          <SuccessMessage />
        </main>
      </UsersProvider>
    </PrimeReactProvider>
  );
}
