import {
  getAllUsers,
  searchById,
  createUser,
  updateUser,
  deleteUser,
} from "../userService";
import { API_URL } from "@/constants/constants";
import User from "@/types/User";

global.fetch = jest.fn();

describe("userService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return all Users", async () => {
      const mockUsers = [
        { usuario: "Juan", id: "1", sector: 3000, estado: "ACTIVO" },
        { usuario: "María", id: "2", sector: 3000, estado: "INACTIVO" },
      ];

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockUsers,
      });

      const result = await getAllUsers();

      expect(fetch).toHaveBeenCalledWith(`${API_URL}?sector=3000`);
      expect(result).toEqual(mockUsers);
    });

    it("should throw error on fetch failure", async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      await expect(getAllUsers()).rejects.toThrow("Network error");
    });
  });

  describe("searchById", () => {
    it("should return user by id", async () => {
      const userId = "123";
      const mockUsers = [
        { usuario: "Ana", id: "123", sector: 3000, estado: "ACTIVO" },
      ];

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockUsers,
      });

      const result = await searchById(userId);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}?id=${userId}`);
      expect(result).toEqual(mockUsers);
    });

    it("should throw error on fetch failure", async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      await expect(searchById("123")).rejects.toThrow("Network error");
    });
  });

  describe("createUser", () => {
    it("should create a user and return response", async () => {
      const newUser: User = {
        usuario: "Pedro",
        id: "3",
        sector: 3000,
        estado: "ACTIVO",
      };
      const mockResponse = [newUser];

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await createUser(newUser);

      expect(fetch).toHaveBeenCalledWith(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw error if response is not ok", async () => {
      const newUser: User = {
        usuario: "Pedro",
        id: "3",
        sector: 3000,
        estado: "ACTIVO",
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: async () => ({}),
      });

      await expect(createUser(newUser)).rejects.toThrow(
        "Error al crear usuario."
      );
    });

    it("should throw error on fetch failure", async () => {
      const newUser: User = {
        usuario: "Pedro",
        id: "3",
        sector: 3000,
        estado: "ACTIVO",
      };

      (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      await expect(createUser(newUser)).rejects.toThrow("Network error");
    });
  });

  describe("updateUser", () => {
    it("should update a user and return response", async () => {
      const id = "3";
      const updatedUser: User = {
        usuario: "Pedro",
        id: "3",
        sector: 3000,
        estado: "INACTIVO",
      };
      const mockResponse = [updatedUser];

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await updateUser(id, updatedUser);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw error if response is not ok", async () => {
      const id = "3";
      const updatedUser: User = {
        usuario: "Pedro",
        id: "3",
        sector: 3000,
        estado: "INACTIVO",
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: async () => ({}),
      });

      await expect(updateUser(id, updatedUser)).rejects.toThrow(
        "Error al actualizar usuario."
      );
    });

    it("should throw error on fetch failure", async () => {
      const id = "3";
      const updatedUser: User = {
        usuario: "Pedro",
        id: "3",
        sector: 3000,
        estado: "INACTIVO",
      };

      (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      await expect(updateUser(id, updatedUser)).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("deleteUser", () => {
    it("should delete a user and return response", async () => {
      const id = "3";
      const mockResponse = [
        { usuario: "Pedro", id: "3", sector: 3000, estado: "INACTIVO" },
      ];

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await deleteUser(id);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw error if response is not ok", async () => {
      const id = "3";

      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: async () => ({}),
      });

      await expect(deleteUser(id)).rejects.toThrow(
        "Error al eliminar usuario."
      );
    });

    it("should throw error on fetch failure", async () => {
      const id = "3";

      (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      await expect(deleteUser(id)).rejects.toThrow("Network error");
    });
  });
});
