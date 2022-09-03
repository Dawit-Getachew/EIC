import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Box,
  CircularProgress,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
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

const AddRawMaterial: React.FC<AddProductProps> = ({ isVisible, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const yesHandler = () => {
    setIsLoading(true);
  };

  const [formData, setFormData] = useState({})
  const [errorData, setErrorData] = useState({})

  const requiredInputs = [
    "raw_material_name",
    "is_local"
  ]

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const generateErrors = () => {
    const keys = Object.keys(formData)
    const values = Object.keys(formData)

    const errors_keys = []
    const error_values = []
    requiredInputs.forEach(input => {
      const foundIndex = keys.findIndex(item => item === input)
      if (foundIndex < 0) {
        errors_keys.push(input)
        error_values.push(true)
      } else {
        if (String(values[foundIndex]) === "") {
          errors_keys.push(input)
          error_values.push(true)
        }
      }
    })

    const _errorData = {}
    errors_keys.forEach((key, idx) => {
      _errorData[key] = error_values[idx]
    })

    return _errorData
  }

  const onSubmit = () => {
    const errorInfo = generateErrors()
    setErrorData(errorInfo)
    if (Object.keys(errorInfo).length === 0) {
      onClose(formData)
    }
  }

  const getError = (name: string) => {
    const foundIndex = Object.keys(errorData).findIndex(key => key === name)
    return foundIndex >= 0 ? {
      value: errorData[name],
      text: errorData[name] ? "This is a required field" : ""
    } : { value: false, text: false }
  }

  const register = (name: string, options?: any) => {
    return options? {
      name,
      error: options.hideError ? false : getError(name).value,
      helperText: options.hideError ? "" : getError(name).text,
      onChange: (event) => options.value ?
        handleChange({ target: { name, value: options.value } }) : handleChange(event),
    } : {
      name,
      error: getError(name).value,
      helperText: getError(name).text,
      onChange: handleChange
    }
  }

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
            sx={{ mb: 4 }}
          >
            Add New Raw Material
          </Typography>

          <Grid container spacing={3}>
            <Grid item md={7}>
              <TextField
                required
                label="Raw Material Type"
                sx={{ width: 1 }}
                {...register("raw_material_name")}
              />
            </Grid>

            <Grid item md={5}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                style={{ display: "flex" }}
              >
                <FormControlLabel
                  value="local"
                  control={
                    <Radio
                      {...register("is_local")}
                    />
                  }
                  label="Local"
                />
                <FormControlLabel
                  value="foreign"
                  control={
                    <Radio
                      {...register("is_local")}
                    />
                  }
                  label="Foreign"
                />
              </RadioGroup>
              {getError("is_local").value ? (
                <p style={{ color: "red", fontSize: 16 }}>Please select one</p>
              ) : <></>}
            </Grid>

            <Grid item md={12}>
              <TextField
                required
                label="Remark"
                {...register("remarks")}
                sx={{ width: 1 }}
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
                {isLoading ? <CircularProgress /> : "Add Raw Material"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default AddRawMaterial;
