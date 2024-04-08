import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function useComment() {
    const getComments = (emotion) => {
        const result = axios.get(`${API_URL}/api/comments?emotion=${emotion}`)
        .then((res)=>{
            console.log('FrontEnd : Success Get Comments');
            return res.data.data;
        })
        .catch((error)=>{
            console.log('FrontEnd : Failed Get Comments, Reason :', error);
        });
        return result;
    }
    const postComment = (commentPostData) => {
        const result = axios.post(`${API_URL}/api/comments`,{
            emotion: commentPostData.emotion,
            nickname: commentPostData.nickname,
            comment: commentPostData.comment
        },{headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log('FrontEnd : Success Post Comment');
            return res.data.data;
        })
        .catch((error) => {
            console.log('FrontEnd : Failed Post Comment, Reason :', error);
        });
        return result;
    }
    const deleteComment = (commentDeleteData) => {
        const result = axios.delete(`${API_URL}/api/comments`,{
            nickname: commentDeleteData.nickname,
            commentId: commentDeleteData.commentId
        },{headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log('FrontEnd : Success Delete Comment');
            return res.data.data;
        })
        .catch((error) => {
            console.log('FrontEnd : Failed Delete Comment, Reason :', error);
        });
        return result;
    }
    return {getComments, postComment, deleteComment}
}