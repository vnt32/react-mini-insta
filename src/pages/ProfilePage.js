import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import api from '../api';
import {setTopLoader} from "../redux/actions/globalActions";
import {Avatar, ButtonGroup, Card, CardActions, CardContent, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {Settings} from "@material-ui/icons";
import FollowBtn from "../components/profile/FollowBtn";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        margin: "auto"
    },
    textPanel: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    ml: {
        marginLeft: theme.spacing(2)
    }
}));

function ProfilePage({match, loading, setLoading, user, history}){
    const [errorEmpty, setErrorEmpty] = useState(false)
    const [error, setError] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const [profile, setProfile] = useState(null)

    const classes = useStyles()

    useEffect(() => {
        setLoading(true)
        if(user.username == match.params.username){
            setNotFound(false)
            setError(false)
            setErrorEmpty(false)
            setProfile(user)
            setLoading(false)
        }else{
            getProfile()
        }
    }, [match.params.username])

    function handleBack(){
        history.push("/");
    }

    function isMy(){
        return user.username == match.params.username
    }

    function getAvatar(){
        if(profile?.avatar) return `http://api.lc/storage/${profile?.avatar}`
        return profile?.avatar
    }

    function getProfile(){
        setLoading(true)
        setNotFound(false)
        setError(false)
        setErrorEmpty(false)
        api.profile.getByUsername(match.params.username)
            .then(({data})=>{
                console.log (data)
                setProfile(data)
            })
            .catch(({response = null}) => {
                if(response?.status == 404) setNotFound(true)
                else if(response) setErrorEmpty(true)
                else setError(true)
            })
            .finally(() => setLoading(false))
    }

    function getUserPosts(){
        setLoading(true)
        api.posts.getByUsername(match.params.username)
            .then(({data})=>{
                console.log (data)
            })
            .catch(({response = null}) => {
                console.log (response)
            })
            .finally(()=>setLoading(false))
    }

    function handleSettings() {
        history.push('/settings')
    }

    function setFollowedStatus(followed){
        setProfile(p => ({
            ...p,
            followed,
            followers_count: followed ? p.followers_count + 1 : p.followers_count - 1
        }))
    }

    return(
        <Box mt={3}>
            {
                (!loading && errorEmpty || error || notFound) &&
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2" align="center">
                            {errorEmpty && 'Неизвестная ошибка.'}
                            {error && 'Нет сети.'}
                            {notFound && 'К сожалению, эта страница недоступна.'}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary" align="center">
                            {(errorEmpty || error) && 'Попробуйте позже'}
                            {notFound && 'Возможно, вы воспользовались недействительной ссылкой или страница была удалена.'}
                        </Typography>
                    </CardContent>
                    <CardActions style={{justifyContent: "center"}}>
                        {(errorEmpty || error) &&
                        <Button size="small" variant="outlined" onClick={getProfile}>Повторить</Button>}
                        {notFound &&
                        <Button size="small" variant="outlined" onClick={handleBack}>Назад в HosterApp</Button>}
                    </CardActions>
                </Card>
            }
            {
                (!loading && !notFound && !error && !errorEmpty) &&
                <Card className={classes.root} variant="outlined">
                    <Box p={2}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Avatar alt="p" className={classes.avatar} src={getAvatar()}/>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h4">
                                    {profile?.username}
                                    {
                                        isMy() &&
                                        <IconButton onClick={handleSettings}>
                                            <Settings />
                                        </IconButton>
                                    }
                                    {
                                        !isMy() &&
                                        <FollowBtn followed={profile?.followed} id={profile?.id} onChange={setFollowedStatus}/>
                                    }
                                </Typography>
                                <ButtonGroup className={classes.textPanel} variant="text">
                                    <Button>Публикации: {profile?.posts_count}</Button>
                                    <Button>Подписчики: {profile?.followers_count}</Button>
                                    <Button>Подписки: {profile?.followed_count}</Button>
                                </ButtonGroup>
                                <Typography className={classes.pos} color="textSecondary">
                                    {profile?.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            }
        </Box>
    )
}

const mapState = (state) => ({
    loading: state.global.topLoader,
    user: state.auth.user
})

const mapDispatch = (dispatch) => ({
    setLoading: (e) => dispatch(setTopLoader(e))
})

export default withRouter(connect (mapState, mapDispatch) (ProfilePage))

