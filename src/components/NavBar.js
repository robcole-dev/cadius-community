import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../css/NavBar.module.css';
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';

const NavBar = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar expanded={expanded} className={styles.NavBar} expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand><img src={logo} alt="logo" /></Navbar.Brand>
                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink onClick={() => setExpanded(false)} exact to="/" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-home"></i>Home</NavLink>
                        <NavLink onClick={() => setExpanded(false)} to="/servers" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-headset"></i>Servers</NavLink>
                        <NavLink onClick={() => setExpanded(false)} to="/tutorials" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-book"></i>Tutorials / Guides</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink onClick={() => setExpanded(false)} to="/profile" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-id-card"></i>Profile</NavLink>
                        <NavLink onClick={() => setExpanded(false)} to="/signin" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-sign-in-alt"></i>Sign In</NavLink>
                        <NavLink onClick={() => setExpanded(false)} to="/signup" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-sign-in-alt"></i>Signup</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;