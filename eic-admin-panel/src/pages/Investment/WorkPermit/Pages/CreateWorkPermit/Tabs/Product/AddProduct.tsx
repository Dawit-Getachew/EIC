import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Box,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material/";
import Modal from "@mui/material/Modal";
import { API, Actions } from "src/store/States/Investment/BusinessProfile/";
import { useDispatch } from "react-redux";
import { Units } from "src/common/enums";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 720,
  backgroundColor: "background.paper",
  padding: 5,
};

interface AddProductProps {
  isVisible: boolean;
  onClose: (data: any) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ isVisible, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState({});

  const requiredInputs = [
    "product_name",
    "is_service",
    "quantity",
    "unit",
    "domestic_market_share",
    "export_market_share",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
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
      onClose(formData);
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

  return (
    <div>
      <Modal
        open={isVisible}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{mb:4  }}
          >
            Add Product
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={3}
          >
            <Grid
              item
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                required
                label="Product Name"
                name="product_name"
                error={getError("product_name").value}
                helperText={getError("product_name").text}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                required
                label="Product Type"
                name="is_service"
                error={getError("is_service").value}
                helperText={getError("is_service").text}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                required
                label="Unit"
                name="unit"
                error={getError("unit").value}
                helperText={getError("unit").text}
                onChange={handleChange}
                select
                style={{ width: 300 }}
              >
                {Object.values(Units).map((item) => (
                  <MenuItem id={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={3}
            style={{ marginTop: 15 }}
          >
            <Grid
              item
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                required
                label="Quantity"
                name="quantity"
                error={getError("quantity").value}
                helperText={getError("quantity").text}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid
              item
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                required
                label="Domestic Market Share"
                name="domestic_market_share"
                error={getError("domestic_market_share").value}
                helperText={getError("domestic_market_share").text}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid
              item
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                required
                label="Export Market Share"
                name="export_market_share"
                error={getError("export_market_share").value}
                helperText={getError("export_market_share").text}
                onChange={handleChange}
                type="number"
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={3}
          >
            <Grid
              item
              md={6}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Button
                variant="contained"
                sx={{ mt: 3, pt: 1.1, pb: 1.1 }}
                color="primary"
                onClick={onSubmit}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress /> : "Add Product"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default AddProduct;
