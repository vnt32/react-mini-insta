import axios from "../../../axios";

export default {
    getByUsername(username) {
        return axios.get(`posts/${username}`)
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
