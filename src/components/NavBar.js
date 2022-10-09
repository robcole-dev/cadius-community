import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../css/NavBar.module.css';
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'

const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="lg">
            <Container fluid>
                <Navbar.Brand><img src={logo} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-home"></i>Home</NavLink>
                        <NavLink to="/servers" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-headset"></i>Servers</NavLink>
                        <NavLink to="/tutorials" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-book"></i>Tutorials / Guides</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink to="/profile" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-id-card"></i>Profile</NavLink>
                        <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-sign-in-alt"></i>Login / Signup</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;