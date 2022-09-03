import React, { useState } from "react";
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
import { useForm } from "react-hook-form"
import { IBusinessAddress } from "src/common/interface";

interface Props {
  sectors: any[]
  sub_sectors: any[]
  activities: any[]
  investment_activities: any[]
  goPrev: () => void;
  goNext: () => void;
}

const ProjectProfile: React.FC<Props> = (props) => {
  type FormTypes = {
    title: string
    project_stage: string
    previous_permit_number: string
    start_date: string
    end_date: string
    operation_date: string
    environmental_impact: string
    project_summary: string
    address: IBusinessAddress
    is_industrial_park: boolean
    sector: string
    sub_sector: string
    activity: string
    investment_activity: string
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormTypes>();

  const [industrailPark, setIndustrailPark] = useState(false)


  const onSubmit = (input: FormTypes) => {
    console.log("here")
    props.goNext()
  }

  console.log("errors", errors)

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <TextField
              required
              label="Project Title"
              sx={{ width: 1 }}
              {...register("title", { required: "This is a required field" })}
            />
          </Grid>

          <Grid item md={4}>
            <TextField
              required
              label="Project Stage"
              select
              defaultValue={Object.values(ProjectStageTypes)[0]}
              sx={{ width: 1 }}
              {...register("project_stage", { required: "This is a required field" })}
            >
              {Object.values(ProjectStageTypes).map((item) => (
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
              {...register("previous_permit_number", { required: "This is a required field" })}
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
              {...register("start_date", { required: "This is a required field" })}
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
              {...register("end_date", { required: "This is a required field" })}
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
              {...register("operation_date", { required: "This is a required field" })}
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
            {...register("environmental_impact", { required: "This is a required field" })}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              required
              label="Project Profile Summary"
              sx={{ width: 1 }}
            {...register("project_summary", { required: "This is a required field" })}
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
            {...register("address.region", { required: "This is a required field" })}
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
              {...register("address.zone", { required: "This is a required field" })}
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
            {...register("address.city", { required: "This is a required field" })}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              required
              label="Kebele"
              sx={{ width: 1 }}
            {...register("address.sub_city", { required: "This is a required field" })}
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
            {...register("address.house_number", { required: "This is a required field" })}
            />
          </Grid>
          <Grid item md={3}>
            <FormControlLabel
              label="Is industrial park?"
              control={<Checkbox onChange={() => setIndustrailPark(industrailPark)} />}
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
            {...register("sector", { required: "This is a required field" })}
            >
              {props.sectors.map((item) => (
                <MenuItem key={item._id} value={item.name}>
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
              {...register("sub_sector", { required: "This is a required field" })}
            >
              {props.sub_sectors.map((item) => (
                <MenuItem key={item._id} value={item.name}>
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
              {...register("activity", { required: "This is a required field" })}
            >
              {props.activities.map((item) => (
                <MenuItem key={item._id} value={item.name}>
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
              {...register("investment_activity", { required: "This is a required field" })}
            >
              {props.investment_activities.map((item) => (
                <MenuItem key={item._id} value={item.name}>
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
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Grid
            item
            md={6}
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
              onClick={props.goPrev}
            >
              Prev
            </Button>
          </Grid>
          <Grid
            item
            md={6}
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
              type="submit"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProjectProfile;