/* eslint-disable */
import { FC, useEffect } from 'react';
import { Typography, Button, Grid, Box, IconButton, Tooltip, CircularProgress } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from "react-router"
import routes from "src/routes"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MainPrintPermitData } from "./PrintPermitData"
import { PermitDocument } from "./PrintPermit"
import { useSelector, useDispatch } from "react-redux"
import { Selectors as BufferSelectors, Actions as BufferActions, selectBreadCrumps } from "src/store/States/Buffer"
import { PermitStatus } from "src/common/enums"

interface Props {
  name: string
  data: any
}
const PageHeader: FC<Props> = (props) => {
  const dispatch = useDispatch()
  const breadCrumps = useSelector(selectBreadCrumps)
  const permit = useSelector(BufferSelectors.selectViewPermitBuffer)
  useEffect(() => {
    dispatch(BufferActions.SetBreadCrumps([
      {
        path: '/',
        title: 'Home'
      },
      {
        path: routes.WORK_PERMIT.VIEW_NEW_WORK_PERMIT.ROUTE,
        title: `${permit.company_name} Work Permit Application Form`
      }
    ]))
  }, [dispatch])
  const navigate = useNavigate()


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
                Permit for {permit.company_name ? permit.company_name : ""}
              </Typography>
              <Typography variant="subtitle2">
                This is a page shows every detail of {permit.company_name ? permit.company_name : ""} work permit application
              </Typography>
            </Box>
          </Grid>
          {/* <Grid item md={3} justifyContent="flex-end">
            <Tooltip arrow placement="top" title="Print Permit Form">
              <IconButton>
                <PDFDownloadLink
                  document={<MainPrintPermitData data={{
                    ...permit,
                    ...(() => {
                      if (permit) {
                        const company_obj = {}
                        if (permit.company_address) {
                          const company_keys = Object.keys(permit.company_address)
                          const company_values = Object.values(permit.company_address)
                          company_values.forEach((value, idx) => company_obj[`company_${company_keys[idx]}`] = value)
                        }

                        const investment_obj = {}
                        if (permit.investment_address) {
                          const investment_keys = Object.keys(permit.investment_address)
                          const investment_values = Object.values(permit.investment_address)
                          investment_values.forEach((value, idx) => investment_obj[`investment_${investment_keys[idx]}`] = value)
                        }
                        const home_obj = {}
                        if (permit.home_address) {
                          const home_keys = Object.keys(permit.home_address)
                          const home_values = Object.values(permit.home_address)
                          home_values.forEach((value, idx) => home_obj[`home_${home_keys[idx]}`] = value)
                        }
                        const representative_obj = {}
                        if (permit.representative_address) {
                          const representative_keys = Object.keys(permit.representative_address)
                          const representative_values = Object.values(permit.representative_address)
                          representative_values.forEach((value, idx) => representative_obj[`representative_${representative_keys[idx]}`] = value)
                        }
                        return { ...company_obj, ...investment_obj, ...home_obj, ...representative_obj }
                      }
                      return {}
                    })()
                  }} />}
                  fileName="permit_document_data.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? <CircularProgress /> : <PrintIcon />
                  }
                </PDFDownloadLink>
              </IconButton>
            </Tooltip>
            {permit.permit_status === PermitStatus.ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP && (
              <Tooltip arrow placement="top" title="Print Permit Certificate">
                <IconButton>
                  <PDFDownloadLink
                    document={<PermitDocument data={{
                      ...permit,
                      ...(() => {
                        if (permit) {
                          const company_obj = {}
                          if (permit.company_address) {
                            const company_keys = Object.keys(permit.company_address)
                            const company_values = Object.values(permit.company_address)
                            company_values.forEach((value, idx) => company_obj[`company_${company_keys[idx]}`] = value)
                          }

                          const investment_obj = {}
                          if (permit.investment_address) {
                            const investment_keys = Object.keys(permit.investment_address)
                            const investment_values = Object.values(permit.investment_address)
                            investment_values.forEach((value, idx) => investment_obj[`investment_${investment_keys[idx]}`] = value)
                          }
                          const home_obj = {}
                          if (permit.home_address) {
                            const home_keys = Object.keys(permit.home_address)
                            const home_values = Object.values(permit.home_address)
                            home_values.forEach((value, idx) => home_obj[`home_${home_keys[idx]}`] = value)
                          }
                          const representative_obj = {}
                          if (permit.representative_address) {
                            const representative_keys = Object.keys(permit.representative_address)
                            const representative_values = Object.values(permit.representative_address)
                            representative_values.forEach((value, idx) => representative_obj[`representative_${representative_keys[idx]}`] = value)
                          }
                          return { ...company_obj, ...investment_obj, ...home_obj, ...representative_obj }
                        }
                        return {}
                      })()
                    }} />}
                    fileName="permit_document_data.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? <CircularProgress /> : <PrintIcon />
                    }
                  </PDFDownloadLink>
                </IconButton>
              </Tooltip>
            )}
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}

export default PageHeader;