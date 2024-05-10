import {getImagesRequest,getImageRequest,uploadImageRequest} from  '../../api/image'
import {createContext, useState,useContext} from 'react'

export const ImagesContext = createContext()

export const useImages = () => {
    const context = useContext(ImagesContext);
    if (!context) {
        throw new Error("useImages must be used within a EvidencesProvider");
    }
    return context;
}

export function ImagesProvider ({ children }){
    const [images, setImages] = useState([]);

    const uploadImage = async (formData) => { // Modificar el parámetro para recibir formData
        try {
            const res = await uploadImageRequest(formData); // Pasar formData a la función de solicitud
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getImages = async () => {
        try {
            const res = await getImagesRequest();
            setImages(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getImage = async (id) => {
        try {
            const res = await getImageRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ImagesContext.Provider 
        value={{ 
            images,
            setImages,
            uploadImage,
            getImages,
            getImage }}>
            {children}
        </ImagesContext.Provider>
    )
}
