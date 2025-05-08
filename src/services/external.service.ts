// src/services/external.service.ts
import axios from "axios";

export const fetchExternalData = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};
