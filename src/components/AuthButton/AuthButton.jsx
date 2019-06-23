import { getUser, signOut } from "../../api";
import { withRouter } from "react-router-dom";
import React from "react";
import { Typography, Button } from "@material-ui/core";

export const AuthButton = withRouter(({ history }) => {
    const user = getUser();
    return user != null
        ? (
            <>
                <Typography variant="subtitle1">
                    Welcome {user.email}{" "}
                </Typography>
                <Button color="inherit" onClick={() => { signOut().then(() => { history.push('/'); }) }}>
                    Sign Out
                </Button>
            </>
        )
        : (
            <Typography>
                You are not logged in
            </Typography>
        );
}
);
