import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, Grid, Box, Container } from "@mui/material/"
import Modal from '@mui/material/Modal';
import { Selectors as ActivitySelector } from "src/store/States/Investment/Category/Activity/"
import { getActivity } from "src/store/States/Investment/Category/Activity/helper"
import { useSelector } from "react-redux"

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 720,
  backgroundColor: 'background.paper',
  padding: 5,
};

interface ViewModalProps {
  isVisible: boolean;
  onClose: () => void;
  investment_activity: any;
}

const ViewModal: React.FC<ViewModalProps> = ({ isVisible, onClose, investment_activity }) => {
  const activities = useSelector(ActivitySelector.selectActivities)
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
              <Typography id="modal-modal-title" variant="h2" component="h2" style={{ marginBottom: 15, marginTop: 15 }}>
                  Investment Activity Detail
                </Typography>
                <Grid container spacing={3} display="flex" alignItems="flex-start">
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="Investment Activity Name"
                      defaultValue={investment_activity.name}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      required
                      disabled
                      label="Acitvity"
                      defaultValue={getActivity(investment_activity.activity, activities).name}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <Grid item md={6} style={{ display: "flex", justifyContent: "center" }}>
                    <Button sx={{ margin: 1 }} variant="contained" color="secondary" type="submit" onClick={onClose}>
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
}

export default ViewModal