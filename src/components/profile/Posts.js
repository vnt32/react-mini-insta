import React, {useEffect, useRef, useState} from "react";
import api from '../../api';
import {Box, Button, CircularProgress, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PostsGrid from "../PostsGrid";
import {Landscape} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    postsLoader: {
        margin: "auto"
    },
}))

export default function Posts({username}){

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


    const [posts, setPosts] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        window.addEventListener('scroll', scroll)
        return () => {
            window.removeEventListener('scroll', scroll)
        }
    }, [])

    useEffect(() => {
        console.log ('userName changed')
        getPosts()
        return () => {
            setPosts([])
        }
    }, [username])

    const scroll = (p) => {
        if(window.innerHeight + window.scrollY >= document.body.clientHeight-120 && pageRef.current != lastPageRef.current && !loadingRef.current){
            setPage(pageRef.current + 1)
            getPosts()
        }
    }

    function getPosts(){
        setLoading(true)
        setError(false)
        api.posts.getByUsername(username, pageRef.current)
            .then(({data})=>{
                setPosts(p => p.concat(data.data))
                setLastPage(data.last_page)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    return (
        <>
            {
                posts.length > 0 &&
                <PostsGrid items={posts}/>
            }
            {
                loading &&
                <Box display="flex" flexDirection="column" alignItems="center" mt={2} mb={2}>
                    <CircularProgress className={classes.postsLoader}/>
                </Box>
            }
            {
                !loading && error &&
                <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                    <Typography variant="h5">Упс, что-то пошло нетак!</Typography>
                    <Button>Попробовать еще</Button>
                </Box>
            }
            {
                !loading && !error && posts.length == 0 &&
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Landscape fontSize="large"/>
                    <Typography variant="h6">Здесь пока нет публикаций</Typography>
                </Box>
            }
        </>
    )
}

