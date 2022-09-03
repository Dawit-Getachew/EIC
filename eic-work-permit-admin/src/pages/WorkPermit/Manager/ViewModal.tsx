import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, Grid, Box, Container } from "@mui/material/";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 720,
  backgroundColor: "background.paper",
  padding: 5,
};

interface ViewModalProps {
  isVisible: boolean;
  onClose: () => void;
  manager: any;
}

const ViewModal: React.FC<ViewModalProps> = ({
  isVisible,
  onClose,
  manager,
}) => {
  return (
    <div>
      <Modal
        open={isVisible}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12}>
                <Typography
                  id="modal-modal-title"
                  variant="h2"
                  component="h2"
                  style={{ marginBottom: 15, marginTop: 15 }}
                >
                  Profile Detail
                </Typography>
                <Grid
                  container
                  spacing={3}
                  display="flex"
                  alignItems="flex-start"
                >
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="First Name"
                      defaultValue={manager.first_name}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="Middle Name"
                      defaultValue={manager.middle_name}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="Last Name"
                      defaultValue={manager.last_name}
                    />
                  </Grid>
                </Grid>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  style={{ marginBottom: 10, marginTop: 15 }}
                >
                  Business Address
                </Typography>
                <Grid container spacing={3}>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Region"
                      defaultValue={manager.address.region}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Zone"
                      defaultValue={manager.address.zone}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Wereda"
                      defaultValue={manager.address.city}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Kebele"
                      defaultValue={manager.address.sub_city}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="House Number"
                      defaultValue={manager.address.house_number}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Email"
                      defaultValue={manager.address.email}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Telephone (Direct)"
                      defaultValue={manager.address.telephone_direct}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Telephone (Mobile)"
                      defaultValue={manager.address.telephone_mobile}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="Fax"
                      defaultValue={manager.address.fax}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="P.O. Box"
                      defaultValue={manager.address.po_box}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      label="Other Address"
                      disabled
                      defaultValue={manager.address.other_address}
                    />
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
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="secondary"
                      type="submit"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewModal;
