import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  TextField,
  Grid,
  MenuItem,
  Box,
  Container,
  CircularProgress,
  Card,
} from "@mui/material/";
import {
  LegalStatusTypes,
  FormOfOwnerShipTypes,
  IBusinessProfileInput,
} from "src/models/InvestmentModels/business_profile";
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
  business_profile: any;
}

const ViewModal: React.FC<ViewModalProps> = ({
  isVisible,
  onClose,
  business_profile,
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
                      label="Legal Status"
                      select
                      defaultValue={business_profile.legal_status}
                    >
                      {Object.values(LegalStatusTypes).map((item) => (
                        <MenuItem key={item} value={item}>
                          {String(item).replace("_", " ")}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="Form of Ownership"
                      defaultValue={business_profile.form_of_ownership}
                      select
                    >
                      {Object.values(FormOfOwnerShipTypes).map((item) => (
                        <MenuItem key={item} value={item}>
                          {String(item).replace("_", " ")}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="Country of Incorporation"
                      select
                      style={{ width: 200 }}
                      defaultValue={business_profile.company_of_incorporation}
                    >
                      {["Ethiopia", "Eritria"].map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Company Name"
                      defaultValue={business_profile.company_name}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Company Name (Amharic)"
                      defaultValue={business_profile.company_name_amharic}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Tin Number"
                      defaultValue={business_profile.tin_number}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Registration Number"
                      defaultValue={business_profile.registration_number}
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
                      defaultValue={business_profile.address.region}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Zone"
                      defaultValue={business_profile.address.zone}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Wereda"
                      defaultValue={business_profile.address.city}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Kebele"
                      defaultValue={business_profile.address.sub_city}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="House Number"
                      defaultValue={business_profile.address.house_number}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Email"
                      defaultValue={business_profile.address.email}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Telephone (Direct)"
                      defaultValue={business_profile.address.telephone_direct}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      disabled
                      label="Telephone (Mobile)"
                      defaultValue={business_profile.address.telephone_mobile}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="Fax"
                      defaultValue={business_profile.address.fax}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="P.O. Box"
                      defaultValue={business_profile.address.po_box}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      label="Other Address"
                      disabled
                      defaultValue={business_profile.address.other_address}
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
