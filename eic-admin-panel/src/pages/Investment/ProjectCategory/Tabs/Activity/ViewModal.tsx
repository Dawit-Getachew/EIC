import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, Grid, Box, Container } from "@mui/material/"
import Modal from '@mui/material/Modal';
import { Selectors as SubSectorSelector } from "src/store/States/Investment/Category/SubSector"
import { getSubSector } from "src/store/States/Investment/Category/SubSector/helper"
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
  activity: any;
}

const ViewModal: React.FC<ViewModalProps> = ({ isVisible, onClose, activity }) => {
  const sub_sectors = useSelector(SubSectorSelector.selectSubSectors)
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
                  Activity Detail
                </Typography>
                <Grid container spacing={3} display="flex" alignItems="flex-start">
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="Activity Name"
                      defaultValue={activity.name}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      disabled
                      label="Sub Sector"
                      defaultValue={getSubSector(activity.sub_sector, sub_sectors).name}
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