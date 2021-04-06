import React, {forwardRef, useImperativeHandle, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useInput} from "../hooks";

const PasswordChangeModal = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const password = useInput();
    const confirmPassword = useInput();

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen (() =>  true);
        }
    }));
    const handleClose = () => {
        setOpen(false);
    };
    return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick={loading} disableEscapeKeyDown={loading}>
            <DialogTitle id="form-dialog-title">Смена пароля</DialogTitle>
            <DialogContent>
                <DialogContentText>
                   Для смены пароля введите свой старый пароль.
                </DialogContentText>
                <TextField
                    margin="normal"
                    id="password"
                    label="Новый пароль"
                    type="password"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="confirm-password"
                    label="Подтвердите новый пароль"
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" disabled={loading}>
                    Отмена
                </Button>
                <Button onClick={handleClose} color="primary" disabled={loading}>
                    Сменить
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default PasswordChangeModal
