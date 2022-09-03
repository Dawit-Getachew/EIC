import React, { FC, useState } from 'react';
import { Box, Grid, IconButton, Typography, Slide } from "@mui/material"
import './header.css';
import Logo from "../assets/vector_white.png"
import VectorStroke from "../assets/vector_stroke.png"
import ProfileLogo from "../assets/profile.png"
import VerticalImage from "../assets/vertical.png"
import { NotificationsActive, SearchSharp, KeyboardArrowDownSharp, AccountCircle } from "@mui/icons-material"
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import TimelineIcon from '@mui/icons-material/Timeline';
import AddIcon from '@mui/icons-material/Add';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MenuIcon from '@mui/icons-material/Menu';
import { Header } from "../CustomHeader/index"

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  activeSidebar: string;
  breadcrumps?: any;
}

interface SidebarLayoutProps {
  user?: User;
  activeSidebar: string;
  handleChange: (title: string) => void;
  handleClose: () => void;
  children?: any;
  breadcrumps?: any;
}

const links = [
  {
    link: "#",
    icon: <TimelineIcon style={{
      width: 35,
      height: 33,
      paddingRight: 10,
      paddingLeft: 10
    }} />,
    title: "Dashboard"
  },
  {
    link: "#",
    icon: <AccountCircle style={{
      width: 35,
      height: 33,
      paddingRight: 10,
      paddingLeft: 10
    }} />,
    title: "Services"
  },
  {
    link: "#",
    icon: <AutoAwesomeMosaicIcon style={{
      width: 35,
      height: 33,
      paddingRight: 10,
      paddingLeft: 10
    }} />,
    title: "Procedures"
  },
  {
    link: "#",
    icon: <AddIcon style={{
      width: 35,
      height: 33,
      paddingRight: 10,
      paddingLeft: 10
    }} />,
    title: "New Permit"
  },
  {
    link: "#",
    icon: <DoneAllIcon style={{
      width: 35,
      height: 33,
      paddingRight: 10,
      paddingLeft: 1,
    }} />,
    title: "Renew Permits"
  }
]

export const Sidebar: FC<HeaderProps> = ({ user, ...props }) => {
  const [activeSidebar, setActiveSidebar] = useState("");
  const [openSidebar, setOpenSidebar] = useState(true)

  const handleChange = (title: string) => setActiveSidebar(title)

  const IconsList: FC<SidebarLayoutProps> = (props) => {
    return (
      <>
        {links.map(item => (
          <div className="sidebar-icon-item">
            <IconButton className="sidebar-icon" style={activeSidebar === item.title ? { color: "blue" } : { color: "gray" }} onClick={() => props.handleChange(item.title)}>
              {item.icon}
            </IconButton>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      <Header user={{ name: "John Doe" }} onLogin={function (): void {
        throw new Error('Function not implemented.');
      }} onLogout={function (): void {
        throw new Error('Function not implemented.');
      }} onCreateAccount={function (): void {
        throw new Error('Function not implemented.');
      }} />
      <Grid
        container
        width="100vw"
        height="100vh"
        direction="row"
      >

        <Slide direction="right" in={openSidebar} mountOnEnter unmountOnExit>
          <Grid item md={2}>
            <Box sx={{ width: `calc(100px + 16px)` }} style={{ width: "18vw" }}>
              <SidebarLayout {...props} user={user} activeSidebar={activeSidebar} handleChange={handleChange} handleClose={() => setOpenSidebar(!openSidebar)} />
            </Box>
          </Grid>
        </Slide>
        <Slide direction="left" in={!openSidebar} mountOnEnter unmountOnExit timeout={300}>
          <Grid item md={1}>
            <Box style={{ width: "8vw" }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <IconButton className="sidebar-icon-item">
                  <MenuIcon style={{ color: "black" }} onClick={() => setOpenSidebar(!openSidebar)} />
                </IconButton>
                <IconsList
                  user={user}
                  activeSidebar={activeSidebar}
                  handleChange={handleChange}
                  handleClose={() => setOpenSidebar(!openSidebar)}
                  {...props}
                />
              </div>
            </Box>
          </Grid>
        </Slide>
        <Grid item md={openSidebar ? 10 : 11}>
          <div style={{ display: "flex", flexDirection: "column", width: "100vw" }}>
            {props.breadcrumps}
            <div className="inside-main-container" style={{ backgroundColor: "#F2F5F9" }}>
              {props.children}
            </div>
          </div>
        </Grid>
      </Grid>
    </>

  )
}



export const SidebarLayout = ({ user, activeSidebar, ...props }: SidebarLayoutProps) => {
  return (
    <>
      <div style={{ width: "61vh", height: "100vh", display: "flex", flexDirection: "row" }}>
        <div className="sidebar-container">
          <Grid
            container
            width="100%"
            justifyContent="flex-end"
          >
            <Grid item md={3}>
              <IconButton className="sidebar-close-icon" onClick={() => props.handleClose()}>
                <img src={VectorStroke} className="vector-stroke" />
              </IconButton>
            </Grid>
          </Grid>
          {links.map(item => (
            <div className="sidebar-item" style={activeSidebar === item.title ? {
              backgroundImage: "linear-gradient(to right, #023b87, #24528F, #4D73A6)",
              color: "white",
              boxShadow: `-4px 5px 5px rgba(0, 0, 0, 0.16)`
            } : {
              color: "black"
            }}>
              <IconButton className="sidebar-icon" style={activeSidebar === item.title ? { color: "white" } : { color: "gray" }} onClick={() => props.handleChange(item.title)}>
                {item.icon}
              </IconButton>
              <Typography
                variant="h6" fontSize={18} style={activeSidebar === item.title ? {
                  textDecoration: 'none', fontFamily: "Poppins", fontWeight: 600, cursor: "pointer"
                } : { textDecoration: 'none', fontFamily: "Poppins", color: "#121F3E", cursor: "pointer" }}
                onClick={() => props.handleChange(item.title)}
              >
                {item.title}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
