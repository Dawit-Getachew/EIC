import React, { FC, useEffect, useState } from "react"
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import { useSelector } from "react-redux";
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import './styles.css'
import { FetchAllUsers } from "src/store/States/User/action";
import { getCurrentEthiopianDate, getRenewedEthiopianDate } from "src/helpers/amharic_date"
import { parse, formatWithOptions } from 'date-fns/fp'
import { getCalenderDate } from "src/helpers/getDateTime"

const dateToString = formatWithOptions({}, 'MMM DD, YYYY')

// Create styles
export const styles = StyleSheet.create({
  flex_justify_end: {
    display: "flex",
    justifyContent: "flex-end"
  },
  flex_align_end: {
    display: "flex",
    alignItems: "flex-end"
  },
  flex_justify_start: {
    display: "flex",
    justifyContent: "flex-start"
  },
  flex_justify_between: {
    display: "flex",
    justifyContent: "space-between"
  },
  flex_justify_center: {
    display: "flex",
    justifyContent: "center"
  },
  flex_align_center: {
    display: "flex",
    alignItems: "center"
  },
  flex_both_center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  flex_JEND_ASTART: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  flex_JSTART_AEND: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    height: "100%"
  },
  flex_JEND_AEND: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "100%"
  },
  flex_JBET_AEND: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  flex_JBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  flex_JAround: {
    display: "flex",
    justifyContent: "space-around",
  },
  flex_c: {
    display: "flex",
    flexDirection: 'column',
  },
  flex_r: {
    display: "flex",
    flexDirection: 'row',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  image: {
    width: 60,
    height: 60
  },
  text: {
    fontSize: 9,
    textOverflow: "ellipsis"
  },
  text_title: {
    fontSize: 13,
  },
  text_h1: {
    fontSize: 12,
  },
  text_amh: {
    fontFamily: "Noto Serif"
  },
  boldText: {
    marginLeft: 20,
    marginRight: 10,
    fontSize: 13,
    fontWeight: "bold",
    textDecoration: "underline"
  },
  pdf_box: {
    display: "flex",
    flexDirection: 'row',
    marginBottom: 15
  },
  formItem: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 5
  },
  formMiniItem: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "50%"
  }
});

// Create Document Component
interface MainProps {
  data: any
  users: any[]
}

interface Props {
  data: any
}

Font.register({
  family: "Noto Serif",
  src: "/static/fonts/Noto_Serif_Ethiopic/static/NotoSerifEthiopic/NotoSerifEthiopic-Regular.ttf"
})

export const MainDocument: React.FC<MainProps> = ({ data, users }) => {
  const [customData, setCustomData] = useState({})
  useEffect(() => {
    users?.forEach(item => {
      if (String(data.investor_id) === String(item.service_id)) {
        setCustomData({
          investor_name: `${item.first_name} ${item.last_name}`,
          home_country: data.home_address ?
            data.home_address.country ?
              data.home_address.country : "" :
            ""
        })
      }
    })
  }, [data, users])

  return <PermitDocument data={{
    ...data,
    ...customData
  }} />
}

const GetUnderlineText: FC<{ value: string }> = (props) => (
  <View style={{ display: "flex", alignItems: "center", marginLeft: 20 }}>
    <Text style={{ ...styles.text, ...styles.text_amh }}>{props.value}</Text>
    <View style={{
      border: "none",
      borderTop: "1px dotted black",
      color: "black",
      backgroundColor: "#fff",
      height: 1,
      width: 120,
      marginTop: 5,
    }}></View>
  </View>
)

const GetSmallUnderlineText: FC<{ value: string, style?: object }> = (props) => (
  <View style={{ display: "flex", alignItems: "center", marginLeft: 20 }}>
    <Text style={{ ...styles.text, ...styles.text_amh, textOverflow: "ellipsis" }}>
      {Boolean(props.value) && String(props.value) !== "undefined" ? String(props.value).length > 18 ? `${String(props.value).slice(0, 18)}...` : String(props.value) : "-"}
    </Text>
    <View style={{
      border: "none",
      borderTop: "1px dotted black",
      color: "black",
      backgroundColor: "#fff",
      height: 1,
      width: Boolean(props.value) && String(props.value) !== "undefined" ? 70 : 40,
      marginTop: 5,
      ...(() => {
        return props.style ? props.style : {}
      })()
    }}></View>
  </View>
)

