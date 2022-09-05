/* eslint-disable */
import { useState, useEffect } from "react"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FC } from "react"
import { MainPrintPermitData } from "./PrintPermitData";
import { IWorkPermit } from "src/store/States/WorkPermit/WorkPermitApplications/types"
import PrintIcon from "@mui/icons-material/Print";
import { Tooltip, IconButton } from "@mui/material";
import { ResidenceDocumentData } from "./ResidenceData"
import { FetchFullNameUser } from "src/store/States/User/action"

interface Props {
  data: any
}

export const DownloadPermitData: FC<Props> = (props) => {
  const permit = props.data as unknown as IWorkPermit
  return (
    <Tooltip arrow placement="top" title="Print Permit Form">
      <IconButton>
        <PDFDownloadLink
          document={<MainPrintPermitData data={{
            ...permit,
            ...(() => {
              const company_obj = {}
              const company_keys = Object.keys(permit.address)
              const company_values = Object.values(permit.address)
              company_keys.forEach((key, i) => {
                company_obj[`company_${key}`] = company_values[i]
              })
              const bio_data_obj = {}
              const bio_data_keys = Object.keys(permit.bio_data_expat_information)
              const bio_data_values = Object.values(permit.bio_data_expat_information)
              bio_data_keys.forEach((key, i) => {
                bio_data_obj[`${key}`] = bio_data_values[i]
              })
              const qualification_obj = {}
              const qualification_keys = Object.keys(permit.bio_data_expat_information.expat_qualification)
              const qualification_values = Object.values(permit.bio_data_expat_information.expat_qualification)
              qualification_keys.forEach((key, i) => {
                qualification_obj[`${key}`] = qualification_values[i]
              })

              const certification_obj = {}
              const certification_keys = Object.keys(permit.certification)
              const certification_values = Object.values(permit.certification)
              certification_keys.forEach((key, i) => {
                certification_obj[`certification_${key}`] = certification_values[i]
              })

              return { ...company_obj, ...bio_data_obj, ...qualification_obj, ...certification_obj }
            })()
          }} />}
          fileName="permit_document_data.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading..." : <PrintIcon />
          }
        </PDFDownloadLink>
      </IconButton>
    </Tooltip >
  )
}

export const DownloadResidenceData: FC<Props> = (props) => {
  const permit = props.data as unknown as IWorkPermit
  const [full_name, setFullName] = useState<string>("")
  useEffect(() => {
    FetchFullNameUser(permit.service_id, (err: any, data: any) => {
      if (err) throw err
      if (data.first_name && data.middle_name && data.last_name) {
        setFullName(`${data.first_name} ${data.middle_name} ${data.last_name}`)
      }
    })
  }, [])

  return (
    <Tooltip arrow placement="top" title="Print Residency Form">
      <IconButton>
        <PDFDownloadLink
          document={<ResidenceDocumentData data={{ ...permit, full_name }} />}
          fileName="residance_data_request.pdf"
        >
          {({ blob, url, loading, error }) => {
            return loading ? "Loading..." : <PrintIcon />
          }
          }
        </PDFDownloadLink>
      </IconButton>
    </Tooltip >
  )
}