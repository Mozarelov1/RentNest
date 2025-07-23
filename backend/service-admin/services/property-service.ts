import axios , { AxiosInstance } from "axios";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

const propertyApi: AxiosInstance = axios.create({
  baseURL: process.env.URL,
  timeout: 15000
});

class PropertyAdminService{
  async  getAllProperties() {
    const resp = await propertyApi.get('/api/property/admin');
    return resp.data;
  }

  async  getPropertyById(propertyId: number) {
    const resp = await propertyApi.get(`/api/property/admin/${propertyId}`);
    return resp.data;
  }

  async  updateProperty(propertyId: number, body: any) {
    const resp = await propertyApi.put(`/api/property/admin/${propertyId}`, body);
    return resp.data;
  }

  async  deleteProperty(propertyId: number) {
    await propertyApi.delete(`/api/property/admin/${propertyId}`);
  }

};

module.exports = new PropertyAdminService();