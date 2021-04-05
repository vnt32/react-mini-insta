import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";

export default function AlertBox(props) {
    return <Box mt={2}><MuiAlert elevation={6} variant="filled" {...props} /></Box>;
}
