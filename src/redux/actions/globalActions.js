import {SET_GLOBAL_LOADER, SET_TOP_LOADER, SET_BACKGROUND_TASK} from "./actionTypes";
import api from "../../api";

export function setGlobalLoader(payload){
    return {
        type: SET_GLOBAL_LOADER,
        payload
    }
}
export function setTopLoader(payload){
    return {
        type: SET_TOP_LOADER,
        payload
    }
}

export function setBackgroundTask(payload){
    return {
        type: SET_BACKGROUND_TASK,
        payload
    }
}

export function addNewPost(form){
    return (dispatch) =>{
        const fd = new FormData();
        form.files.forEach((item, i) => fd.append(`attach[${i}]`, item.file))
        if(form.description) fd.append('description', form.description);
        api.posts.add(fd,
            function(percent) {
                console.log(percent)
                if(percent < 99 ) dispatch(setBackgroundTask({image: form.files[0].url, percent, type: 'progress'}))
            })
            .then(() => {
                console.log ('then')
                dispatch(setBackgroundTask({image: form.files[0].url, percent: 100, type: 'success'}))
            })
            .catch(()=> {
                console.log ('catch')
                dispatch(setBackgroundTask({image: form.files[0].url, percent: 0, type: 'danger'}))
            })
            .finally(() => {
                setTimeout(()=> dispatch(setBackgroundTask(null)), 3000)
            })
    }
}
