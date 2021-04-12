import React, { useContext, useState, useEffect } from "react";
import {Button, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FollowBtn from "./profile/FollowBtn";
import {FollowContext} from "../contexts/followContext";

export default function FollowersList({items, isFollowed}){
    const [data, setData] = useState(items);

    useEffect(() => {
        setData( p => p.concat(items))
    }, [items])

    const {me, callback} = useContext(FollowContext)

    function getAvatar(avatar){
        return `http://api.lc/storage/${avatar}`
    }

    function change(e, id){
        setData(p => p.map(item => {
            if(item.id == id) item.followed = e
            return item
        }))
        callback(e)
    }

    return (
        <List>
            {
                data.map(item =>
                    <ListItem alignItems="flex-start" key={item.id}>
                        <ListItemAvatar>
                            <Avatar alt={item.username} src={getAvatar(item.avatar)} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.username}
                            secondary={item.name}
                        />
                        {
                            (me && isFollowed) &&
                            <ListItemSecondaryAction>
                                <FollowBtn followed={item.followed} id={item.id} onChange={(e) => change(e, item.id)}/>
                                
                            </ListItemSecondaryAction>
                        }
                        
                    </ListItem>
                )
            }

        </List>
    )
}
