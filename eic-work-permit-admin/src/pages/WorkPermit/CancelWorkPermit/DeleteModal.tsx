import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Box, CircularProgress } from "@mui/material/"
import Modal from '@mui/material/Modal';
import { API, Actions } from "src/store/States/Investment/InvestmentPermit/"
import { useDispatch } from "react-redux"

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  backgroundColor: 'background.paper',
  padding: 5,
};

interface DeleteModalProps {
  isVisible: boolean;
  onClose: () => void;
  work_permit: any;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isVisible, onClose, work_permit }) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const yesHandler = () => {
    setIsLoading(true)
    API.RemoveInvestmentPermit(work_permit._id, (err, data) => {
      if (err) throw err
      setIsLoading(false)
      if (data._id) {
        onClose()
      }
    })
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
          <Typography id="modal-modal-title" variant="h4" component="h2" style={{ marginBottom: 15, marginTop: 5 }}>
            Are you sure you want to delete {work_permit.company_name}
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item md={6} style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" sx={{ margin: 1 }} color="primary" onClick={yesHandler} disabled={isLoading}>
                {isLoading ? <CircularProgress /> : "Yes"}
                </Button>
              </Grid>
              <Grid item md={6} style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" sx={{ margin: 1 }} color="secondary" onClick={onClose} disabled={isLoading}>No</Button>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteModal