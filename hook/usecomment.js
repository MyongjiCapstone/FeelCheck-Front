import axios from "axios";
import { Alert } from "react-native";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function useComment() {
    const getComments = (emotion, page) => {
        const result = axios.get(`${API_URL}/api/comments?emotion=${emotion}&page=${page}`, {timeout:5000})
        .then((res)=>{
            if (res.data.status === 200){
                // console.log('FrontEnd : Success Get Comments');
                return res.data.data;
            } else {
                Alert.alert('안내', res.data.message);
                // console.log('FrontEnd : Failed Get Comments, Reason :', error);
                return res.data.data;
            }
        });
        return result;
    }
    const postComment = (commentPostData) => {
        const result = axios.post(`${API_URL}/api/comments`,{
            emotion: commentPostData.emotion,
            nickname: commentPostData.nickname,
            comment: commentPostData.comment
        },{headers: {'Content-Type': 'application/json'}, timeout:5000})
        .then((res) => {
            if (res.data.status === 200){
                // console.log('FrontEnd : Success Post Comment');
                return res.data.data;
            } else {
                Alert.alert('안내', res.data.message);
                // console.log('FrontEnd : Failed Post Comment, Reason :', error);
                return res.data.data;
            }
        });
        return result;
    }
    const deleteComment = (commentDeleteData) => {
        const result = axios.delete(`${API_URL}/api/comments?nickname=${commentDeleteData.nickname}&commentId=${commentDeleteData.commentId}`, {timeout:5000})
        .then((res) => {
            if (res.data.status === 200){
                Alert.alert('안내', res.data.message);
                console.log('FrontEnd : Success Delete Comment');
                return res.data.data;
            } else {
                Alert.alert('안내', res.data.message);
                console.log('FrontEnd : Failed Delete Comment, Reason :', error);
                return res.data.data;
            }
        });
        return result;
    }
    return {getComments, postComment, deleteComment}
}