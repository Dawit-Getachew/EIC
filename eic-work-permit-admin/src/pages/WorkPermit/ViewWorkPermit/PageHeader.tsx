/* eslint-disable */
import { FC, useEffect, useState } from 'react';
import { Typography, Button, Grid, Box, IconButton, Tooltip, CircularProgress } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from "react-router"
import routes from "src/constants/routes"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MainPrintPermitData } from "./PrintPermitData"
import { PermitDocument } from "./PrintPermit"
import { useSelector, useDispatch } from "react-redux"
import { Selectors as BufferSelectors, Actions as BufferActions } from "src/store/States/Buffer"
import { UpdatePermitComponent } from "../WorkPermitApplications/Components"
import { Selectors as WorkPermitSelectors } from "src/store/States/WorkPermit/WorkPermitApplications/"
import { PermitStatus } from "src/store/States/WorkPermit/WorkPermitApplications/types"
import Feedback from "src/components/Feedback/Feedback";
import { DownloadPermitData, DownloadResidenceData } from "./DownloadPermitData"

interface Props {
  name: string
  data: any
}
const PageHeader: FC<Props> = (props) => {
  const dispatch = useDispatch()
  const permit = useSelector(BufferSelectors.selectNewPermitBuffer)
  const work_permits = useSelector(WorkPermitSelectors.selectWorkPermits) as any[]
  const user_role = useSelector(BufferSelectors.selectUserRole)
  const navigate = useNavigate()
  const [selectedPermit, setSelectedPermit] = useState<any>({})

  useEffect(() => {
    const foundIndex = work_permits.findIndex(item => String(permit._id) === String(item._id))
    if (foundIndex >= 0) {
      setSelectedPermit(work_permits[foundIndex])
    }
  }, [permit, work_permits])


  return (
    <>
      <Box display="flex" mb={3}>
        {/* <Feedback /> */}
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }} onClick={() => {
            navigate(routes.WORK_PERMIT.WORK_PERMIT.ROUTE, { replace: true })
          }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Grid container width="100%" justifyContent="space-between" alignItems="center">
          <Grid
            item
            md={7}
          >
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                Permit for {permit.company_name ? permit.company_name : ""}
              </Typography>
              <Typography variant="subtitle2">
                This is a page shows every detail of {permit.company_name ? permit.company_name : ""} work permit application
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={3}
          // display="flex"
          // justifyContent="flex-end"
          >
            <Box>
              <UpdatePermitComponent investmentPermit={selectedPermit} user_role={user_role} />
            </Box>
          </Grid>
          <Grid item md={1}>
            <DownloadPermitData data={props.data} />
          </Grid>
          {
            permit.permit_status === PermitStatus.ACCEPTED_SERVICE_FEE && <Grid item md={1}>
              <DownloadResidenceData data={props.data} />
            </Grid>
          }
        </Grid>
      </Box>
    </>
  );
}

export default PageHeader;