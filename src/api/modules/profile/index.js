import axios from "../../../axios";

export default {
    update(form){
        return axios.post('me/update',form)
    },
    me(){
        return axios.get('me')
    },
    getByUsername(username){
        return axios.get(`user/${username}`)
    },
    follow(id){
        return axios.post(`follow/${id}`)
    },
    unfollow(id){
        return axios.post(`unfollow/${id}`)
    },
    getFollowers(username, page = 1){
        return axios.get(`followers/${username}?page=${page}`)
    },
    getFollowed(username, page = 1){
        return axios.get(`followed/${username}?page=${page}`)
    }
}
