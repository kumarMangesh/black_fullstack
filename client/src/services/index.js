import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

export async function getDashboard() {
  try {
    const response = await axios.get(`/api/dashboard`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
