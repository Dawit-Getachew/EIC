import { FC } from 'react';
import { Typography, Button, Grid, Box, IconButton, Tooltip } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from "react-router"
import routes from "src/constants/routes"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MainDocument } from "./PrintPermit"
import { MainPrintPermitData } from "./PrintPermitData"
import { useSelector } from "react-redux"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { InvestmentPermitStatus } from "src/common/enums"

interface Props {
  name: string
  data: any
}
const PageHeader: FC<Props> = (props) => {
  const navigate = useNavigate()
  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  const users = useSelector(BufferSelectors.selectAllUsers)
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }} onClick={() => {
            navigate(routes.INVESTMENT.INVESTMENT_PERMIT.ROUTE, { replace: true })
          }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Grid container width="100%" justifyContent="space-between" alignItems="center">
          <Grid item md={9}>
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                Permit for {props.name}
              </Typography>
              <Typography variant="subtitle2">
                This is a page shows every detail of {props.name} investment application
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3} justifyContent="flex-end">
            <Tooltip arrow placement="top" title="Print Permit Certificate">
              <IconButton
                color="primary"
                sx={{ p: 2, mr: 2 }}
              >
                {props.data.permit_status === InvestmentPermitStatus.ACCEPTED_SERVICE_FEE_BANK_SLIP ? <PDFDownloadLink
                  document={<MainDocument data={{
                    ...props.data,
                    ...(() => {
                      const company_keys = Object.keys(props.data.company_address)
                      const company_values = Object.values(props.data.company_address)
                      const company_obj = {}
                      company_values.forEach((value, idx) => company_obj[`company_${company_keys[idx]}`] = value)

                      const investment_keys = Object.keys(props.data.investment_address)
                      const investment_values = Object.values(props.data.investment_address)
                      const investment_obj = {}
                      investment_values.forEach((value, idx) => investment_obj[`investment_${investment_keys[idx]}`] = value)
                      return { ...company_obj, ...investment_obj }
                    })()
                  }} users={users} />}
                  fileName="permit_document.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading..." : <PrintIcon />
                  }
                </PDFDownloadLink> : <></>}
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="top" title="Print Permit Data">
              <IconButton>
                <PDFDownloadLink
                  document={<MainPrintPermitData data={{
                    ...props.data,
                    ...(() => {
                      const company_keys = Object.keys(props.data.company_address)
                      const company_values = Object.values(props.data.company_address)
                      const company_obj = {}
                      company_values.forEach((value, idx) => company_obj[`company_${company_keys[idx]}`] = value)

                      const investment_keys = Object.keys(props.data.investment_address)
                      const investment_values = Object.values(props.data.investment_address)
                      const investment_obj = {}
                      investment_values.forEach((value, idx) => investment_obj[`investment_${investment_keys[idx]}`] = value)

                      const home_keys = Object.keys(props.data.home_address)
                      const home_values = Object.values(props.data.home_address)
                      const home_obj = {}
                      home_values.forEach((value, idx) => home_obj[`home_${home_keys[idx]}`] = value)

                      const representative_keys = Object.keys(props.data.representative_address)
                      const representative_values = Object.values(props.data.representative_address)
                      const representative_obj = {}
                      representative_values.forEach((value, idx) => representative_obj[`representative_${representative_keys[idx]}`] = value)
                      return { ...company_obj, ...investment_obj, ...home_obj, ...representative_obj }
                    })()
                  }} />}
                  fileName="permit_document_data.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading..." : <PrintIcon />
                  }
                </PDFDownloadLink>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PageHeader;
