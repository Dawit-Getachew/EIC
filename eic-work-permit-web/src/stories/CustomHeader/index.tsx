import React from 'react';
import { Button, Grid, IconButton } from "@mui/material"
import './header.css';
import Logo from "../assets/vector_white.png"
import ProfileLogo from "../assets/profile.png"
import VerticalImage from "../assets/vertical.png"
import { NotificationsActive, SearchSharp, KeyboardArrowDownSharp } from "@mui/icons-material"

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <header>
    <div className="wrapper">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
        width="100%"
      >
        <Grid item md={2} xs={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={Logo} className="logo" />
            <h1 style={{ marginLeft: 0, color: "white", fontFamily: "Poppins", fontSize: 23 }}>NIONLINE</h1>
          </div>
        </Grid>
        <Grid item md={6}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={3}
            width="100%"
            style={{ display: "flex", flexDirection: "row", color: "white" }}
          >
            <Grid item md={2} xs={12} className="activeNavElement navElement">Home</Grid>
            <Grid item md={2} xs={12} className="navElement">Our Services</Grid>
            <Grid item md={2} xs={12} className="navElement">Procedures</Grid>
            <Grid item md={2} xs={12} className="navElement">Help Center</Grid>
            <Grid item md={2} xs={12} className="navElement">About Us</Grid>
          </Grid>
        </Grid>
        <Grid item md={4} direction="row" justifyContent="flex-end" style={{
          justifyContent: "flex-end",
          display: "flex",
          alignItems: "center",
          marginLeft: -10
        }}>
          <IconButton style={{ color: "white" }}>
            <SearchSharp />
          </IconButton>
          <IconButton style={{ color: "white" }}>
            <NotificationsActive />
          </IconButton>
          <img src={VerticalImage} className="vertical-image" />
          <img src={ProfileLogo} className="profile-logo" />
          <div style={{ color: "white", marginRight: 10 }}>{user ? user.name ? user.name : "" : ""}</div>
          <IconButton style={{ color: "white" }}>
            <KeyboardArrowDownSharp />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  </header >
);
