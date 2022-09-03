import React, { FC, useState } from "react";
import { Box, Grid, IconButton, Typography, Slide } from "@mui/material";
import "./header.css";
import { AccountCircle } from "@mui/icons-material";
import TimelineIcon from "@mui/icons-material/Timeline";
import AutoAwesomeMosaicIcon from "@mui/icons-material/Timeline";
import CloseIcon from "@mui/icons-material/CloseRounded";
import AddIcon from "@mui/icons-material/Add";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SettingsIcon from "@mui/icons-material/Settings";
import { Header } from "../CustomHeader/index";
import { useNavigate } from "react-router";
import routes from "src/routes";
import Logo from "src/assets/images/core/eic-logo.png";

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

const sidebar_items = [
  {
    Icon: TimelineIcon,
    title: "Dashboard",
    link: "/",
  },
  {
    Icon: AccountCircle,
    title: "Services",
    link: routes.INVESTMENT.SERVICES.ROUTE,
  },
  {
    Icon: AddIcon,
    title: "New Permit",
    link: routes.INVESTMENT.NEW_INVESTMENT_PERMIT.ROUTE,
  },
  {
    Icon: AutoAwesomeMosaicIcon,
    title: "My Permits",
    link: routes.INVESTMENT.MY_INVESTMENT_PERMITS.ROUTE,
  },
  {
    Icon: DoneAllIcon,
    title: "Renew Permits",
    link: routes.INVESTMENT.RENEW_INVESTMENT_PERMIT.ROUTE,
  },
  {
    Icon: CloseIcon,
    title: "Cancel Permits",
    link: routes.INVESTMENT.CANCEL_INVESTMENT_PERMIT.ROUTE,
  },
  {
    Icon: AccountTreeTwoToneIcon,
    title: "Expand Permits",
    link: routes.INVESTMENT.EXPAND_MY_INVESTMENT_PERMITS.ROUTE,
  },
  {
    Icon: SettingsIcon,
    title: "Amend Permits",
    link: routes.INVESTMENT.AMEND_INVESTMENT_PERMIT.ROUTE,
  },
];

const iconStyle = {
  width: 45,
  height: 45,
  paddingRight: 10,
  paddingLeft: 10,
};

const Sidebar: FC<HeaderProps> = ({ user, ...props }) => {
  const [activeSidebar, setActiveSidebar] = useState("");
  const [openSidebar, setOpenSidebar] = useState(true);

  const navigate = useNavigate();

  const handleChange = (link: string) => {
    navigate(link, { replace: true });
  };

  const IconsList: FC<SidebarLayoutProps> = (props) => {
    return (
      <>
        {sidebar_items.map((item) => (
          <div className="sidebar-icon-item">
            <IconButton
              className="sidebar-icon"
              style={
                props.activeSidebar === item.link
                  ? { color: "blue" }
                  : { color: "gray" }
              }
              onClick={() => props.handleChange(item.link)}
            >
              {<item.Icon style={iconStyle} />}
            </IconButton>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Grid container width="100vw" height="100vh" direction="row">
        {/* <Slide direction="right" in={openSidebar} mountOnEnter unmountOnExit> */}
        <Grid item style={{ width: "290px" }}>
          <Box>
            <SidebarLayout
              {...props}
              user={user}
              activeSidebar={props.activeSidebar}
              handleChange={handleChange}
              handleClose={() => setOpenSidebar(!openSidebar)}
            />
          </Box>
        </Grid>

        <Grid item className={"right-side-container"} xs width="290px">
          <Header
            user={{ name: "John Doe" }}
            onLogin={function (): void {
              throw new Error("Function not implemented.");
            }}
            onLogout={function (): void {
              throw new Error("Function not implemented.");
            }}
            onCreateAccount={function (): void {
              throw new Error("Function not implemented.");
            }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {props.breadcrumps}
          </div>

          <div
            className="inside-main-container"
            style={{ backgroundColor: "#F2F5F9" }}
          >
            {props.children}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export const SidebarLayout = ({
  user,
  activeSidebar,
  ...props
}: SidebarLayoutProps) => {
  return (
    <>
      <Grid className="sidebar-wrapper">
        <div className="sidebar-container">
          <Grid
            container
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            style={{ padding: "30px 0" }}
          >
            <Grid item style={{ textAlign: "center" }}>
              <img src={Logo} alt="" className="sidebar-logo" />
              <Typography variant="h3" className="sidebar-logo-txt">
                Ethiopian Investment Commission
              </Typography>
            </Grid>
          </Grid>
          {sidebar_items.map((item) => (
            <div
              className="sidebar-item"
              style={
                activeSidebar === item.link
                  ? {
                      background: "white",
                      color: "#555",
                      boxShadow: `-4px 5px 5px rgba(0, 0, 0, 0.16)`,
                    }
                  : {
                      color: "#ddd",
                    }
              }
            >
              <IconButton
                className="sidebar-icon"
                style={{
                  color: activeSidebar === item.link ? "#555" : "#ddd",
                }}
                onClick={() => props.handleChange(item.link)}
              >
                {<item.Icon style={iconStyle} />}
              </IconButton>
              <Typography
                variant="h6"
                className="nav-typography"
                style={
                  activeSidebar === item.link
                    ? {
                        fontWeight: 600,
                      }
                    : {
                        color: "#ddd",
                      }
                }
                onClick={() => props.handleChange(item.link)}
              >
                {item.title}
              </Typography>
            </div>
          ))}
        </div>
      </Grid>
    </>
  );
};

export default Sidebar;
