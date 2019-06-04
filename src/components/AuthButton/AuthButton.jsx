import { getUser, signOut } from "../../api";
import { withRouter } from "react-router-dom";
import React from "react";

export const AuthButton = withRouter(({ history }) => {
    const user = getUser();
    return user != null
        ? (<p>
            Welcome {user.email}{" "}
            <button onClick={() => {
                signOut().then(() => {
                    history.push('/');
                })
            }}>
                Sign Out
            </button>
        </p>)
        : (<p>You are not logged in</p>);
    }
);
