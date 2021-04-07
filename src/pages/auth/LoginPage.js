import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {useInput} from "../../hooks";
import { setCookie } from 'react-use-cookie';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import axios from "../../axios";
import {CircularProgress} from "@material-ui/core";
import {auth} from "../../redux/actions/authActions";
import {connect} from "react-redux";
import AlertBox from "../../components/AlertBox";
import Copyright from "../../components/copyright";
import {Validate, ValidateGroup} from "react-validate";
import {validateEmail, validatePassword} from "../../validators";
import {messageEmailError, messagePasswordError} from "../../validators/messages";

import api from '../../api';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

function LoginPage({authAction}) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const email = useInput();
    const [emailError, setEmailError] = useState(false)
    const password = useInput();
    const [passwordError, setPasswordError] = useState(false)

    const classes = useStyles();

    const saveToken = locale => {
        setCookie('token', locale);
    };

    function auth(e){
        if(e) e.preventDefault()
        setLoading(true)
        setError(false)
        api.auth.login(email.value, password.value)
            .then(({data})=> {
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
                saveToken (data.token)
                authAction()
            })
            .catch(()=>setError(true))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Авторизация
                </Typography>
                {error && <AlertBox severity="error" mt={2}>Похоже, что Вы ввели неверные данные!</AlertBox>}
                <form className={classes.form} noValidate onSubmit={auth}>
                    <ValidateGroup>
                        <Validate validators={[validateEmail]} onErrorChange={e => setEmailError(e)}>
                            <TextField
                                error={emailError}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                {...email.bind}
                                disabled={loading}
                                onBlur={() => setError(false)}
                                helperText={emailError ? messageEmailError : undefined}
                            />
                        </Validate>
                        <Validate validators={[validatePassword]} onErrorChange={e => setPasswordError(e)}>
                            <TextField
                                error={passwordError}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="password"
                                {...password.bind}
                                disabled={loading}
                                onBlur={() => setError(false)}
                                helperText={emailError ? messagePasswordError : undefined}
                            />
                        </Validate>
                        <div className={classes.wrapper}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading || emailError || passwordError}
                            >
                                Войти
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </ValidateGroup>


                    <Grid container>
                        <Grid item xs>
                            <Link component={NavLink} to="/reset" variant="body2">
                                Забыли пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={NavLink} to="/register" variant="body2">
                                {"Нет аккаунта? Регистрация"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
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

export default connect(null,mapDispatchToProps)(LoginPage)
