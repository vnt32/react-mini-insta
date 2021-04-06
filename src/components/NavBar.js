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
import {Container, LinearProgress} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {logout} from "../redux/actions/authActions";
import {NavLink, withRouter} from "react-router-dom";

const useStyles = makeStyles ((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing (2),
    },
    title: {
        textDecoration: "none",
        color: "white",
        flexGrow: 1,
    },
    small: {
        width: theme.spacing(2.5),
        height: theme.spacing(2.5),
    },
}));

function NavBar({loader, user, logout, history}) {
    const classes = useStyles ();

    const [anchorEl, setAnchorEl] = React.useState (null);
    const open = Boolean (anchorEl);


    const handleMenuOpen = e => {
        setAnchorEl (e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl (null);
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
            <AppBar position="static">
                <Container component="div">
                    <Toolbar>
                        <Typography component={NavLink} to="/" variant="h6" className={classes.title}>
                            HOSTER APP
                        </Typography>
                        <div>
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
                                <MenuItem onClick={handleMenuClose}>
                                    Профиль
                                </MenuItem>
                                <MenuItem onClick={handleMenuSettings}>
                                    Настройки
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </Container>
                {loader && <LinearProgress color={"secondary"}/>}
            </AppBar>
        </div>
    );
}

//присваевает в props значения со state(redux) -> в connect
function mapStateToProps(state) {
    return {
        loader: state.global.topLoader,
        user: state.auth.user
    }
}

function MDTP(dispatch){
    return {
        logout: () => dispatch(logout())
    }
}

export default withRouter(connect (mapStateToProps, MDTP) (NavBar))
