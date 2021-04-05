import React from "react";
import {NavLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";


export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link component={NavLink} color="inherit" to="/">
                HOSTER APP
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
