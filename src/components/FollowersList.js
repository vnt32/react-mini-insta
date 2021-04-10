import React from "react";
import {Divider, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

export default function FollowersList({items}){

    function getAvatar(avatar){
        return `http://api.lc/storage/${avatar}`
    }

    return (
        <List>
            {
                items.map(item =>
                    <ListItem alignItems="flex-start" key={item.id}>
                        <ListItemAvatar>
                            <Avatar alt={item.username} src={getAvatar(item.avatar)} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.username}
                            secondary={item.name}
                        />
                    </ListItem>
                )
            }

        </List>
    )
}
