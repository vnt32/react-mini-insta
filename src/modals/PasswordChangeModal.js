import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useInput} from "../hooks";
import {Validate, ValidateGroup} from "react-validate";
import {validatePassword} from "../validators";
import axios from "../axios";

const PasswordChangeModal = forwardRef(({notify}, ref) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const password = useInput();
    const confirmPassword = useInput();

    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false)

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen (() =>  true);
        }
    }));

    const handleClose = () => {
        setOpen(false);
        setConfirmError(false)
        setPasswordError(false)
        password.clear()
        confirmPassword.clear()
    };

    const handleSave = () => {
        setConfirmError(password.value != confirmPassword.value)
        if(!passwordError && !confirmError){
            setLoading(true)
            axios.post('me/update')
                .then(() => {
                    handleClose()
                    notify(`Пароль успешно сменен`, 'success')
                })
                .catch(({response = null}) => {
                    if(response) notify(`Произошла неизвестная ошибка(${response.status}). Попробуйте позже!`, 'error')
                    else notify('Нет подключения к сети. Попробуйте позже!', 'error')
                })
                .finally(() => setLoading(false))
        }
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="xs"
            disableBackdropClick={loading}
            disableEscapeKeyDown={loading}
        >
            {loading && <LinearProgress/>}
            <DialogTitle id="form-dialog-title" style={{marginTop: loading ? 0 : 4}}>Смена пароля</DialogTitle>
            <DialogContent>
                <ValidateGroup>
                    <Validate validators={[validatePassword]} onErrorChange={(e) => setPasswordError(e)}>
                        <TextField
                            margin="dense"
                            id="password"
                            label="Новый пароль"
                            type="password"
                            fullWidth
                            error={passwordError}
                            disabled={loading}
                            {...password.bind}
                            onBlur={() => setPasswordError(false)}
                        />
                    </Validate>
                    <TextField
                        margin="dense"
                        id="confirm-password"
                        label="Подтвердите новый пароль"
                        type="password"
                        fullWidth
                        error={confirmError}
                        disabled={loading}
                        {...confirmPassword.bind}
                        onInput={(e) => confirmError ? setConfirmError(password.value != e.target.value) : 0}
                        onBlur={() => setConfirmError(password.value != confirmPassword.value)}
                    />
                </ValidateGroup>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" disabled={loading}>
                    Отмена
                </Button>
                <Button onClick={handleSave} color="primary" disabled={loading || confirmError || passwordError || !password.value || !confirmPassword.value}>
                    Сменить
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default PasswordChangeModal
