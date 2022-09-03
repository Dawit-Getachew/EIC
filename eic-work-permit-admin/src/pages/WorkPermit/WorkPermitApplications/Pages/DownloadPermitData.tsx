import { PDFDownloadLink } from "@react-pdf/renderer";
import { FC } from "react"
import { MainPrintPermitData } from "./PrintPermitData";
import { IWorkPermit } from "src/store/States/WorkPermit/WorkPermitApplications/types"
import PrintIcon from "@mui/icons-material/Print";

interface Props {
  data: any
}

export const DownloadPermitData: FC<Props> = (props) => {
  const permitData = props.data as unknown as IWorkPermit
  return (
    <PDFDownloadLink
      document={<MainPrintPermitData data={permitData} />}
      fileName="permit_document_data.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading..." : <PrintIcon />
      }
    </PDFDownloadLink>
  )
}