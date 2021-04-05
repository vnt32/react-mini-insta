import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {useInput} from "../../hooks";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import axios from "../../axios";
import {CircularProgress} from "@material-ui/core";
import {auth} from "../../redux/actions/authActions";
import {connect} from "react-redux";
import AlertBox from "../../components/AlertBox";
import Copyright from "../../components/copyright";
import {RotateLeft} from "@material-ui/icons";
import {Validate, ValidateGroup} from "react-validate";
import {validateEmail} from "../../validators";
import {messageEmailError} from "../../validators/messages";
import Link from "@material-ui/core/Link";

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

export default function ResetPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const email = useInput();
    const [emailError, setEmailError] = useState(false)
    const classes = useStyles();


    function reset(e){
        if(e) e.preventDefault()
        setLoading(true)
        setError(false)
        axios.post('reset', {email: email.value})
            .then(({data})=> {
               //TODO: ADD OPEN MODAL
            })
            .catch(()=>setError(true))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <RotateLeft />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Восстановление пароля
                </Typography>
                {error && <AlertBox severity="error" mt={2}>Похоже, что Вы ввели неверные данные!</AlertBox>}
                <form className={classes.form} noValidate onSubmit={reset}>
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
                        <div className={classes.wrapper}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading || emailError}
                            >
                                Восстановить
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </ValidateGroup>

                    <Grid container>
                        <Grid item xs>
                            <Link component={NavLink} to="/">
                                Вспомнили пароль?
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
