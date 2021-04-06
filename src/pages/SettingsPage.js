import React from "react";
import {Avatar, Box, Container, Grid, makeStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

export default function SettingsPage() {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <Box mt={3}>
                <Grid container>
                    <Grid item xs={3}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large}/>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
};
