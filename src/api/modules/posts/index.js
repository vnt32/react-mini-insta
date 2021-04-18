import axios from "../../../axios";

export default {
    getByUsername(username,page = 1) {
        return axios.get(`posts/${username}?page=${page}`)
    },
    add(form, percent = () => 0){
        return axios.post('post', form, {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                percent(percentCompleted)
            }
        })
    },
    getOnceByUid(id){
        return axios.get(`post/${id}`)
    },
    delPost(id){
        return axios.delete(`post/${id}`)
    }
}
