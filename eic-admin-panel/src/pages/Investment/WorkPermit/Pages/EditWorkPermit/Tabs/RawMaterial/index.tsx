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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material/";
import AddRawMaterial from "./AddRawMaterial";

interface Props {
  goPrev: () => void;
  goNext: (data: any) => void;
  mainData: any;
}

const ProjectRawMaterial: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [addedRawMaterials, setAddedRawMaterials] = useState([]);
  const [error_text, setErrorText] = useState("");
  const onSubmit = () => {
    if (addedRawMaterials.length > 0) {
      setErrorText("");
      props.goNext({ addedRawMaterials });
    } else {
      setErrorText("At least one product needed");
    }
  };

  useEffect(() => {
    if (props.mainData.addedRawMaterials) {
      if (props.mainData.addedRawMaterials.length > 0) {
        setAddedRawMaterials(props.mainData.addedRawMaterials);
      }
    }
  }, [props.mainData]);

  return (
    <>
      <AddRawMaterial
        isVisible={isVisible}
        onClose={(data) => {
          if (data) setAddedRawMaterials(addedRawMaterials.concat(data));
          setIsVisible(false);
        }}
      />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item md={6} style={{ display: "flex", justifyContent: "start" }}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ mb: 3, mt: 2, pl: 2 }}
          >
            Add New Raw Material
          </Typography>
        </Grid>
        <Grid item md={6} style={{ display: "flex", justifyContent: "end" }}>
          <Button
            sx={{ margin: 1, pb: 1.2, pt: 1.2, pl: 4, pr: 4 }}
            variant="contained"
            color="primary"
            onClick={() => setIsVisible(true)}
          >
            Add Raw Material
          </Button>
        </Grid>
      </Grid>

      <p style={{ color: "red", fontSize: 16 }}>{error_text}</p>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Raw Material Name</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addedRawMaterials.map((item) => (
              <TableRow hover>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {item.raw_material_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {String(item.is_local).toLocaleUpperCase()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {item.remarks}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default ProjectRawMaterial;