const GetLongUnderlineText: FC<{ value: string, style?: object }> = (props) => (
  <View style={{ display: "flex", alignItems: "center", marginLeft: 20 }}>
    <Text style={{
      ...styles.text,
      ...styles.text_amh,
      fontSize: 14,
      fontWeight: 'bold'
    }}>{props.value}</Text>
    <View style={{
      border: "none",
      borderTop: "1px dotted black",
      color: "black",
      backgroundColor: "#fff",
      height: 1,
      width: 200,
      marginTop: 5,
      ...(() => {
        return props.style ? props.style : {}
      })()
    }}></View>
  </View>
)

const getCurrentDate = () => `${new Date().getDate()}/${(new Date().getMonth() + 1) > 10 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`}/${new Date().getFullYear()}`

const getRenewDate = () => `${new Date().getDate()}/${(new Date().getMonth() + 1) > 10 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`}/${new Date().getFullYear() + 1}`

export const PermitDocument: React.FC<Props> = ({ data }) => (
  <Document>
    <Page size="A4" style={{ ...styles.flex_c, padding: 15 }} fixed>
      <View style={{ ...styles.flex_c, ...styles.flex_both_center }}>
        <Text style={{ ...styles.text_h1, ...styles.text_amh }}>የውጪ ሀገር ባለሀብት የኢንቨስትመንት ፍቃድ</Text>
        <Text style={styles.text_title}>INVESTMENT PERMIT FOR FORIGN INVESTOR</Text>
      </View>
      <View style={{ ...styles.flex_c, ...styles.flex_JBET_AEND, width: "100%", marginTop: 10 }}>
        <View style={{ ...styles.flex_r, ...styles.flex_JBetween, width: "40%", marginBottom: 5 }}>
          <View style={{ ...styles.flex_c, alignItems: "flex-start", width: "100%" }}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>የተሰጠበት ቀን</Text>
            <Text style={styles.text}>Date of Issue</Text>
          </View>
          <View style={{ ...styles.flex_c, ...styles.flex_JEND_AEND, marginRight: 20 }}>
            <GetUnderlineText value={getCurrentEthiopianDate()} />
          </View>
        </View>
        <View style={{ ...styles.flex_r, ...styles.flex_JBetween, width: "40%", marginBottom: 5 }}>
          <View style={{ ...styles.flex_c, alignItems: "flex-start", width: "100%" }}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>የፍቃድ ቁጥር</Text>
            <Text style={styles.text}>Permit No.</Text>
          </View>
          <View style={{ ...styles.flex_JEND_AEND, marginRight: 20 }}>
            <GetUnderlineText value={data.ref_number} />
          </View>
        </View>
        <View style={{ ...styles.flex_r, ...styles.flex_JBetween, width: "40%", marginBottom: 5 }}>
          <View style={{ ...styles.flex_c, alignItems: "flex-start", width: "100%" }}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>የቀድሞው የፍቃድ ቁጥር</Text>
            <Text style={styles.text}>Previous Permit No.</Text>
          </View>
          <View style={{ ...styles.flex_JEND_AEND, marginRight: 20 }}>
            <GetUnderlineText value="" />
          </View>
        </View>
        <View style={{ ...styles.flex_r, ...styles.flex_JBetween, width: "40%", marginBottom: 5 }}>
          <View style={{ ...styles.flex_c, alignItems: "flex-start", width: "100%" }}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>የግብር ከፋይ መለያ ቁጥር</Text>
            <Text style={styles.text}>Tin No.</Text>
          </View>
          <View style={{ ...styles.flex_JEND_AEND, marginRight: 20 }}>
            <GetUnderlineText value="0121212122222" />
          </View>
        </View>
        <View style={{ ...styles.flex_r, ...styles.flex_JBetween, width: "40%", marginBottom: 5 }}>
          <View style={{ ...styles.flex_c, alignItems: "flex-start", width: "100%" }}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>የንግድ ምዝገባ ቁጥር</Text>
            <Text style={styles.text}>Registration No.</Text>
          </View>
          <View style={{ ...styles.flex_JEND_AEND, marginRight: 20 }}>
            <GetUnderlineText value="0121212122222" />
          </View>
        </View>
      </View>
      <View style={{
        border: "none",
        borderTop: "1px dotted black",
        color: "black",
        backgroundColor: "#fff",
        height: 1,
        width: "100%",
        marginTop: 10,
        marginBottom: 10
      }}></View>
      <View style={{ ...styles.flex_r, width: "100%", justifyContent: "space-between" }}>
        <View style={{ ...styles.flex_c, width: "100%", justifyContent: "flex-start", marginRight: 10 }}>
          <View style={styles.formItem}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>1. የሰውዬው/የድርጅቱ ስም</Text>
            <GetUnderlineText value={data.company_name_amharic} />
          </View>
          <View style={styles.formItem}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>2. ዜግነት</Text>
            <GetUnderlineText value={data.investor_nationality} />
          </View>
          <View style={styles.formItem}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>3. የንግድ ስም</Text>
            <GetUnderlineText value={data.trade_name_amharic} />
          </View>
          <View style={styles.formItem}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>4. የአስተዳዳሪ ስም</Text>
            <GetUnderlineText value={data.manager_full_name_amharic} />
          </View>
          <View style={styles.flex_c}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>5. የባለሀብት/የድርጅቱ አድራሻ</Text>
            <View style={{ ...styles.flex_c, width: "90%" }}>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ክልል</Text>
                  <GetSmallUnderlineText value={data.company_region_amharic} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ዞን</Text>
                  <GetSmallUnderlineText value={data.company_zone_amharic} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ከተማ</Text>
                  <GetSmallUnderlineText value={data.company_city_amharic} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ክፍለ ከተማ</Text>
                  <GetSmallUnderlineText value={data.company_sub_city_amharic} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ወረዳ/ቀበሌ</Text>
                  <GetSmallUnderlineText value={data.company_wereda_amharic} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>የቤት ቁጥር</Text>
                  <GetSmallUnderlineText value={data.company_house_number} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ፖ.ሳ.ቁ</Text>
                  <GetSmallUnderlineText value={data.company_po_box} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ስልክ ቁጥር</Text>
                  <GetSmallUnderlineText value={data.company_telephone_mobile} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ፋክስ</Text>
                  <GetSmallUnderlineText value={data.company_fax} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ኢ-ሜይል</Text>
                  <GetSmallUnderlineText value={data.company_email} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.flex_c}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>6. የኢንቨስትመንት አድራሻ</Text>
            <View style={{ ...styles.flex_c, width: "90%" }}>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ክልል</Text>
                  <GetSmallUnderlineText value={data.investment_region_amharic} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ዞን</Text>
                  <GetSmallUnderlineText value={data.investment_zone_amharic} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ከተማ</Text>
                  <GetSmallUnderlineText value={data.investment_city_amharic} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ክፍለ ከተማ</Text>
                  <GetSmallUnderlineText value={data.investment_sub_city_amharic} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ወረዳ/ቀበሌ</Text>
                  <GetSmallUnderlineText value={data.investment_wereda_amharic} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>የቤት ቁጥር</Text>
                  <GetSmallUnderlineText value={data.investment_house_number} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ፖ.ሳ.ቁ</Text>
                  <GetSmallUnderlineText value={data.investment_po_box} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ስልክ ቁጥር</Text>
                  <GetSmallUnderlineText value={data.investment_telephone_direct} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ፋክስ</Text>
                  <GetSmallUnderlineText value={data.investment_fax} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>ኢ-ሜይል</Text>
                  <GetSmallUnderlineText value={data.investment_email} />
                </View>
              </View>
            </View>
          </View>
          <View style={{ ...styles.formItem, marginTop: 10 }}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>7. የኢንቨስትመንት ሥራ ዓይነት</Text>
            <GetUnderlineText value={data.investment_activity_amharic} />
          </View>
          <View style={styles.formItem}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>8. የኢንቨስትመንት ካፒታል በኢት ብር</Text>
            <GetUnderlineText value={data.investment_capital_birr} />
          </View>
          <View style={styles.formItem}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>9. የኢንቨስትመንት ካፒታል (USD)</Text>
            <GetUnderlineText value={data.investment_capital_usd} />
          </View>
          <View style={{
            display: "flex",
            flexDirection: 'row',
            justifyContent: "space-between",
          }}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>10. የታቀደው ኤክስፖርት በመቶኛ</Text>
            <GetUnderlineText value={data.market_destination_amount} />
          </View>
          <Text style={{ ...styles.text, ...styles.text_amh }}>በኢንቨስትመንት አዋጅ ቁጥር 1180/2012 መሰረት {getCurrentDate()} </Text>
          <Text style={{ ...styles.text, ...styles.text_amh }}>አዲስ አበባ ተሰጠ</Text>
          <View style={{ ...styles.formItem, marginTop: 30 }}>
            <View style={styles.flex_c}>
              <Text style={{ ...styles.text, ...styles.text_amh }}>የአለቃ ስም</Text>
              <Text style={styles.text}>Name of Official</Text>
            </View>
            <GetLongUnderlineText value="" style={{ marginTop: 20 }} />
          </View>
          <View style={{ ...styles.formItem, marginTop: 10 }}>
            <View style={styles.flex_c}>
              <Text style={{ ...styles.text, ...styles.text_amh }}>ፊርማ</Text>
              <Text style={styles.text}>Signature</Text>
            </View>
            <GetLongUnderlineText value="" style={{ marginTop: 20 }} />
          </View>
        </View>
        <View style={{ ...styles.flex_c, width: "100%", justifyContent: "flex-start", marginRight: 10 }}>
          <View style={styles.formItem}>
            <Text style={styles.text}>1. Name of Investor/Company</Text>
            <GetUnderlineText value={data.company_name} />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.text}>2. Nationality</Text>
            <GetUnderlineText value={data.investor_nationality} />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.text}>3. Trade Name</Text>
            <GetUnderlineText value={data.trade_name} />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.text}>4. Name of the General Manager</Text>
            <GetUnderlineText value={data.manager_full_name} />
          </View>
          <View style={styles.flex_c}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>5. Addess of Investor/Company</Text>
            <View style={{ ...styles.flex_c, width: "90%" }}>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Region</Text>
                  <GetSmallUnderlineText value={data.company_region} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Zone</Text>
                  <GetSmallUnderlineText value={data.company_zone} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>City</Text>
                  <GetSmallUnderlineText value={data.company_city} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Sub-City</Text>
                  <GetSmallUnderlineText value={data.company_sub_city} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Wereda/Kebele</Text>
                  <GetSmallUnderlineText value={data.company_wereda} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>House Number</Text>
                  <GetSmallUnderlineText value={data.company_house_number} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>P.O. Box</Text>
                  <GetSmallUnderlineText value={data.company_po_box} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Phone Number</Text>
                  <GetSmallUnderlineText value={data.company_telephone_mobile} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Fax</Text>
                  <GetSmallUnderlineText value={data.company_fax} style={{ marginRight: 5 }} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Email</Text>
                  <GetSmallUnderlineText value={data.company_email} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.flex_c}>
            <Text style={{ ...styles.text, ...styles.text_amh }}>6. Investment Location</Text>
            <View style={{ ...styles.flex_c, width: "90%" }}>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Region</Text>
                  <GetSmallUnderlineText value={data.invesment_region} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Zone</Text>
                  <GetSmallUnderlineText value={data.investment_region} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>City</Text>
                  <GetSmallUnderlineText value={data.investment_region} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Sub-City</Text>
                  <GetSmallUnderlineText value={data.investment_sub_city} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Wereda/Kebele</Text>
                  <GetSmallUnderlineText value={data.investment_wereda} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>House Number</Text>
                  <GetSmallUnderlineText value={data.investment_house_number} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>P.O. Box</Text>
                  <GetSmallUnderlineText value={data.investment_po_box} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Phone Number</Text>
                  <GetSmallUnderlineText value={data.investment_telephone_direct} />
                </View>
              </View>
              <View style={{ ...styles.flex_r, width: "100%" }}>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Fax</Text>
                  <GetSmallUnderlineText value={data.investment_fax} />
                </View>
                <View style={styles.formMiniItem}>
                  <Text style={{ ...styles.text, ...styles.text_amh }}>Email</Text>
                  <GetSmallUnderlineText value={data.investment_email} />
                </View>
              </View>
            </View>
          </View>
          <View style={{ ...styles.formItem, marginTop: 10 }}>
            <Text style={styles.text}>7. Investment Activity</Text>
            <GetUnderlineText value={data.investment_activity} />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.text}>8. Amount of Investment Capital in ETB</Text>
            <GetUnderlineText value={data.investment_capital_birr} />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.text}>9. Amount of Investment Capital in USD</Text>
            <GetUnderlineText value={data.investment_capital_usd} />
          </View>
          <View style={{
            display: "flex",
            flexDirection: 'row',
            justifyContent: "space-between"
          }}>
            <Text style={styles.text}>10. Planned Export in Percent</Text>
            <GetUnderlineText value={data.market_destination_amount} />
          </View>
          <Text style={styles.text}>This Permit is Issued as per the Investment Proclamation In Addis Ababa This Day {getCurrentDate()}</Text>
          <View style={{ ...styles.formItem, marginTop: 30 }}>
            <Text style={{ ...styles.text, ...styles.text_amh, marginTop: 15 }}>እስከ</Text>
            <GetLongUnderlineText value={`${getRenewedEthiopianDate()} ታድሷል`} />
          </View>
          <View style={{ ...styles.formItem, marginTop: 10 }}>
            <View style={styles.flex_c}>
              <Text style={{ ...styles.text, marginTop: 15 }}>Valid Until</Text>
            </View>
            <GetLongUnderlineText value={`${getCalenderDate(String(new Date()))}`} />
          </View>
        </View>
      </View>
      <View style={{ ...styles.flex_c, marginTop: 20 }}>
        <View style={styles.flex_r}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', ...styles.text_amh, ...styles.text_h1 }}>
            ማሳሰቢያ/
          </Text>
          <Text style={{ ...styles.text_h1, marginTop: 3 }}>Notice:</Text>
        </View>
        <Text style={{ ...styles.text, ...styles.text_amh }}>
          1. ይህ የኢንቨስትመንት ፈቃድ ባለሀብት የምርት ውጤቱን ወይም አገልግሎቱን ለገበያ ማቅረብ እስከሚጀምርበት ጊዜ ድረስ በዓመት መታደስ አለበት::
        </Text>
        <Text style={{ ...styles.text, marginBottom: 20 }}>
          The permit shall be renewed annually until the investor commences the marketing of the product or services.
        </Text>
        <Text style={{ ...styles.text, ...styles.text_amh }}>
          2. ኢንቬስተሩ ማምርት ወይም አገልግሎቱ መስጠት ከመጀመሩ በፊት የንግድ ምዝገባ እና ፍቃድ ማውጣት አለበት::
        </Text>
        <Text style={styles.text}>
          The Investor is required to obtain trade registration and license of the enterprise prior to be the commencement of operation.
        </Text>
      </View>
    </Page>
  </Document >
);


