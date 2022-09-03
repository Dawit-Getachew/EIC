import { useEffect } from "react"
import { Typography, Tooltip, IconButton, Grid, Box } from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { PermitDocument } from "./PrintPermit"
import PrintIcon from '@mui/icons-material/Print';
import { useNavigate } from "react-router"
import routes from "src/routes"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Selectors as BufferSelectors, selectBreadCrumps, Actions as BufferActions } from "src/store/States/Buffer"
import { useSelector, useDispatch } from "react-redux"

const PageHeader = () => {
  const navigate = useNavigate()
  const breadCrumps = useSelector(selectBreadCrumps)
  const dispatch = useDispatch()

  const savedBuffer = useSelector(BufferSelectors.selectCancellationPermitBuffer)
  useEffect(() => {
    dispatch(BufferActions.SetBreadCrumps([
      {
        path: '/',
        title: 'Home'
      },
      {
        path: '/invest/cancel',
        title: 'Cancellation'
      },
      {
        path: '/invest/cancel/view',
        title: `${savedBuffer.company_name} Investment Permit Cancellation Form`
      }
    ]))
  }, [dispatch])  
  
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton
            color="primary"
            sx={{ p: 2, mr: 2 }}
            onClick={() => {
              navigate(routes.INVESTMENT.CANCEL_INVESTMENT_PERMIT.ROUTE, {
                replace: true,
              });
            }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Grid
          container
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item md={9}>
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                View Investment Cancellation Request
              </Typography>
              <Typography variant="subtitle2">
                This is a page shows every detail of investment
                permit renewal
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3} justifyContent="flex-end">
            <PDFDownloadLink
              document={<PermitDocument data={{
                ...savedBuffer,
                ...(() => {
                  const company_keys = Object.keys(savedBuffer.company_address)
                  const company_values = Object.values(savedBuffer.company_address)
                  const company_obj = {}
                  company_values.forEach((value, idx) => company_obj[`company_${company_keys[idx]}`] = value)

                  const investment_keys = Object.keys(savedBuffer.investment_address)
                  const investment_values = Object.values(savedBuffer.investment_address)
                  const investment_obj = {}
                  investment_values.forEach((value, idx) => investment_obj[`investment_${investment_keys[idx]}`] = value)
                  return { ...company_obj, ...investment_obj }
                })()
              }} />}
              fileName="permit_document.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading..." : (
                  <Tooltip arrow placement="top" title="Print Cancellation Form">
                    <IconButton
                      color="primary"
                      sx={{ p: 2, mr: 2 }}
                    >
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                )
              }
            </PDFDownloadLink>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default PageHeader;