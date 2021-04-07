import axios from "../../../axios";

export default {
    login(email, password){
        return axios.post('login', {email, password})
    },
    register(email, password, name, username){
        return axios.post('register', {email, password, name, username})
    },
    reset(email){
        return axios.post('reset', {email})
    }
}
