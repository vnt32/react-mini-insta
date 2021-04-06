import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {NavLink, useHistory} from "react-router-dom";
import Copyright from "../../components/copyright";
import {PersonAdd} from "@material-ui/icons";
import Link from "@material-ui/core/Link";
import {Validate, ValidateGroup} from "react-validate";
import {validateEmail, validateName, validateNick, validatePassword} from "../../validators";
import {useInput} from "../../hooks";
import {messageEmailError, messageNameError, messageNickError, messagePasswordError} from "../../validators/messages";
import {CircularProgress} from "@material-ui/core";
import axios from "../../axios";
import {auth} from "../../redux/actions/authActions";
import {connect} from "react-redux";
import {setCookie} from "react-use-cookie";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function RegisterPage({authAction, history}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState()

    const name = useInput();
    const username = useInput();
    const email = useInput();
    const password = useInput();

    const [nameError, setNameError] = useState(false);
    const [usernameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const classes = useStyles();

    const saveToken = locale => {
        setCookie('token', locale);
    };

    function register(e){
        if(e) e.preventDefault()
        setLoading(true)
        setError(false)
        axios.post('register', {email: email.value, password: password.value, name: name.value, username: username.value})
            .then(({data})=> {
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
                saveToken (data.token)
                authAction()
            })
            .catch(({response = null})=> {
                setErrorText(response)
                setError (true)
                history.push("/")
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAdd />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                {
                    errorText &&
                    <Box m="2">
                        <pre>
                            {errorText}
                        </pre>
                    </Box>
                }
                <form className={classes.form} noValidate onSubmit={register}>

                    <ValidateGroup>
                        <Validate validators={[validateName]} onErrorChange={e => setNameError(e)}>
                            <TextField
                                name="name"
                                variant="outlined"
                                fullWidth
                                id="name"
                                label="Имя"
                                autoComplete="name"
                                margin="normal"
                                {...name.bind}
                                error={nameError}
                                helperText={nameError ? messageNameError : undefined}
                            />
                        </Validate>
                        <Validate validators={[validateNick]} onErrorChange={e => setUserNameError(e)}>
                            <TextField
                                name="nickname"
                                variant="outlined"
                                fullWidth
                                id="nickname"
                                label="Ник"
                                autoComplete="nick"
                                margin="normal"
                                {...username.bind}
                                error={usernameError}
                                helperText={usernameError ? messageNickError : undefined}
                            />
                        </Validate>
                        <Validate validators={[validateEmail]} onErrorChange={e => setEmailError(e)}>
                            <TextField
                                name="email"
                                fullWidth
                                id="email"
                                label="Email"
                                autoComplete="email"
                                variant="outlined"
                                margin="normal"
                                {...email.bind}
                                error={emailError}
                                helperText={emailError ? messageEmailError : undefined}
                            />
                        </Validate>
                        <Validate validators={[validatePassword]} onErrorChange={e => setPasswordError(e)}>
                            <TextField
                                name="password"
                                fullWidth
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                variant="outlined"
                                margin="normal"
                                {...password.bind}
                                error={passwordError}
                                helperText={passwordError ? messagePasswordError : undefined}
                            />
                        </Validate>
                        <div className={classes.wrapper}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading || nameError || usernameError || emailError || passwordError}
                            >
                                Регистрация
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </ValidateGroup>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={NavLink} to="/" variant="body2">
                                Уже есть аккаунт? Войти
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: () => dispatch(auth())
    }
}

export default connect(null,mapDispatchToProps)(RegisterPage)
