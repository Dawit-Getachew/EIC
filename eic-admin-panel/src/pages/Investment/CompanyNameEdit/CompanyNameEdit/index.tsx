import React, { useState, useReducer, useEffect, FC } from "react";
import {
  MenuItem,
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import "./styles.css";
import {
  formInitState,
  formReducer,
  register,
  setFormDefaults,
  FormActions,
  selectRequriedKeys,
} from "src/common/form";
import CloudIcon from "src/assets/cloud-icon.png";
import RightIcon from "src/assets/user-right.png";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { useSelector } from "react-redux";
import { ModalElement } from "./modals";
import countries from "src/common/countries";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface Props {
  register: (name: string) => any
}

const CompanyNameEdit: FC<Props> = (props) => {
  return (
    <div>
      <div className="form-box-content">
        <Grid
          width="10"
          container
          className="notice-card"
          display="flex"
          flexDirection="row"
        >
          <Grid item md={2} className="notice-card-icon">
            <InfoOutlinedIcon
              style={{
                fontSize: "2em",
              }}
            />
          </Grid>

          <Grid item md={10}>
            <Typography variant="h3" style={{ fontSize: "16px" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Typography>
          </Grid>
        </Grid>
        <>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  Name of the Company
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...props.register("edited_name")}
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  የድርጅቱ ስም
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...props.register(
                    "edited_name_amharic"
                  )}
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4} style={{ marginTop: 2 }}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  Trade Name
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...props.register("edited_trade_name")}
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  የንግድ ስም
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...props.register("edited_trade_name_amharic")}
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
          </Grid>
          
          <Grid container width="100%" spacing={4} style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <Typography variant="h4" style={{ fontWeight: "normal" }}>
                Memorandum of Association and Articles
              </Typography>
            </Grid>
            <Grid item md={12} xs={12} style={{ marginTop: 5 }}>
              <div className="document-attach-box">
                <Grid
                  container
                  width="100%"
                  spacing={12}
                  justifyContent="flex-start"
                  direction="row"
                >
                  <Grid item md={4}>
                    <div className="flex-r flex-justify-start">
                      <img src={RightIcon} className="cloud-icon" />
                      <div className="document-attach-h2">
                        Memorandum of Association and Articles
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="flex-c flex-both-center">
                      <div className="document-attach-text">
                        Download memorandum of association and articles
                      </div>
                      <div className="document-attach-text2">
                        Will be opened in another tab
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={2}>
                    <div className="flex-both-center">
                      <a
                        href={props.register("company_registration_form").value}
                        style={{ textDecoration: "none" }}
                        download
                        target="_blank"
                      >
                        <Button
                          style={{
                            border: "solid #0F91D2 2px",
                            borderRadius: 5,
                            backgroundColor: "#FBFDFE",
                            color: "#0F91D2",
                            fontSize: 10,
                          }}
                        >
                          Download File
                        </Button>
                      </a>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </>
      </div>
    </div>
  );
};

export default CompanyNameEdit;
