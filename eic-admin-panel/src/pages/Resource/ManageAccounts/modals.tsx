import {
  Modal, Box, Typography, Grid, FormControl, FormLabel, TextField, InputLabel, Select, MenuItem, Button,
  CircularProgress, Alert
} from "@mui/material";
import { FC, useState, ChangeEventHandler, useEffect } from "react"
import { PostAccount, EditAccount } from "src/store/States/User/action"
import { API as AdminAPI, Actions as AdminActions } from "src/store/States/Admin/"
import { IRoleAccount } from "src/common/enums"
import { useDispatch } from "react-redux"

export const DeleteAccountModal: FC<{
  isVisible: boolean;
  onClose: (data?: any) => void;
  account: any;
}> = ({
  isVisible, onClose, account
}) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleSubmit = () => {
      setIsLoading(true)
      AdminAPI.RemoveAdmin(account._id, (err: any, data: any) => {
        if (err) throw err
        if (data._id) {
          dispatch(AdminActions.RemoveAdmin(data))
        }
        setIsLoading(false)
        onClose()
      })
    }

    return (
      <Modal
        open={isVisible}
        onClose={isLoading ? () => { } : onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"add-account-modal"}>
          <Typography variant="h2" component="h2">
            Delete Account
          </Typography>
          <Grid container width="100%" sx={{ mt: 2 }} display="flex" justifyContent="center">
            <Grid item md={10} xs={12}>
              <Typography variant="h4" component="h2">
                Are you sure to remove {`${account.first_name} ${account.last_name}'s account?`}
              </Typography>
            </Grid>
          </Grid>

          <Grid container width="100%" sx={{ mt: 1 }} spacing={5} justifyContent="center">
            <Grid item md={4} xs={12}>
              <Button onClick={handleSubmit} variant="contained" color="success" fullWidth disabled={isLoading}>
                {isLoading ? <CircularProgress color="success" /> : "Yes"}
              </Button>
            </Grid>
            <Grid item md={4} xs={12}>
              <Button onClick={() => onClose()} variant="contained" color="error" fullWidth disabled={isLoading}>
                No
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    )
  }

export const AddAccountModal: FC<{
  isVisible: boolean;
  handleClose: (data?: any) => void;
}> = ({
  handleClose, isVisible
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<any>({})
    const register = (name: string) => {
      const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        })
      }
      return {
        name, onChange
      }
    }

    const handleErrors = (error: any) => {
      if (error.validation_errors) {
        if (error.validation_errors.length > 0) {
          if (error.validation_errors[0]) {
            if (error.validation_errors[0].errors) {
              if (error.validation_errors[0].errors.length > 0) {
                if (error.validation_errors[0].errors[0]) {
                  if (error.validation_errors[0].errors[0].error_message) {
                    setErrorText(`${error.validation_errors[0].errors[0].error_message}`)
                  }
                }
              }
            }
          }
        }
      }
    }

    const handleSubmit = () => {
      if (Object.values(formData).filter(item => Boolean(item)).length < 6) {
        setErrorText("Please fill all the inputs")
      } else {
        setErrorText("")
        setIsLoading(true)
        PostAccount({
          email: formData.email,
          first_name: formData.first_name,
          gender: formData.gender,
          last_name: formData.last_name,
          middle_name: "",
          password: formData.password,
          phone_number: formData.phone_number,
          role: formData.role
        }, (err, data) => {
          if (err) throw err
          setIsLoading(false)
          if (data._id) {
            handleClose(data)
          } else {
            handleErrors(data)
          }
        })
      }
    }

    const [errorText, setErrorText] = useState("")
    return (
      <Modal
        open={isVisible}
        onClose={isLoading ? () => { } : handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"add-account-modal"}>
          <Typography variant="h3" component="h2">
            Add an Account
          </Typography>
          <Grid container width="100%">
            <Grid item md={12}>
              {errorText.length > 0 ? <Alert severity="error">{errorText}</Alert> : null}
            </Grid>
          </Grid>

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
                  {...register("first_name")}
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
                  {...register("last_name")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" sx={{ mt: 1 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">
                  Phone number
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...register("phone_number")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" sx={{ mt: 1 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...register("email")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" sx={{ mt :1 }}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <Select
                  className="default-input"
                  variant="outlined"
                  {...register("gender")}
                >
                  <MenuItem value={'MALE'}>Male</MenuItem>
                  <MenuItem value={'FEMALE'}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" sx={{ mt: 1 }}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                <Select
                  className="default-input"
                  variant="outlined"
                  {...register("role")}
                >
                  {Object.values(IRoleAccount).map(item => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" sx={{ mt: 1 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Password
                </FormLabel>
                <TextField
                  type="password"
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...register("password")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" sx={{ mt: 2 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <Button className="add-account-btn" onClick={handleSubmit}>
                  {isLoading ? <CircularProgress color="success" /> : "Add Account"}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    )
  }

export const ManageAccountModal: FC<{
  isVisible: boolean;
  handleClose: (data?: any) => void;
  data: any;
}> = ({
  handleClose, isVisible, data
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<any>({})
    const register = (name: string) => {
      const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        })
      }
      const foundIndex = Object.keys(formData).findIndex((key: string) => key === name)
      return foundIndex >= 0 ? {
        name,
        onChange,
        defaultValue: Object.values(formData)[foundIndex]
      } : {
        name, onChange
      }
    }

    useEffect(() => {
      setFormData({
        ...formData, ...data
      })
    }, [data])

    const [errorText, setErrorText] = useState("")
    const handleSubmit = () => {
      if (Object.values(formData).filter(item => Boolean(item)).length < 6) {
        setErrorText("Please fill all the forms")
      } else {
        setIsLoading(true)
        EditAccount({
          _id: formData._id,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: formData.phone_number,
          role: formData.role
        }, (err, data) => {
          if (err) throw err
          setIsLoading(false)
          if (data._id) {
            handleClose(data)
          } else {
            handleErrors(data)
          }
        })
      }
    }

    const handleErrors = (error: any) => {
      if (error.validation_errors) {
        if (error.validation_errors.length > 0) {
          if (error.validation_errors[0]) {
            if (error.validation_errors[0].errors) {
              if (error.validation_errors[0].errors.length > 0) {
                if (error.validation_errors[0].errors[0]) {
                  if (error.validation_errors[0].errors[0].error_message) {
                    setErrorText(`${error.validation_errors[0].errors[0].error_message}`)
                  }
                }
              }
            }
          }
        }
      }
    }

    return (
      <Modal
        open={isVisible}
        onClose={isLoading ? () => { } : handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"add-account-modal"}>
          <Typography variant="h3" component="h2">
            View / Configure Account
          </Typography>
          <Grid container width="100%">
            <Grid item md={12}>
              {errorText.length > 0 ? <Alert severity="error">{errorText}</Alert> : null}
            </Grid>
          </Grid>
          <Grid container width="100%" sx={{ mt: 1 }}>
            <Grid item md={6} xs={12} style={{ flex: 1, marginRight: 8 }}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  First Name
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...register("first_name")}
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
                  {...register("last_name")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" sx={{ mt: 1 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Phone number
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...register("phone_number")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" sx={{ mt: 1 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                  {...register("email")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" sx={{ mt: 1 }}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  label="Role"
                  {...register("role")}
                >
                  {Object.values(IRoleAccount).map(item => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" sx={{ mt: 2 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <Button className="add-account-btn" onClick={handleSubmit}>
                  {isLoading ? <CircularProgress color="success" /> : "Done"}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    )
  }