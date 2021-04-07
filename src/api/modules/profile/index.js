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
    }
}
