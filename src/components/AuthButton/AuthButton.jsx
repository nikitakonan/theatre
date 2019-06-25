import { getUser, signOut } from "../../api";
import { withRouter } from "react-router-dom";
import React from "react";
import { Typography, Button } from "@material-ui/core";

export const AuthButton = withRouter(({ history }) => {
    const user = getUser();
    return user != null
        ? (
            <>
                <Typography style={{ marginLeft: 20, color: '#eee' }} variant="caption">
                    Привет {user.email}{" "}
                </Typography>
                <Button color="inherit" onClick={() => { signOut().then(() => { history.push('/'); }) }}>
                    Выйти
                </Button>
            </>
        )
        : (
            <Typography style={{ marginLeft: 20, color: '#eee' }} variant="caption">
                Вы не зарегистрированы
            </Typography>
        );
}
);
