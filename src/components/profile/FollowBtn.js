import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";
import {lightBlue} from "@material-ui/core/colors";
import api from '../../api';

const useStyles = makeStyles((theme) => ({
    btnWrapper: {
        position: 'relative',
        marginLeft: theme.spacing(2)
    },
    buttonProgress: {
        color: lightBlue[100],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

export default function FollowBtn({followed, id, onChange}){
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    function handleAction(){
        setLoading(true)
        getAction(id)
            .then(()=> onChange(!followed))
            .finally(() => setLoading(false))
    }

    function getAction(uid){
        return followed ? api.profile.unfollow(uid) : api.profile.follow(uid)
    }

    return (
        <span className={classes.btnWrapper}>
            <Button
                variant="contained"
                disabled={loading}
                color={followed ? 'secondary' : 'primary'}
                onClick={handleAction}
            >
                {followed ? 'Отписаться' : 'Подписатся'}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </span>
    )
}
