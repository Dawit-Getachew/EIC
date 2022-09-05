/* eslint-disable */
import {
  Alert,
  TextField,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import styled from "@mui/styled-engine";
import { Box } from "@mui/system";
import React from "react";
import logo from "./../../../assets/images/core/logo.png";
import { useNavigate } from "react-router";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `
);

const ResetAccount = () => {
  const navigate = useNavigate();

  const ResetForm = () => (
    <form>
      <div className="content">
        <TextField
          sx={{ mt: 1, width: 1 }}
          label="Phone Number"
          variant="standard"
          margin="dense"
          inputProps={{
            style: {
              paddingBottom: 15,
            },
          }}
        />
      </div>
      <div className="action">
        <Button
          sx={{ mt: 5, width: 1, p: 1.5, borderRadius: 40 }}
          variant="contained"
          type="submit"
          onClick={() => {
            navigate("/reset/confirm", {
              replace: true,
            });
          }}
        >
          SEND MESSAGE
        </Button>
      </div>
    </form>
  );

  return (
    <MainContent>
      <Box>
        <Card sx={{ minWidth: 350, boxShadow: 0, borderRadius: 0 }}>
          <Box
            component={Stack}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ pl: 4, pr: 4, pt: 4, width: 1 }}
          >
            <Paper
              component={Stack}
              variant="outlined"
              sx={{ border: "none", width: 1 }}
              justifyContent="center"
              style={{ justifyContent: "center", display: "flex" }}
            >
              <img src={logo} style={{ width: "150px", margin: "auto" }} />

              <Typography variant="h2" align="center" sx={{ mt: 3 }}>
                Reset Your Account
              </Typography>
            </Paper>
          </Box>

          <CardContent>
            <CardContent>{ResetForm()}</CardContent>
          </CardContent>
        </Card>
      </Box>
    </MainContent>
  );
};

export default ResetAccount;
