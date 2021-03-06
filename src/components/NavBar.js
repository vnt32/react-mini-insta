import React from 'react';
import {connect} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Box, Container, LinearProgress, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {logout} from "../redux/actions/authActions";
import {NavLink, withRouter} from "react-router-dom";
import { Close } from '@material-ui/icons';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';;

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles ((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: '64px'
    },
    menuButton: {
        marginRight: theme.spacing (2),
    },
    title: {
        textDecoration: "none",
        color: "white",
        flexGrow: 'unset',
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            flexGrow: 1,
            margin: 'unset'
        },
    },
    avatar: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        },
    },
    small: {
        width: theme.spacing(2.5),
        height: theme.spacing(2.5)
    },
    posts: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: '10px'
    },
    danger: {
        background: red[500]
    },
    success: {
        background: green[600]
    },
    paper:{
        borderTop: 'unset',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        position: "absolute",
        top: "63px",
        left: 0,
        right: 0
    }
}));

function NavBar({loader, user, logout, history, background}) {
    const classes = useStyles ();

    const [anchorEl, setAnchorEl] = React.useState (null);
    const open = Boolean (anchorEl);


    const handleMenuOpen = e => {
        setAnchorEl (e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl (null);
    };

    const handleMenuProfile = () => {
        handleMenuClose()
        history.push(`/${user.username}`)
    };

    const handleMenuSettings = () => {
        handleMenuClose()
        history.push("/settings")
    };

    function handleLogout(){
        handleMenuClose()
        logout();
    }

    function getUserAvatar(){
        if(user.avatar) return `http://api.lc/storage/${user.avatar}`
        return user.avatar
    }

    return (
        <div className={classes.root}>
            <ElevationScroll>
                <>
                    <AppBar>
                        <Container component="div" maxWidth="md">
                            <Toolbar>
                                <Typography component={NavLink} to="/" variant="h6" className={classes.title}>
                                    HOSTER APP
                                </Typography>
                                <div className={classes.avatar}>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenuOpen}
                                        color="inherit"
                                    >
                                        {user ? <Avatar src={getUserAvatar()} className={classes.small}/> : <AccountCircle/>}
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={open}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem onClick={handleMenuProfile}>
                                            ??????????????
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuSettings}>
                                            ??????????????????
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>??????????</MenuItem>
                                    </Menu>
                                </div>
                            </Toolbar>
                        </Container>
                        {loader && <LinearProgress color={"secondary"}/>}
                        {
                            background != null &&
                            <Paper variant="outlined" className={classes.paper}>
                                {
                                    background.type == 'progress' &&
                                    <Box display="flex" alignItems="center" width="100%" paddingLeft="15px">
                                        <Avatar variant="square" src={background?.image} className={classes.posts}/>
                                        <Box width="100%" mr="10px">
                                            <LinearProgress color="secondary" variant={background.percent == 0 || background.percent == 100  ? "indeterminate" :'determinate'} value={background.percent}/>
                                        </Box>
                                        <IconButton>
                                            <Close/>
                                        </IconButton>
                                    </Box>
                                }
                                {
                                    (background.type == 'danger' || background.type == 'success') &&
                                    <Box className={classes[background.type]} display="flex" alignItems="center" justifyContent="center" py={1}>
                                        <Typography>
                                            {background.type == 'danger' && '?????????????????? ????????????!'}
                                            {background.type == 'success' && '???????? ?????????????? ????????????????!'}
                                        </Typography>
                                    </Box>
                                }

                            </Paper>
                        }
                    </AppBar>
                </>
            </ElevationScroll>
        </div>
    );
}

//?????????????????????? ?? props ???????????????? ???? state(redux) -> ?? connect
function mapStateToProps(state) {
    return {
        loader: state.global.topLoader,
        user: state.auth.user,
        background: state.global.background
    }
}

function MDTP(dispatch){
    return {
        logout: () => dispatch(logout())
    }
}

export default withRouter(connect (mapStateToProps, MDTP) (NavBar))
