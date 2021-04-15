import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Fab from '@material-ui/core/Fab';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddIcon from '@material-ui/icons/Add';
import {NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from '@material-ui/icons/AccountCircle';
import NewPostModal from '../modals/NewPostModal';

const useStyles = makeStyles((theme) => ({
    root:{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%'
    },
    fab: {
        position: 'fixed',
        left: '50%',
        bottom: '20px',
        transform: 'translateX(-50%)'
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    active: {
        backgroundColor: theme.palette.primary.main,
        color: '#FFF'
    },
    default: {
        backgroundColor: theme.palette.grey['400'],
        color: '#000'
    }
}));

function BottomNav({user}){
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const newPostDialog = useRef(null)

    function getUserAvatar(){
        if(user.avatar) return `http://api.lc/storage/${user.avatar}`
        return user.avatar
    }

    function openAddDialog() {
        newPostDialog.current.handleOpenAdd()
    }

    return (
        <div className={classes.root}>
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={openAddDialog}
            >
                <AddIcon />
            </Fab>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {setValue(newValue)}}                
            >
                <BottomNavigationAction value="" label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction disabled/>
                <BottomNavigationAction
                    value={user.name}
                    label={user.name}
                    icon={<Avatar src={getUserAvatar()} className={classes.small+' ' + (value==user.name ? classes.active : classes.default)}/>} 
                />
            </BottomNavigation>
            <NewPostModal ref={newPostDialog}/>
        </div>
    )
}

function MSTP(state) {
    return {
        user: state.auth.user
    }
}

export default withRouter(connect (MSTP) (BottomNav))