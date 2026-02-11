import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile: any) => {
  const formData = new FormData();

  // Append Image File To Form Data
  formData.append("image", imageFile);

 try{
     const response = await axiosInstance.post(
    API_PATHS.IMAGE.UPLOAD_IMAGE,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } } // Set Header For File Upload
  );
  return response.data; // Return Response Data
 } catch(error){
    console.error("Error in Uploading Image", error);
    throw error; // Rethrow The Error For Further Handling
 }
};

export default uploadImage;
