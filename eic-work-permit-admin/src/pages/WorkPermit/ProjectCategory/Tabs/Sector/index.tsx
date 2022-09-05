/* eslint-disable */
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  TextField,
  Grid,
  MenuItem,
  Box,
  Container,
  CircularProgress,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material/";
import {
  LegalStatusTypes,
  FormOfOwnerShipTypes,
  IBusinessProfileInput,
} from "src/models/InvestmentModels/business_profile";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { Selectors, API, Actions } from "src/store/States/Investment/Category/Sector"
import { useSelector, useDispatch } from "react-redux"
import SectorsTable from "./SectorsTable"
import routes from "src/constants/routes"
import { useNavigate } from "react-router"

const CategorySector: React.FC<any> = () => {
  const rows = [
    { name: "Pre Implementation" },
    { name: "Implementation" },
    { name: "Operation" },
  ];

  const dispatch = useDispatch()
  const sectors = useSelector(Selectors.selectSectors)

  const navigate = useNavigate()

  useEffect(() => {
    API.FetchSectors((err, data) => {
      if (err) throw err
      dispatch(Actions.FetchedSectors(data))
    })
  }, [])

  return (
    <>
      <Grid container>
        <Grid item md={6}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ mb: 3, mt: 2 }}
          >
            Project Sector
          </Typography>
        </Grid>

        <Grid item md={6} style={{ textAlign: "right" }}>
          <Button
            sx={{ margin: 1, pb: 1.1, pt: 1.1, pl: 3, pr: 3 }}
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<AddIcon />}
            onClick={() => navigate(routes.WORK_PERMIT.CREATE_SECTOR.ROUTE, { replace: true })}
          >
            New Sector
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <SectorsTable sectors={sectors as any[]} />
        </Grid>
      </Grid>
    </>
  );
};

export default CategorySector;
