import React from 'react';
import { AppBar as MUIAppBar, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { AuthButton } from "..";

const AppBar = () => {
    return (
        <MUIAppBar position="static">
            <Toolbar>
                <Typography variant="h5" style={{ flex: 1 }}>
                    ТЕАТР
                </Typography>
                <NavLink exact className="nav-link" to="/">СЦЕНА</NavLink>
                <NavLink exact className="nav-link" to="/actors">АКТЕРЫ</NavLink>
                <AuthButton />
            </Toolbar>
        </MUIAppBar>
    );
};

export default AppBar;