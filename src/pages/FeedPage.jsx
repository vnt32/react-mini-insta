import React, {useState, useEffect} from 'react';
import {Grid, Box, Container, Avatar, Typography, Hidden} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import PostItem from "../components/PostItem";
import {getFeed} from "../redux/actions/feedActions";

const useStyles = makeStyles((theme) => ({
    container:{
      paddingTop: '30px'
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    truncate: {
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    }
}));

function FeedPage({user, getFeedList, page, last_page, feedList = []}) {
    const classes = useStyles();

    useEffect(()=>{
        if(feedList.some(e => !e)) getFeedList(page)
    }, [])

    function getUserAvatar(){
        if(user.avatar) return `http://api.lc/storage/${user.avatar}`
        return user.avatar
    }



    return (
        <Container className={classes.container}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
                    {
                        feedList.map((item) => <PostItem item={item} key={`post_${item?.id || Math.random()*1000}`}/>)
                    }
                    <Hidden smUp>
                        <Box pb="65px"></Box>
                    </Hidden>
                </Grid>
                <Hidden xsDown>
                    <Grid item sm={4}>
                        <Box width="100%" position="sticky" top="102px" >
                            <Box display="flex" alignItems="center" m={1} flexBasis="auto">
                                <Avatar alt={user.username} src={getUserAvatar()} className={classes.large} />
                                <Box ml={1} width="75%">
                                    <Typography variant="subtitle2" className={classes.truncate}>
                                        {user.username}
                                    </Typography>
                                    <Typography variant="caption" component="div" display="block" className={classes.truncate}>
                                        {user.name}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant={'caption'} style={{textAlign: 'center', opacity: ".7"}} display="block" gutterBottom>
                                HOSTER APP © {new Date().getFullYear()}
                            </Typography>
                        </Box>
                    </Grid>
                </Hidden>
            </Grid>
        </Container>
    )
}

function ms(state){
    return{
        user: state.auth.user,
        page: state.feed.page,
        last_page: state.feed.last_page,
        feedList: state.feed.feed,
        error: state.feed.error
    }
}

function md(dispatch){
    return{
        getFeedList: (e) => dispatch(getFeed(e))
    }
}

export default connect(ms,md)(FeedPage)
