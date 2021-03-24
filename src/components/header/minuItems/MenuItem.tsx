// OUTER
import React from 'react';
import {NavLink} from "react-router-dom";

// LOCAL
import "./MenuItem.css"

type IMenuItem = (props: { data: { path: string; name: string } }) => JSX.Element

const MenuItem: IMenuItem = (props: { data: { path: string, name: string } }) => {

    return (
        <li className="navMenu__li">
            <NavLink
                exact
                to={"/" + props.data.path}
                activeClassName="navMenu__navLink__active"
                className="navMenu__navLink"
            >
                {props.data.name}
            </NavLink>
        </li>
    )
}

export default MenuItem
