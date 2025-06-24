"use client";
import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

import { getAllUsers } from "@/services/userService";

import useUsersContext from "../contexts/Userscontext";

import User from "@/types/User";
import { ComponentUsersListProps } from "@/types/ComponentUserProps";

import DeleteUserButton from "../buttons/DeleteUserButton";
import EditUserButton from "../buttons/EditUserButton";

import { STATES, SECTORS } from "@/constants/constants";

export default function UserList({ users }: ComponentUsersListProps) {
  const { userActionCompleted } = useUsersContext();
  const [usersAll, setUsersAll] = useState<User[]>(users);

  const [filters] = useState<DataTableFilterMeta>({
    id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    usuario: { value: null, matchMode: FilterMatchMode.CONTAINS },
    estado: { value: null, matchMode: FilterMatchMode.EQUALS },
    sector: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const getBody = (user: User) => (
    <div className="flex justify-between">
      <EditUserButton user={user} />
      <DeleteUserButton user={user} />
    </div>
  );

  const sectorRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <MultiSelect
        value={options.value}
        options={SECTORS}
        onChange={(e: MultiSelectChangeEvent) =>
          options.filterApplyCallback(e.value)
        }
        placeholder="Seleccione un sector"
        className="p-column-filter"
        showClear
        style={{ minWidth: "14rem" }}
      />
    );
  };

  const statusRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={STATES}
        onChange={(e: DropdownChangeEvent) =>
          options.filterApplyCallback(e.value)
        }
        placeholder="Seleccione un estado"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  useEffect(() => {
    const getUsers = async () => {
      const results = await getAllUsers();
      setUsersAll(results);
    };

    if (userActionCompleted) {
      getUsers();
    }
  }, [userActionCompleted]);

  return (
    <div className="card">
      <DataTable
        value={usersAll}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "100%" }}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        emptyMessage="No hay resultados para esa búsqueda."
      >
        <Column
          field="id"
          header="id"
          style={{ width: "25%" }}
          sortable
          filter
          filterPlaceholder="Buscar por id"
        ></Column>
        <Column
          field="usuario"
          body={getBody}
          header="Usuario"
          style={{ width: "25%" }}
          sortable
          filter
          filterPlaceholder="Buscar por usuario"
        ></Column>
        <Column
          field="estado"
          header="Estado"
          style={{ width: "25%" }}
          sortable
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          filter
          filterElement={statusRowFilterTemplate}
        ></Column>
        <Column
          field="sector"
          header="Sector"
          style={{ width: "25%" }}
          sortable
          showFilterMenu={false}
          filter
          filterElement={sectorRowFilterTemplate}
        ></Column>
      </DataTable>
    </div>
  );
}
