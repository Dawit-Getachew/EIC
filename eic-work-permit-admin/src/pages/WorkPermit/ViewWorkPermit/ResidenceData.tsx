import { FC } from "react"
import { Document, Page, Text, View, Font, PDFViewer, Image } from '@react-pdf/renderer';
import {
  HeaderItem, MainDocument, MainPrintPermitData, PrintPermitData, FormInputNew, FormSmallInput, styles
} from "./PrintPermitData"
import { getCalenderDate } from 'src/helpers/getDateTime'
import { IWorkPermit } from "src/store/States/WorkPermit/WorkPermitApplications/types"

export const ResidenceDocument: FC<{ data: any }> = ({ data }) => {
  return (
    <PDFViewer>
      <ResidenceDocumentData data={data} />
    </PDFViewer>
  )
}

export const ResidenceDocumentData: FC<{ data: any }> = ({ data }) => {
  return (
    <MainData data={data} />
  )
}

const MainData: FC<{ data: any }> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={{ ...styles.flex_c, padding: 15 }} fixed>
        <View style={{ ...styles.flex_c }}>
          <Text style={{ ...styles.h2, ...styles.text_amh, ...styles.boldText }}>
            ለኢምግሬሽንና ዜግነት አገልግሎት
          </Text>
          <Text style={{ ...styles.h2, ...styles.text_amh, ...styles.boldText, ...styles.text_underline }}>
            አዲስ አበባ
          </Text>
          <Text
            style={{
              ...styles.h2, ...styles.text_amh, ...styles.boldText, alignSelf: "center",
              marginTop: 20, marginBottom: 20
            }}>
            ጉዳዩ: - የመኖሪያ ፈቃድ ስለመጠየቅ እና የሥራ ፈቃድ (WORK PERMIT) የተሰጠበትን ሰነድ ይመለከታል፣
          </Text>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
            የድርጅቱ ስም - {data.company_name}
          </Text>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
            የዉጭ አገር ዜጋው ሙሉ ስም - {data.full_name}
          </Text>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
            ዜግነት - {data.country_of_incorporation}
          </Text>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
            ስራው - {data.business_activity}
          </Text>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
            የፓስፖርት ቁጥር  - የፓስፖርት ቁጥር
          </Text>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
            የስራ ፈቃድ ቁጥር - {data.document_number}
          </Text>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
            ፍቃዱ የተሰጠበት ቀን  - {getCalenderDate(data.createdAt)}
          </Text>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
            ፍቃዱ የሚያልቅበት ቀን - {`${new Date(data.createdAt).getDate()}/${new Date(data.createdAt).getMonth()}/${new Date(data.createdAt).getFullYear() + 1}`}
          </Text>
        </View>
        <View style={{ ...styles.flex_c, alignItems: "center", marginTop: 40, marginBottom: 40 }}>
          <Text style={{ ...styles.text_amh, ...styles.text_normal, ...styles.h3 }}>
            ከዚህ በላይ ስማቸው፣ ዜግነታቸውና ፓስፖርት ቁጥራቸው ለተገለጸው ግለሰብ የስራ ፈቃድ የሰጠናቸው መሆኑንና የተሞላዉን ፎርም አባሪ በማድረግ መላካችንን አንገልጻለን።
          </Text>
        </View>
        <View style={{ ...styles.flex_c, alignItems: "flex-end" }}>
          <Text style={{ ...styles.text_amh, ...styles.text_normal }}>
            ከሰላምታ ጋር
          </Text>
        </View>
        <View style={{ ...styles.flex_c, alignItems: "flex-start" }}>
          <Text style={{ ...styles.text_amh, ...styles.text_underline, ...styles.h3 }}>
            ግልባጭ:-
          </Text>
          <Text style={{ ...styles.text_amh, ...styles.text_normal }}>
            • ለ {data.company_name}
          </Text>
          <Text style={{ ...styles.text_amh, ...styles.text_normal }}>
            • ለሥራ እና ክህሎት ሚኒስቴር
          </Text>
          <Text style={{ ...styles.text_amh, ...styles.text_normal }}>
            • ለፌዴራል ፖሊስ ፎሪንሲክ ምርመራ ዳይሬክቶሬት
          </Text>
        </View>
      </Page>
    </Document>
  )
}