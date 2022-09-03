import { Modal, Box, Typography, Grid, FormControl, FormLabel, TextField, InputLabel, CircularProgress, MenuItem, Button } from "@mui/material";
import { FC, useReducer, useEffect, useState } from "react"
import { register, setFormDefaults, formInitState, formReducer, formSubmit, FormActions, selectRequriedKeys } from "src/common/form"
import { IRoleAccount } from "src/common/interface"
import { API } from "src/store/States/Admin"

export const AddAccountModal: FC<{
  isVisible: boolean;
  onClose: (data?: any) => void;
}> = ({
  isVisible, onClose
}) => {
    const [formState, dispatch] = useReducer(formReducer, formInitState)
    const inputs = ["first_name", "last_name", "phone_number", "gender", "role", "email", "password"]

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onSubmit = (data: any) => {
      setIsLoading(true)
      API.PostAdmin({
        address: {
          city: '',
          country: '',
          sub_city: ''
        },
        email: data.email,
        first_name: data.first_name,
        gender: data.gender,
        is_active: true,
        last_name: data.last_name,
        password: data.password,
        phone_number: data.phone_number,
        role: data.role
      }, (err: any, data: any) => {
        if (err) throw err
        if (data._id) {
          onClose(data)
        }
      })
    }

    useEffect(() => {
      setFormDefaults(inputs, onSubmit, dispatch)
    }, [])

    const registerForm = (name: string) => register(name, formState, dispatch)

    return (
      <Modal
        open={isVisible}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"add-account-modal"}>
          <Typography variant="h3" component="h2">
            Add an Account
          </Typography>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={6} xs={12} style={{ flex: 1, marginRight: 8 }}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  First Name
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...registerForm("first_name")}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  Last Name
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...registerForm("last_name")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Phone number
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...registerForm("phone_number")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...registerForm("email")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 25 }}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <TextField variant="outlined" sx={{ mt: 1 }} select value={10} {...registerForm("gender")}>
                  {["FEMALE", "MALE"].map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 25 }}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                <TextField variant="outlined" sx={{ mt: 1 }} select value={10} {...registerForm("role")}>
                  {Object.values(IRoleAccount).map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Password
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  type="password"
                  style={{ marginTop: 3 }}
                  {...registerForm("password")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 20 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <Button
                  className="add-account-btn"
                  onClick={() => formSubmit(dispatch)}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress color="success" /> : "Add Account"}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    )
  }

export const ViewAccountModal: FC<{
  isVisible: boolean;
  onClose: (data?: any) => void;
  data: any;
}> = ({
  isVisible, onClose, data
}) => {
    const [formState, dispatch] = useReducer(formReducer, formInitState)
    const inputs = ["first_name", "last_name", "phone_number", "role", "email"]

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onSubmit = (formData: any) => {
      setIsLoading(true)
      API.EditAdmin({
        _id: data._id,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        role: formData.role
      }, (err: any, data: any) => {
        if (err) throw err
        if (data._id) {
          onClose(data)
        }
      })
    }

    useEffect(() => {
      setFormDefaults(inputs, onSubmit, dispatch)
    }, [])

    useEffect(() => {
      FormActions.UpdateFormData(selectRequriedKeys(inputs, data), dispatch)
    }, [data])

    const registerForm = (name: string) => register(name, formState, dispatch)

    return (
      <Modal
        open={isVisible}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"add-account-modal"}>
          <Typography variant="h3" component="h2">
            Edit Account
          </Typography>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={6} xs={12} style={{ flex: 1, marginRight: 8 }}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  First Name
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...registerForm("first_name")}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  Last Name
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...registerForm("last_name")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Phone number
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...registerForm("phone_number")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...registerForm("email")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 25 }}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                <TextField variant="outlined" sx={{ mt: 1 }} select value={10} {...registerForm("role")}>
                  {Object.values(IRoleAccount).map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 20 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <Button
                  className="add-account-btn"
                  onClick={() => formSubmit(dispatch)}
                  disabled={isLoading}
                  color="warning"
                >
                  {isLoading ? <CircularProgress color="success" /> : "Edit Account"}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    )
  }