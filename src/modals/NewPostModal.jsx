import React, { useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Divider, AppBar, Toolbar, IconButton, Typography, Slide, Box, Avatar, Container, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AlertModal from './AlertModal';
import {useInput} from '../hooks'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    square: {
        width: '100px',
        height: '100px'
    },
    attach_wrapper: {
        width: '100px',
        height: '100px',
        position: 'relative',
        margin: '3px',
        "& .close": {
            cursor: 'pointer',
            top: '50%',
            left: '50%',
            width: '40px',
            height: '40px',
            zIndex: '10',
            position: 'absolute',
            background: theme.palette.grey['900'],
            borderRadius: '100%',
            padding: '8px',
            transform: 'translate(-50%,-50%)',
            opacity: '0.5',
            transition: 'opacity .3s linear',
            "&:hover": {
                opacity: 1
            }
        }
    }
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default forwardRef((props, ref) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const desc = useInput()

    const [filesArray, _setFiles] = useState([]);
    const filesArrayRef = useRef(filesArray)
    const setFiles = p => {
        filesArrayRef.current = p;
        _setFiles(p)
    }

    const ff = useRef(null)
    const am = useRef(null)

    useImperativeHandle(ref, () => ({
        handleOpenAdd: () => ff.current.click()
    }))

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFiles([])
        desc.clear()
    };

    function formChange(e) {
        const efiles = e.target.files;

        for (let i = 0; i < efiles.length; i++) {
            handleSetFile(efiles[i])
        }
        // e.target.files.forEach((file) => {
        //     setFiles(p => p.push({file, url: URL.createObjectURL(file)}))
        // })
        console.log(filesArrayRef)
        setOpen(true)
        ff.current.value = null
    }

    function handleSetFile(file) {
        setFiles(filesArrayRef.current.concat([{ file, url: URL.createObjectURL(file) }]))
    }

    function handleFileDelete(idx) {
        const last = (filesArrayRef.current.length == 1);
        am.current.handleOpenAlert({title: 'Добавить пост', text: last ? 'Это последние изображение, если Вы его удалите это зактроет окно добавления. Уверены?' :'Удалить изображение?', acceptText: 'Удалить'})
            .then(() => {
                setFiles(filesArrayRef.current.filter((_, i) => i != idx))
                if (last) handleClose()
            })
            .catch(() => 0)
    }

    return (
        <div>
            <Box display="none">
                <input type="file" multiple ref={ff} onChange={formChange} />
            </Box>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Добавить пост
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Добавить
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <>
                    <Box display="flex" alignItems="center" flexWrap="wrap" my={2}>
                        {
                            filesArrayRef.current.map(({ url }, i) => (
                                <div key={i} className={classes.attach_wrapper}>
                                    <div className="close" onClick={() => handleFileDelete(i)}>
                                        <CloseIcon />
                                    </div>
                                    <Avatar variant="square" className={classes.square} src={url} />
                                </div>
                            ))
                        }
                    </Box>
                    <Divider/>
                    <Box my={2}>
                        <TextField
                            fullWidth
                            id="standard-multiline-static"
                            label="Описание к записи"
                            placeholder="Ваше описание..."
                            multiline
                            variant="outlined"
                            {...desc.bind}
                        />
                    </Box>
                    </>
                </Container>
            </Dialog>
            <AlertModal ref={am}/>
        </div>
    );
})