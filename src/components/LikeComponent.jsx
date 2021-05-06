import React from 'react';
import FavoriteIcon from "@material-ui/icons/Favorite";
import {IconButton} from "@material-ui/core";

export default function Like (item) {

    return (
        <IconButton aria-label={item?.liked ? 'unlike' : 'like'}>
            <FavoriteIcon color={item?.liked ? 'secondary' : 'inherit'}/>
        </IconButton>
    )
}
