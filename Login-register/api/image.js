import axios from "./axios";

export const uploadImageRequest = async (image) => {
    try {
      const formData = new FormData();
      formData.append("file", image); // 'file' es el nombre del campo en el servidor
  
      const response = await axios.post("/upload", formData,image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error;
    }
  };

export const getImagesRequest = async () => axios.get("/upload");

export const getImageRequest = async (id) => axios.get(`/upload/${id}`);