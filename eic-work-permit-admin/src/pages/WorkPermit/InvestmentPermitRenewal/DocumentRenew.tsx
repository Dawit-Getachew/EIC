/* eslint-disable */
import { FC } from "react"
import { Document, Page, Text, View, Font, PDFViewer, Image } from '@react-pdf/renderer';
import {
  HeaderItem, MainDocument, MainPrintPermitData, PrintPermitData, FormInputNew, FormSmallInput, styles
} from "../ViewWorkPermit/PrintPermitData"
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

const CompanyTable: FC<{
  items: {
    name: string;
    nationality: string;
    passport_number: string;
    occupation: string;
    work_permit_number: string;
    renewed_upto: string
  }[]
}> = (props) => (
  <View style={styles.tableContainer}>
    <View style={styles.flex_r}>
      <View style={{ ...styles.tableItem, width: 40 }}>
        <Text style={styles.text_normal}>NO</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Company Name</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Nationlity</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Passport Number</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Occupation</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Work Permit No.</Text>
      </View>
      <View style={{ ...styles.tableItem }}>
        <Text style={styles.text_normal}>Renewed Up To</Text>
      </View>
    </View>
    {props.items.slice(0, props.items.length - 1).map((item, idx) => (
      <View style={styles.flex_r} key={item.name}>
        <View style={{ ...styles.tableItem, ...styles.flex_c, width: 40 }}>
          <Text style={styles.text_normal}>{idx + 1}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.name}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.nationality}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.passport_number}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.occupation}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoLeft, ...styles.flex_c, width: 110 }}>
          <Text style={styles.text_normal}>{item.work_permit_number}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.renewed_upto}</Text>
        </View>
      </View>
    ))}
    <View style={styles.flex_r}>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.flex_c, width: 40 }}>
        <Text style={styles.text_normal}>{props.items.length}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoLeft, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].name}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoLeft, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].nationality}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoLeft, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].passport_number}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoLeft, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].occupation}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoRight, ...styles.tableItemNoLeft, ...styles.flex_c, width: 110 }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].work_permit_number}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].renewed_upto}</Text>
      </View>
    </View>
  </View>
)

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
            ጉዳዩ፣ የመኖሪያ ፈቃድ ስለማራዘም እና የሥራ ፈቃድ (WORK PERMIT) እድሳትን ይመለከታል፣
          </Text>
        </View>
        <View style={{ ...styles.flex_c, alignItems: "center", marginTop: 30, marginBottom: 20 }}>
          <Text style={{ ...styles.text_amh, ...styles.text_normal, ...styles.h3 }}>
            በኢንቨስትመንት አዋጅ ቁጥር 1180/2012 መሠረት መ/ቤታችን የውጭ ባለኃብቶች ለድርጅቶቻቸው ለሚቀጥሯቸው የውጭ ዜጎች የሥራ ፈቃድ የመስጠት፣ የማሻሻል፣ የማደስና የመሰረዝ ውክልና የተሰጠው መሆኑ ይታወቃል፡፡
            በዚህ መሠረት {data.company_name} በኦሮሚያ ክልል ላቋቋመው የ {data.business_activity} ድርጅት
          </Text>
        </View>
        <CompanyTable items={[{
          name: data.company_name,
          nationality: data.country_of_incorporation,
          occupation: data.business_activity,
          passport_number: 'zzz',
          renewed_upto: getCalenderDate(new Date()),
          work_permit_number: data.document_number
        }]} />
        <View style={{ ...styles.flex_c, alignItems: "flex-start", marginTop: 10 }}>
          <Text style={{ ...styles.text_amh, ...styles.text_normal }}>
            የተመዘገበ የሥራ ፈቃድ የተሰጣቸው መሆኑ ይታወሳል፡፡
          </Text>
          <Text style={{ ...styles.text_amh, ...styles.text_normal }}>
            ሆኖም ማህበሩ ከላይ የተጠቀሰውን የሥራ ፈቃድ ለአንድ ዓመት እንዲራዘም {`(እንዲታደስ)`} በ{getCalenderDate(data.createdAt)} በጠየቀው መሠረት የሥራ ፈቃዱ መታደሱን እያሳወቅን፤ የመኖሪያ ፈቃዱ በመ/ቤታችሁ በኩል ባለው ህግና ደንብ መሠረት እንዲራዘምላቸው እንጠይቃለን፡፡
          </Text>
        </View>
        <View style={{ ...styles.flex_c, alignItems: "flex-end" }}>
          <Text style={{ ...styles.text_amh, ...styles.text_normal }}>
            ከሠላምታ ጋር
          </Text>
        </View>
      </Page>
    </Document>
  )
}