const PrintPermit = () => {
  let selectedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer)
  const [users, setUsers] = useState([])
  const [mainData, setMainData] = useState({})
  useEffect(() => {
    FetchAllUsers((err, data) => {
      if (err) throw err
      setUsers(data)
    })
  }, [])

  useEffect(() => {
    const foundIndex = users.findIndex(user => user.service_id === selectedBuffer.service_id)
    setMainData({
      ...selectedBuffer,
      ref_number: selectedBuffer.ref_number ? selectedBuffer.ref_number : "",
      investor_name: foundIndex >= 0 ?
        `${users[foundIndex].first_name} ${users[foundIndex].middle_name} ${users[foundIndex].last_name}` : "",
      home_country: selectedBuffer.home_address.country,
      home_region: selectedBuffer.home_address.region,
      home_city: selectedBuffer.home_address.city,
      home_wereda: selectedBuffer.home_address.sub_city,
      home_kebele: selectedBuffer.home_address.zone,
      home_house_number: selectedBuffer.home_address.house_number,
      investment_region: selectedBuffer.investment_address.region,
      investment_city: selectedBuffer.investment_address.city,
    })
  }, [users, selectedBuffer, setMainData])
  return (
    <PDFViewer>
      <PermitDocument data={mainData} />
    </PDFViewer>
  )
}

export default PrintPermit