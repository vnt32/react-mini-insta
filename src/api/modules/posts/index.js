import axios from "../../../axios";

export default {
    getByUsername(username,page = 1) {
        return axios.get(`posts/${username}?page=${page}`)
    },
    add(form){
        return axios.post('post', form)
    },
    getOnceByUid(id){
        return axios.get(`post/${id}`)
    },
    delPost(id){
        return axios.delete(`post/${id}`)
    }
}
