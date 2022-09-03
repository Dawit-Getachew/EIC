import { FC } from 'react';
import { Typography, Button, Grid, Box, IconButton, Tooltip } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from "react-router"
import routes from "src/routes"
import { useSelector } from "react-redux"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"

interface Props {}
const PageHeader: FC<Props> = () => {
  const navigate = useNavigate()
  
  const permit = useSelector(BufferSelectors.selectViewPermitBuffer)
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }} onClick={() => {
            navigate(routes.WORK_PERMIT.NEW_WORK_PERMIT.ROUTE, { replace: true })
          }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Grid container width="100%" justifyContent="space-between" alignItems="center">
          <Grid item md={9}>
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                Company Registration form for {permit.company_name? permit.company_name : ""}
              </Typography>
              <Typography variant="subtitle2">
                This is a page shows every detail of {permit.company_name? permit.company_name : ""} investment application
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PageHeader;