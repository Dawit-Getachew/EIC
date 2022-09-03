import React, { useState, useEffect } from "react";
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
import { ProjectStageTypes } from "src/models/InvestmentModels/work_permit";
import { Selectors as ManagerSelectors } from "src/store/States/Investment/Manager/";
import { useSelector } from "react-redux";

interface Props {
  goPrev: () => void;
  goNext: (data: any) => void;
  mainData: any;
}

const ProjectManager: React.FC<Props> = (props) => {
  const rows = [{ name: "Hello World" }, { name: "Hello World" }];
  const managers = useSelector(ManagerSelectors.selectManagers);
  const [checkBoxes, setCheckBoxes] = useState([]);
  const [error_text, setErrorText] = useState("");

  useEffect(() => {
    setCheckBoxes(Array(managers.length).fill(false));
  }, [managers]);

  const handleChange = (index: number) => {
    setCheckBoxes(checkBoxes.map((_: any, idx: number) => idx === index));
  };

  const onSubmit = () => {
    const count = checkBoxes.filter((item) => item).length;
    if (count > 0) {
      setErrorText("")
      const index = checkBoxes.findIndex(item => item)
      props.goNext({ selected_manager: managers[index]._id })
    } else {
      setErrorText("One Manager must be selected");
    }
  };

  const getValue = (idx: number) => checkBoxes[idx];

  useEffect(() => {
    setCheckBoxes(
      managers.map(item => item._id === props.mainData["selected_manager"] ? true : false)
    )
  }, [props.mainData, managers, setCheckBoxes])

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 2 }}
      >
        Project Manager
      </Typography>

      <Grid container spacing={3}>
        <Grid item md={12}>
          <p style={{ color: "red", fontSize: 16 }}>{error_text}</p>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>Select</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {managers.map((el, index) => {
                return (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{el.first_name + " " + el.last_name}</TableCell>
                    <TableCell>
                      <Checkbox
                        value={getValue(index) ?? false}
                        checked={getValue(index) ?? false}
                        onChange={() => handleChange(index)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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

export default ProjectManager;
