"use client";
import React, { Suspense, lazy } from "react";

import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { ComponentUsersListProps } from "@/types/ComponentUserProps";

const UsersList = lazy(() => import("./UsersListWithFilters"));

export default function UsersListWrapper({ users }: ComponentUsersListProps) {
  const getTableSkeleton = () => {
    const items = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
    ];

    return (
      <div className="card">
        <DataTable
          value={items}
          className="p-datatable-striped"
          tableStyle={{ minWidth: "100%" }}
        >
          <Column
            field="id"
            header="id"
            style={{ width: "25%" }}
            body={<Skeleton />}
            filter
          ></Column>
          <Column
            field="usuario"
            header="Usuario"
            style={{ width: "25%" }}
            body={<Skeleton />}
          ></Column>
          <Column
            field="estado"
            header="Estado"
            style={{ width: "25%" }}
            body={<Skeleton />}
            filter
            filterMenuStyle={{ width: "14rem" }}
          ></Column>
          <Column
            field="sector"
            header="Sector"
            style={{ width: "25%" }}
            body={<Skeleton />}
          ></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <Suspense fallback={getTableSkeleton()}>
      <UsersList users={users} />
    </Suspense>
  );
}
