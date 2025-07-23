import axios , { AxiosInstance } from "axios";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

const authApi: AxiosInstance = axios.create({
  baseURL: process.env.URL,
  timeout: 15000
});

class UserAdminService{
  async  getAllUsers() {
    const resp = await authApi.get('/api/users/admin');
    return resp.data;
  }

  async  getUserById(userId: number) {
    const resp = await authApi.get(`/api/users/admin/${userId}`);
    return resp.data;
  }

  async  updateUser(userId: number, body: any) {
    const resp = await authApi.put(`/api/users/admin/${userId}`, body);
    return resp.data;
  }

  async  deleteUser(userId: number) {
    await authApi.delete(`/api/users/admin/${userId}`);
  }

    async  addRole(userId: number) {
    await authApi.put(`/api/users/admin/${userId}/role`);
  }

};

module.exports = new UserAdminService();