import React, {useEffect, useRef, useState} from "react";
import {
    Avatar, Badge,
    Box,
    Container,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    makeStyles, Snackbar,
    TextField, withStyles
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Add, Assignment, Delete, Edit, Save} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import PasswordChangeModal from "../modals/PasswordChangeModal";
import {connect} from "react-redux";
import {useInput} from "../hooks";
import {Alert} from "@material-ui/lab";
import {useSnackbar} from "notistack";
import axios from "../axios";
import {setTopLoader} from "../redux/actions/globalActions";
import {setUser} from "../redux/actions/authActions";

const StyledBadge = withStyles((theme) => ({
    badge: {
        cursor: "pointer"
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 35,
        height: 35,
        border: `2px solid ${theme.palette.background.paper}`,
        backgroundColor: "white"
    },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    button: {
        alignSelf: "flex-end",
        marginLeft: "auto"
    },
    buttonDelete: {
        marginTop: '10px',
        backgroundColor: theme.palette.error.main,
        color: "white",
        '&:hover':{
            backgroundColor: theme.palette.error.dark
        },
    },
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    pointer: {
        cursor: "pointer"
    }
}));

function SettingsPage({user, loading, setLoading, setUserData}) {
    const classes = useStyles();
    const dialogRef = useRef(null);
    const { enqueueSnackbar } = useSnackbar();

    const name = useInput(user.name);
    const username = useInput(user.username);
    const email = useInput(user.email);


    const [newAvatar, setNewAvatar] = useState()
    const [newAvatarFile, setNewAvatarFile] = useState()
    const [changed, setChanged] = useState()

    useEffect(() => {
        setChanged(name.value != user.name || username.value != user.username || email.value != user.email || newAvatarFile)
    }, [name, username, email, newAvatarFile])

    function notify(msg, variant = null) {
        // variant could be success, error, warning, info, or default
        if(variant) enqueueSnackbar(msg, { variant });
        else enqueueSnackbar(msg);
    };

    function openPasswordDialog() {
        dialogRef.current.handleOpen()
    }

    function getUserAvatar(){
        if(newAvatar) return newAvatar
        if(user.avatar) return `http://api.lc/storage/${user.avatar}`
        return user.avatar
    }

    function setAvatar(e){
        if(e.target.files[0].size <= 1024*1000*2){
            setNewAvatar(URL.createObjectURL(e.target.files[0]))
            setNewAvatarFile(e.target.files[0])
        }else{
            notify('Изображение больше 2 МБ','error')
        }
    }

    function clearFrom(){
        setNewAvatar(null);
        setNewAvatarFile(null)
    }

    function saveData(){
        const fd = new FormData();
        if(newAvatarFile) fd.append('avatar', newAvatarFile)
        if(name != user.name) fd.append('name', name.value)
        if(username != user.username) fd.append('username', username.value)
        if(email != user.email) fd.append('email', email.value)
        setLoading(true)
        axios.post('/me/update', fd)
            .then(data => data.data.user)
            .then((user) => {
                setUserData(user)
                if(newAvatarFile || newAvatar) clearFrom()
                console.log (user)
            })
            .catch(({response = null}) => {
                if(response && response.status == 400) {
                    console.log (Object.entries(response.data.message))
                    Object.entries(response.data.message).forEach((e) =>{
                        if(e[0] == 'username') notify('Это имя пользователя уже занято', 'warning')
                        if(e[0] == 'email') notify('Этот почтовый ящик уже используется', 'warning')
                    })
                }
                else if(response) notify(`Произошла неизвестная ошибка(${response.status}). Попробуйте позже!`, 'error')
                else notify('Нет подключения к сети. Попробуйте позже!', 'error')
            } )
            .finally(() => setLoading(false))
    }

    return (
        <>
            <CssBaseline />
            <Box mt={3}>
                <Container maxWidth="xs">
                    <Box component="h1" textAlign="center">Настройки профиля</Box>
                    <Box component="div" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                        <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                <>
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        id="contained-button-file"
                                        type="file"
                                        onChange={setAvatar}
                                        disabled={loading}
                                    />
                                    <label htmlFor="contained-button-file" className={classes.pointer}>
                                        <SmallAvatar>
                                            {getUserAvatar() ? <Edit/> : <Add/>}
                                        </SmallAvatar>
                                    </label>
                                </>
                            }
                        >
                            <Avatar alt={user.name} src={getUserAvatar()} className={classes.large}/>
                        </StyledBadge>
                        {
                            newAvatar &&
                            <Button
                                variant="contained"
                                className={classes.buttonDelete}
                                size="small"
                                startIcon={<Delete />}
                                onClick={clearFrom}
                                disabled={loading}
                            >
                                Отменить
                            </Button>
                        }
                    </Box>
                    <List>
                        <ListSubheader>
                            Основная информация
                        </ListSubheader>
                        <ListItem>
                            <TextField
                                id="outlined-basic"
                                label="Имя"
                                variant="outlined"
                                fullWidth
                                {...name.bind}
                                disabled={loading}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                id="outlined-basic"
                                label="Ник"
                                variant="outlined"
                                fullWidth
                                {...username.bind}
                                disabled={loading}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                {...email.bind}
                                disabled={loading}
                            />
                        </ListItem>
                        <ListItem button onClick={openPasswordDialog}>
                            <ListItemText
                                primary="Сменить пароль"
                                secondary={
                                    <React.Fragment>
                                        Для смены пароля требуется ввести старый пароль
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Box display="flex" component={ListItem} alignItems="" >
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<Save />}
                                onClick={saveData}
                                disabled={loading || !changed}
                            >
                                Сохранить
                            </Button>
                        </Box>
                    </List>
                </Container>
            </Box>
            <PasswordChangeModal ref={dialogRef}/>
        </>
    )
};

const mapState = state => ({
    user: state.auth.user,
    loading: state.global.topLoader
})

const mapDispatch = dispatch => ({
    setLoading: (e) => dispatch(setTopLoader(e)),
    setUserData: (e) => dispatch(setUser(e))
})

export default connect(mapState, mapDispatch)(SettingsPage)
