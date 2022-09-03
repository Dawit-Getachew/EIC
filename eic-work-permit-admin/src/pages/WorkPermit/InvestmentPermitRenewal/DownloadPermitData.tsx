import { useState, useEffect } from "react"
import { Document, Page, Text, View, StyleSheet, Font, PDFViewer, Image, PDFDownloadLink } from '@react-pdf/renderer';
import { FC } from "react"
import { IWorkPermit } from "src/store/States/WorkPermit/WorkPermitApplications/types"
import PrintIcon from "@mui/icons-material/Print";
import { Tooltip, IconButton } from "@mui/material";
import { ResidenceDocumentData } from "./DocumentRenew"
import { FetchFullNameUser } from "src/store/States/User/action"

interface Props {
  data: any;
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
    <Tooltip arrow placement="top" title="Print Updated Work Permit">
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