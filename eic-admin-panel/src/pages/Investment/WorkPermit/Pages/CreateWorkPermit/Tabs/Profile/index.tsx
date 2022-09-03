import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  TextField,
  Grid,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material/";
import { ProjectStageTypes } from "src/models/InvestmentModels/work_permit";
import {
  Actions as BufferActions,
  selectCreateWorkPermitForm,
} from "src/store/States/Buffer";
import { useDispatch, useSelector } from "react-redux";
import { ProjectStages } from "src/models/InvestmentModels/project";

interface Props {
  sectors: any[];
  sub_sectors: any[];
  activities: any[];
  investment_activities: any[];
  goPrev: () => void;
  goNext: (data: any) => void;
  mainData: any;
}

const ProjectProfile: React.FC<Props> = (props) => {
  const requiredInputs = [
    "title",
    "project_stage",
    "previous_permit_number",
    "start_date",
    "end_date",
    "operation_date",
    "environmental_impact",
    "project_summary",
    "region",
    "zone",
    "city",
    "kebele",
    "sector",
    "sub_sector",
    "activity",
    "investment_activity",
  ];

  const [industrailPark, setIndustrailPark] = useState(false);

  const [allowed_sub_sectors, setAllowedSubSectors] = useState([]);
  const [allowed_activities, setAllowedActivities] = useState([]);
  const [allowed_investment_activities, setAllowedInvestmentActivities] =
    useState([]);

  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState({});

  useEffect(() => {
    setFormData(props.mainData);
  }, [props.mainData, setFormData]);

  useEffect(() => {
    if (props.mainData["sector"]) {
      setAllowedSubSectors(
        props.sub_sectors.filter(
          (sub_sector) =>
            String(sub_sector.sector) === String(props.mainData["sector"])
        )
      );
    }
    if (props.mainData["sub_sector"]) {
      setAllowedActivities(
        props.activities.filter(
          (activity) =>
            String(activity.sub_sector) === String(props.mainData["sub_sector"])
        )
      );
    }
    if (props.mainData["activity"]) {
      setAllowedInvestmentActivities(
        props.investment_activities.filter(
          (investment_activity) =>
            String(investment_activity.activity) ===
            String(props.mainData["activity"])
        )
      );
    }
  }, [props.mainData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "sector") {
      setAllowedSubSectors(
        props.sub_sectors.filter(
          (sub_sector) => String(sub_sector.sector) === String(value)
        )
      );
    } else if (name === "sub_sector") {
      setAllowedActivities(
        props.activities.filter(
          (activity) => String(activity.sub_sector) === String(value)
        )
      );
    } else if (name === "activity") {
      setAllowedInvestmentActivities(
        props.investment_activities.filter(
          (investment_activity) =>
            String(investment_activity.activity) === String(value)
        )
      );
    }
    const errorInfo = generateErrors();
    setFormData({ ...formData, [name]: value });
  };

  const generateErrors = () => {
    const keys = Object.keys(formData);
    const values = Object.keys(formData);

    const errors_keys = [];
    const error_values = [];
    requiredInputs.forEach((input) => {
      const foundIndex = keys.findIndex((item) => item === input);
      if (foundIndex < 0) {
        errors_keys.push(input);
        error_values.push(true);
      } else {
        if (String(values[foundIndex]) === "") {
          errors_keys.push(input);
          error_values.push(true);
        }
      }
    });

    const _errorData = {};
    errors_keys.forEach((key, idx) => {
      _errorData[key] = error_values[idx];
    });

    return _errorData;
  };

  const onSubmit = () => {
    const errorInfo = generateErrors();
    setErrorData(errorInfo);
    if (Object.keys(errorInfo).length === 0) {
      props.goNext(formData);
    }
  };

  const getError = (name: string) => {
    const foundIndex = Object.keys(errorData).findIndex((key) => key === name);
    return foundIndex >= 0
      ? {
          value: errorData[name],
          text: errorData[name] ? "This is a required field" : "",
        }
      : { value: false, text: false };
  };

  const getValue = (name: string) => {
    const foundIndex = Object.keys(props.mainData).findIndex(
      (key) => key === name
    );
    return foundIndex >= 0 ? props.mainData[name] : "";
  };

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 2 }}
      >
        New Work Permit
      </Typography>

      <Grid container spacing={3}>
        <Grid item md={4}>
          <TextField
            required
            label="Project Title"
            sx={{ width: 1 }}
            name="title"
            defaultValue={getValue("title")}
            error={getError("title").value}
            helperText={getError("title").text}
            onChange={handleChange}
          />
        </Grid>

        <Grid item md={4}>
          <TextField
            required
            label="Project Stage"
            select
            sx={{ width: 1 }}
            name="project_stage"
            defaultValue={getValue("project_stage")}
            error={getError("project_stage").value}
            helperText={getError("project_stage").text}
            onChange={handleChange}
          >
            {Object.values(ProjectStages).map((item) => (
              <MenuItem key={item} value={item}>
                {String(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={4}>
          <TextField
            required
            label="Pervious Permit Number"
            sx={{ width: 1 }}
            name="previous_permit_number"
            defaultValue={getValue("previous_permit_number")}
            error={getError("previous_permit_number").value}
            helperText={getError("previous_permit_number").text}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        display="flex"
        alignItems="flex-start"
        sx={{ mt: 2 }}
      >
        <Grid item md={4}>
          <TextField
            required
            type="date"
            label="Start Date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 1 }}
            name="start_date"
            defaultValue={getValue("start_date")}
            error={getError("start_date").value}
            helperText={getError("start_date").text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            required
            type="date"
            label="End Date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 1 }}
            name="end_date"
            defaultValue={getValue("end_date")}
            error={getError("end_date").value}
            helperText={getError("end_date").text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            required
            type="date"
            label="Operation Date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 1 }}
            name="operation_date"
            defaultValue={getValue("operation_date")}
            error={getError("operation_date").value}
            helperText={getError("operation_date").text}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        display="flex"
        alignItems="flex-start"
        sx={{ mt: 2 }}
      >
        <Grid item md={6}>
          <TextField
            required
            label="Environmental Impact"
            sx={{ width: 1 }}
            name="environmental_impact"
            defaultValue={getValue("environmental_impact")}
            error={getError("environmental_impact").value}
            helperText={getError("environmental_impact").text}
            onChange={handleChange}
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            required
            label="Project Profile Summary"
            sx={{ width: 1 }}
            name="project_summary"
            defaultValue={getValue("project_summary")}
            error={getError("project_summary").value}
            helperText={getError("project_summary").text}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 5 }}
      >
        Project Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <TextField
            required
            label="Region"
            select
            sx={{ width: 1 }}
            name="region"
            defaultValue={getValue("region")}
            error={getError("region").value}
            helperText={getError("region").text}
            onChange={handleChange}
          >
            {Object.values(ProjectStageTypes).map((item) => (
              <MenuItem key={item} value={item}>
                {String(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Zone"
            select
            sx={{ width: 1 }}
            name="zone"
            defaultValue={getValue("zone")}
            error={getError("zone").value}
            helperText={getError("zone").text}
            onChange={handleChange}
          >
            {Object.values(ProjectStageTypes).map((item) => (
              <MenuItem key={item} value={item}>
                {String(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Wereda"
            sx={{ width: 1 }}
            name="city"
            defaultValue={getValue("city")}
            error={getError("city").value}
            helperText={getError("city").text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Kebele"
            sx={{ width: 1 }}
            name="kebele"
            defaultValue={getValue("kebele")}
            error={getError("kebele").value}
            helperText={getError("kebele").text}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        style={{ marginTop: 15 }}
        direction="row"
        alignItems="center"
      >
        <Grid item md={3}>
          <TextField
            required
            sx={{ width: 1 }}
            label="Specific Area Name"
            name="specific_area_name"
            defaultValue={getValue("specific_area_name")}
            error={getError("specific_area_name").value}
            helperText={getError("specific_area_name").text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={3}>
          <FormControlLabel
            label="Is industrial park?"
            control={
              <Checkbox onChange={() => setIndustrailPark(industrailPark)} />
            }
          />
        </Grid>
      </Grid>

      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 5 }}
      >
        Category
      </Typography>

      <Grid container spacing={3}>
        <Grid item md={6}>
          <TextField
            required
            label="Sector"
            sx={{ width: 1 }}
            select
            name="sector"
            defaultValue={getValue("sector")}
            error={getError("sector").value}
            helperText={getError("sector").text}
            onChange={handleChange}
          >
            {props.sectors.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={6}>
          <TextField
            required
            label="SubSector"
            sx={{ width: 1 }}
            select
            name="sub_sector"
            defaultValue={getValue("sub_sector")}
            error={getError("sub_sector").value}
            helperText={getError("sub_sector").text}
            onChange={handleChange}
          >
            {allowed_sub_sectors.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={6}>
          <TextField
            required
            label="Activity"
            sx={{ width: 1 }}
            select
            name="activity"
            defaultValue={getValue("activity")}
            error={getError("activity").value}
            helperText={getError("activity").text}
            onChange={handleChange}
          >
            {allowed_activities.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={6}>
          <TextField
            required
            label="Investment Activity"
            sx={{ width: 1 }}
            select
            name="investment_activity"
            defaultValue={getValue("investment_activity")}
            error={getError("investment_activity").value}
            helperText={getError("investment_activity").text}
            onChange={handleChange}
          >
            {allowed_investment_activities.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ margin: 1, pb: 1.2, pt: 1.2, pl: 4, pr: 4 }}
            variant="contained"
            color="secondary"
            type="button"
            onClick={props.goPrev}
          >
            Previous
          </Button>
        </Grid>
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ margin: 1, pb: 1.2, pt: 1.2, pl: 4, pr: 4 }}
            variant="contained"
            color="primary"
            type="button"
            onClick={onSubmit}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectProfile;
