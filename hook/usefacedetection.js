import axios from "axios";

const API_URL_AI = process.env.EXPO_PUBLIC_API_URL_AI;

export default function useFaceDetection(){
    const classifyFace = async(faceImage) => {
        try{
            const formData = new FormData();
            let fileName = faceImage.split('/').pop();
            formData.append('image', {
                name: fileName,
                type: 'image/jpg',
                uri: faceImage
            });
            let response = await axios.post(`${API_URL_AI}/classify`, formData, {
                headers:{"Content-Type":"multipart/form-data"}
            });
            return response.data;
        }catch(error){
            return error.response.data;
        }
    }
    return {classifyFace}
}