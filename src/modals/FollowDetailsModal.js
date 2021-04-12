import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../api';
import {Box, CircularProgress} from "@material-ui/core";
import FollowersList from "../components/FollowersList";


const useStyles = makeStyles((theme) => ({

}));

const FollowDetailsModal = forwardRef(({username}, ref    ) =>{
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const test = useRef(null)

    const [isFollowed, _setIsFollowed] = useState(false);
    const isFollowedRef = useRef(isFollowed);
    const setIsFollowed = (e) => {
        isFollowedRef.current = e;
        _setIsFollowed(e)
    }


    const [page, _setPage] = useState(1);
    const pageRef = useRef(page)
    const setPage = p => {
        pageRef.current = p;
        _setPage(p)
    }

    const [lastPage, _setLastPage] = useState(0);
    const lastPageRef = useRef(lastPage)
    const setLastPage = p => {
        lastPageRef.current = p;
        _setLastPage(p)
    }

    const [error, _setError] = useState(false);
    const errorRef = useRef(error)
    const setError = p =>{
        errorRef.current = p;
        _setError(p)
    }

    const [loading, _setLoading] = useState(false);
    const loadingRef = useRef(loading)
    const setLoading = p =>{
        loadingRef.current = p;
        _setLoading(p)
    }

    const [data, setData] = useState([])


    // useEffect(() => {
    //     window.addEventListener('scroll', scroll)
    //     return () => {
    //         window.removeEventListener('scroll', scroll)
    //     }
    // }, [])

    useImperativeHandle(ref, () => ({
        handleOpen(value = false) {
            setIsFollowed(value)
            setOpen (() =>  true);
            fetchData()
        }
    }));

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setIsFollowed(false)
            setData([]);
            setPage(1);
            setLastPage(1)
        },500)
    };

    const scroll = (el) => {
        if(el.target.scrollHeight < el.target.scrollTop + el.target.offsetHeight+10 && !loadingRef.current && lastPageRef.current != pageRef.current){
            setPage(pageRef.current+1)
            fetchData()
        }
    }


    function fetchData(){
        setLoading(true)
        getAction(username, pageRef.current)
            .then(({data}) =>{
                setLastPage(2)
                setData(p => p.concat(data.data));
            })
            .catch(()=>{
                handleClose()
            })
            .finally(() => setLoading(false))
    }

    function getAction(username, page = 1){
        return isFollowedRef.current ? api.profile.getFollowed(username, page) : api.profile.getFollowers(username, page)
    }

    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">
                {isFollowed ? 'Подписки' : 'Подписчики'}
            </DialogTitle>
            <DialogContent onScroll={scroll}>
                <FollowersList items={data} isFollowed={isFollowed}/>
                {
                    (!loading && data.length == 0) &&
                    <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                       Список пуст.
                    </Box>
                }
                {
                    loading &&
                    <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                        <CircularProgress/>
                    </Box>
                }
            </DialogContent>
        </Dialog>
    );
});

export default FollowDetailsModal
