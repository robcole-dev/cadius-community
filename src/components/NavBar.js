import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../css/NavBar.module.css';
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const createIcons = 
        <>
            <NavLink to={'/screenshots/create'} className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-plus-square"></i>Add Screenshot</NavLink>
            <NavLink to={'/servers/create'} className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-plus-square"></i>Add Server</NavLink>
        </>

    const loggedInIcons =
        <>
            <NavLink to={`/profiles/${currentUser?.profile_id}`} className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-id-card"></i>{currentUser?.username}</NavLink>
            <NavLink onClick={handleSignOut} to="/" className={styles.NavLink}><i className="fas fa-sign-out-alt"></i>Sign Out</NavLink>
        </>

    const loggedOutIcons =
        <>
            <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-sign-in-alt"></i>Sign In</NavLink>
            <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-sign-in-alt"></i>Signup</NavLink>
        </>

    return (
        <Navbar expanded={expanded} className={styles.NavBar} expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand><img src={logo} alt="logo" /></Navbar.Brand>
                <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-home"></i>Home</NavLink>
                        <NavLink exact to="/servers" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-headset"></i>Servers</NavLink>
                        <NavLink exact to="/screenshots" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-book"></i>Screenshots</NavLink>
                    </Nav>
                    <Nav>
                        {currentUser && createIcons}
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;