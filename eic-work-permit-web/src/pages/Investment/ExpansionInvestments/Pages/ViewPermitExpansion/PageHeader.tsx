/* eslint-disable */
import { FC, useEffect } from "react";
import { Typography, Grid, Box, IconButton, Tooltip } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { useNavigate } from "react-router";
import routes from "src/routes";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ExpansionPermitDocument } from "./PrintPermit";
import { Actions as BufferActions } from "src/store/States/Buffer";
import { useDispatch } from "react-redux";

interface Props {
  data: any;
}
const PageHeader: FC<Props> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      BufferActions.SetBreadCrumps([
        {
          path: "/",
          title: "Home",
        },
        {
          path: "/invest/services",
          title: "Services",
        },
        {
          path: "/invest/expansion/view",
          title: `${props.data.company_name} Expansion Application Form`,
        },
      ])
    );
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton
            color="primary"
            sx={{ p: 2, mr: 2 }}
            onClick={() => {
              navigate(
                routes.WORK_PERMIT.EXPANSION_INVESTMENT_PERMIT_LIST.ROUTE,
                { replace: true }
              );
            }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Grid
          container
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item md={9}>
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                Expansion Permit Application for {props.data.company_name}
              </Typography>
              <Typography variant="subtitle2">
                This is a page shows every detail of {props.data.company_name}{" "}
                work permit application
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3} justifyContent="flex-end">
            <Tooltip arrow placement="top" title="Print Expansion Permit Form">
              <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
                {props.data.permit_status === "APPROVED" ? (
                  <PDFDownloadLink
                    document={
                      <ExpansionPermitDocument
                        data={{
                          ...props.data,
                          ...(() => {
                            const company_keys = Object.keys(
                              props.data.company_address
                            );
                            const company_values = Object.values(
                              props.data.company_address
                            );
                            const company_obj = {};
                            company_values.forEach(
                              (value, idx) =>
                                (company_obj[`company_${company_keys[idx]}`] =
                                  value)
                            );

                            const investment_keys = Object.keys(
                              props.data.investment_address
                            );
                            const investment_values = Object.values(
                              props.data.investment_address
                            );
                            const investment_obj = {};
                            investment_values.forEach(
                              (value, idx) =>
                                (investment_obj[
                                  `investment_${investment_keys[idx]}`
                                ] = value)
                            );
                            return { ...company_obj, ...investment_obj };
                          })(),
                        }}
                      />
                    }
                    fileName="permit_document.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading..." : <PrintIcon />
                    }
                  </PDFDownloadLink>
                ) : (
                  <></>
                )}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PageHeader;
