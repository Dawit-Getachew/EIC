import React from "react";
import { Box, Grid } from "@mui/material";
import "./header.css";
import VerticalImage from "src/assets/vertical.png";
import UserBox from "./UserBox";
import HeaderButtons from "./Buttons";

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
}: HeaderProps) => (
  <header>
    <div className="wrapper">
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={3}
        width="100%"
      >
        <Grid
          item
          md={4}
          direction="row"
          justifyContent="flex-end"
          style={{
            justifyContent: "flex-end",
            display: "flex",
            alignItems: "center",
            marginLeft: -10,
          }}
        >
          <Box display="flex" alignItems="center">
            <HeaderButtons />
          </Box>
          <img src={VerticalImage} className="vertical-image" />
          <UserBox />
        </Grid>
      </Grid>
    </div>
  </header>
);
