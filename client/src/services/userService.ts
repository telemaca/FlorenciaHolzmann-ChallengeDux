import User from "@/types/User";

import { API_URL } from "@/constants/constants";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch(`${API_URL}?sector=3000`);

    return res.json();
  } catch (error) {
    throw error;
  }
};

export const searchById = async (userId: string): Promise<User[]> => {
  try {
    const res = await fetch(`${API_URL}?id=${userId}`);

    return res.json();
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user: User): Promise<User[]> => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error("Error al crear usuario.");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, user: User): Promise<User[]> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error("Error al actualizar usuario.");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<User[]> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Error al eliminar usuario.");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
};
