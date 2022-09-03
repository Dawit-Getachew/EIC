import React, { FC, useEffect, useState } from "react"
import { Document, Page, Text, View, StyleSheet, Font, PDFViewer, Image } from '@react-pdf/renderer';
import { styles as permit_styles } from './PrintPermit'
import { useSelector } from "react-redux"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { FetchAllUsers } from "src/store/States/User/action";

Font.register({
  family: "Noto Serif",
  src: "/static/fonts/Noto_Serif_Ethiopic/static/NotoSerifEthiopic/NotoSerifEthiopic-Regular.ttf"
})

const styles = StyleSheet.create({
  ...permit_styles,
  h1: {
    fontSize: 32
  },
  h2: {
    fontSize: 18
  },
  h3: {
    fontSize: 14
  },
  text_underline: {
    textDecoration: "underline"
  },
  text_normal: {
    fontSize: 9
  },
  number_container: {
    backgroundColor: "#4f4646",
    display: "flex",
    alignItems: "center",
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: "center"
  },
  number_text: {
    color: 'white',
    fontSize: 9
  },
  box_input: {
    width: 350,
    borderStyle: "solid",
    borderWidth: 0,
    borderBottomWidth: 1,
    height: 20,
    borderColor: "black",
    paddingLeft: 20,
    display: "flex",
    justifyContent: "center",
    marginTop: 5
  },
  box_checkbox: {
    width: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 4,
    height: 15,
    borderColor: "black",
    paddingLeft: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  tableContainer: {
    marginLeft: 30,
    marginTop: 20
  },
  tableItem: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    width: 110,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0,
  },
  tableItemNoRight: {
    borderRightWidth: 0
  },
  tableItemNoLeft: {
    borderLeftWidth: 0
  },
  tableItemNoTop: {
    borderTopWidth: 0
  },
  tableFooter: {
    borderBottomWidth: 1
  },
  pageBreak: {
    marginBottom: 100
  }
})

const FormInput: FC<{ title: string, value: string }> = (props) => (
  <View style={{ ...styles.flex_c, marginLeft: 30, marginTop: 5 }}>
    <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.title}</Text>
    <View style={styles.box_input}>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.value}</Text>
    </View>
  </View>
)

const FormInputNew: FC<{ index: number, title: string, value: string, style?: any }> = (props) => (
  <View style={{ ...styles.flex_c, marginTop: 10, ...props.style }}>
    <View style={{ ...styles.flex_r, alignItems: "center" }}>
      <View style={{ ...styles.number_container, marginRight: 5 }}>
        <Text style={styles.number_text}>{props.index}</Text>
      </View>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.title}</Text>
    </View>
    <View style={{ ...styles.box_input, marginLeft: 30 }}>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.value}</Text>
    </View>
  </View>
)

const FormTextArea: FC<{ title: string, value: string, index: number, Component?: any }> = (props) => (
  <View style={{ ...styles.flex_c, marginTop: 10, justifyContent: "center" }}>
    <View style={{ ...styles.flex_r, alignItems: "center" }}>
      <View style={{ ...styles.number_container, marginRight: 5 }}>
        <Text style={styles.number_text}>{props.index}</Text>
      </View>
      <View style={styles.flex_c}>
        <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.title}</Text>
      </View>
    </View>
    <View style={{ ...styles.box_input, height: 50, marginLeft: 27, }}>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.value}</Text>
    </View>
  </View>
)

const FormSmallInput: FC<{ title: string, value: string, style?: any }> = (props) => (
  <View style={{ ...styles.flex_c, marginLeft: 30, marginTop: 5, alignItems: "flex-start", justifyContent: "center", ...(props.style ? props.style : {}) }}>
    <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.title}</Text>
    <View style={{ ...styles.box_input, width: 150 }}>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.value}</Text>
    </View>
  </View>
)

const FormCheckBox: FC<{ title: string, checked?: boolean, noBorder?: boolean }> = (props) => (
  <View style={{ ...styles.flex_r, alignItems: "center", marginLeft: 30, marginBottom: 5 }}>
    <View style={{ ...(props.noBorder? {} : styles.box_checkbox), marginRight: 5 }}>
      {props.checked && <View style={{ width: 21, height: 17, borderRadius: 4, backgroundColor: "#4f4646", marginLeft: -20 }}></View>}
    </View>
    <Text style={styles.text_normal}>{props.title}</Text>
  </View>
)

const ShareholdersFormTable: FC<{ items: { name: string, nationality: string, country: string, address: string }[] }> = (props) => (
  <View style={styles.tableContainer}>
    <View style={styles.flex_r}>
      <View style={styles.tableItem}>
        <Text style={styles.text_normal}>Name</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Nationality</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Country of Incorporation</Text>
      </View>
      <View style={{ ...styles.tableItem }}>
        <Text style={styles.text_normal}>Address</Text>
      </View>
    </View>
    {props.items.slice(0, props.items.length - 1).map(item => (
      <View style={styles.flex_r} key={item.name}>
        <View style={{ ...styles.tableItem, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.name}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.nationality}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoLeft, ...styles.flex_c, width: 110 }}>
          <Text style={styles.text_normal}>{item.country}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.address}</Text>
        </View>
      </View>
    ))}
    <View style={styles.flex_r}>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].name}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoLeft, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].nationality}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoRight, ...styles.tableItemNoLeft, ...styles.flex_c, width: 110 }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].country}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].address}</Text>
      </View>
    </View>
  </View>
)

const ProductsFormTable: FC<{ items: { name: string, unit: string, quantity: string, local_market_share: string, export_market_share: string }[] }> = (props) => (
  <View style={styles.tableContainer}>
    <View style={styles.flex_r}>
      <View style={{ ...styles.tableItem, width: 40 }}>
        <Text style={styles.text_normal}>#</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Type of Product</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Unit</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Quantity</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Local Market Share</Text>
      </View>
      <View style={{ ...styles.tableItem }}>
        <Text style={styles.text_normal}>Export Market Share</Text>
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
          <Text style={styles.text_normal}>{item.unit}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.quantity}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoLeft, ...styles.flex_c, width: 110 }}>
          <Text style={styles.text_normal}>{item.local_market_share}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.export_market_share}</Text>
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
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].unit}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoLeft, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].quantity}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoRight, ...styles.tableItemNoLeft, ...styles.flex_c, width: 110 }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].local_market_share}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].export_market_share}</Text>
      </View>
    </View>
  </View>
)

const RawMaterialsFormTable: FC<{ items: { name: string, unit: string, quantity: string, local_source: string, imported_source: string }[] }> = (props) => (
  <View style={styles.tableContainer}>
    <View style={styles.flex_r}>
      <View style={{ ...styles.tableItem, width: 40 }}>
        <Text style={styles.text_normal}>#</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Type of Raw Material</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Unit</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Quantity</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Sourced From Local (Percent)</Text>
      </View>
      <View style={{ ...styles.tableItem }}>
        <Text style={styles.text_normal}>Imported (Percent)</Text>
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
          <Text style={styles.text_normal}>{item.unit}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.quantity}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoLeft, ...styles.flex_c, width: 110 }}>
          <Text style={styles.text_normal}>{item.local_source}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.imported_source}</Text>
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
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].unit}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoLeft, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].quantity}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoRight, ...styles.tableItemNoLeft, ...styles.flex_c, width: 110 }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].local_source}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].imported_source}</Text>
      </View>
    </View>
  </View>
)

export const HeaderItem: FC<{ style: any }> = (props) => (
  <View style={{ ...styles.flex_r, justifyContent: "space-around", ...props.style }}>
    <View style={{ ...styles.flex_r, alignItems: "center" }}>
      <Image style={styles.image} src="/static/images/eic/eic-logo.jpg" />
      <Text style={styles.h1}>EIC</Text>
    </View>
    <View style={{ ...styles.flex_c, alignItems: "center" }}>
      <Text style={styles.h2}>Ethiopian Investment Commission</Text>
      <Text style={{ ...styles.h2, ...styles.text_amh }}>የኢትዮጵያ ኢንቨስትመንት ኮሚሽን</Text>
      <Text style={{ ...styles.h3, ...styles.text_underline }}>Investment Application Form</Text>
    </View>
  </View>
)

export const MainPrintPermitData: FC<{ data: any }> = (props) => {
  return <PrintPermitData data={props.data} />
}

export const PrintPermitData: FC<{ data: any }> = (props) => {
  return (
    <Document>
      <Page size="A4" style={{ ...styles.flex_c, padding: 15 }} fixed>
        <View style={{ alignItems: "center" }}>
          <View style={{ ...styles.flex_r, alignItems: "center" }}>
            <Image style={styles.image} src="/static/images/eic/eic-logo.jpg" />
            <Text style={styles.h1}>EIC</Text>
          </View>
          <View style={{ ...styles.flex_c, alignItems: "center" }}>
            <Text style={styles.h2}>Ethiopian Investment Commission</Text>
            <Text style={{ ...styles.h2, ...styles.text_amh }}>የኢትዮጵያ ኢንቨስትመንት ኮሚሽን</Text>
            <Text style={{ ...styles.h3, ...styles.text_underline }}>Investment Application Form</Text>
          </View>
        </View>
        <Text style={{ ...styles.text_normal, marginTop: 15, marginBottom: 15 }}>
          Note: This form is designed to register new investments in Ethiopia. Before youstart filling this form, please ensure that
          you have all information and documents necessary for this process. Please fill in all requierd information
          to make the registration process as quick and seamless as possible. Thank you
        </Text>
        <FormInputNew index={1} title="Name of the Company" value={props.data.company_name} />
        <FormInput title="የድርጅቱ ስም" value={props.data.company_name_amharic} />
        <FormInput title="Trade Name (if any)" value={props.data.trade_name} />
        <FormInput title="የንግድ ስም" value={props.data.trade_name_amharic} />
        <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>2</Text>
          </View>
          <Text style={styles.text_normal}>Type of Business</Text>
        </View>
        <View style={styles.flex_r}>
          <View style={styles.flex_c}>
            <FormCheckBox title="Private Limited Company" checked={props.data.type_of_business === "Private Limited Company"} />
            <FormCheckBox title="One Man Person Private Limited Company" checked={props.data.type_of_business === "One Man Person Private Limited Company"} />
            <FormCheckBox title="Share Company" checked={props.data.type_of_business === "Share Company"} />
            <FormCheckBox title="Public Enterprise" checked={props.data.type_of_business === "Public Enterprise"} />
          </View>
          <View style={styles.flex_c}>
            <FormCheckBox title="Cooperative Society" checked={props.data.type_of_business === "Cooperative Society"} />
            <FormCheckBox title="Sole Proprietorship" checked={props.data.type_of_business === "Sole Proprietorship"} />
            <FormCheckBox title="Civil Society Organization" checked={props.data.type_of_business === "Civil Society Organization"} />
            <FormCheckBox title="Other Engaging Business" checked={props.data.type_of_business === "Other Engaging Business"} />
          </View>
        </View>
        <View style={{ ...styles.flex_r, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>3</Text>
          </View>
          <Text style={styles.text_normal}>Name of Shareholders</Text>
        </View>
        <ShareholdersFormTable items={props.data.shareholders.map(item => ({
          name: item.name,
          nationality: item.nationality,
          country: item.country_of_incorporation,
          address: item.address
        }))} />
        <FormInputNew index={4} title="Name of the General Manager" value={props.data.manager_full_name} />
        <FormInput title="የሥራ አስኪያጅ ስም" value={props.data.manager_full_name_amharic} />
        <View style={{ marginBottom: 125 }}></View>
        <View style={{ ...styles.flex_r, alignItems: "center", marginTop: 20 }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>5</Text>
          </View>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Address of the Business Organization (የንግድ ድርጅቱ አድራሻ)</Text>
        </View>
        <View style={styles.flex_r}>
          <View style={styles.flex_c}>
            <FormSmallInput title="Region" value={props.data.company_region} />
            <FormSmallInput title="Zone" value={props.data.company_zone} />
            <FormSmallInput title="City" value={props.data.company_city} />
            <FormSmallInput title="Sub-City" value={props.data.company_sub_city} />
            <FormSmallInput title="Woreda/Kebele" value={props.data.company_wereda} />
          </View>
          <View style={styles.flex_c}>
            <FormSmallInput title="ክልል" value={props.data.company_region_amharic} />
            <FormSmallInput title="ዞን" value={props.data.company_zone_amharic} />
            <FormSmallInput title="ከተማ" value={props.data.company_city_amharic} />
            <FormSmallInput title="ክፍለ ከተማ" value={props.data.company_sub_city_amharic} />
            <FormSmallInput title="ወረዳ/ቀበሌ" value={props.data.company_wereda_amharic} />
          </View>
        </View>
        <FormInput title="House No." value={props.data.company_house_number} />
        <FormInput title="P.O. Box" value={props.data.company_po_box} />
        <FormInput title="Telephone" value={props.data.company_telephone_mobile} />
        <FormInput title="Fax" value={props.data.company_fax} />
        <FormInput title="Email" value={props.data.company_email} />
        <View style={{ ...styles.flex_r, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>6</Text>
          </View>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Home address including telephone and e-mail (የቤት አድራሻ ስልክ እና ኢሜይል)</Text>
        </View>
        <View style={styles.flex_c}>
          <FormInput title="Telephone" value={props.data.home_telephone_direct} />
          <FormInput title="P.O. Box" value={props.data.home_po_box} />
          <FormInput title="Country" value={props.data.home_country} />
          <FormInput title="Email" value={props.data.home_email} />
        </View>
        <View style={{ ...styles.flex_r, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>7</Text>
          </View>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Address of authorized representative (የሕጋዊ ተወካይ አድራሻ)</Text>
        </View>
        <FormSmallInput title="Name" value={props.data.representative_full_name} />
        <FormSmallInput title="Phone Number" value={props.data.representative_telephone_direct} />
        <FormSmallInput title="Email" value={props.data.representative_email} />
        <View style={{ marginTop: 23 }} />
        <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>8</Text>
          </View>
          <Text style={styles.text_normal}>Sector</Text>
        </View>
        <View style={{ ...styles.flex_r, justifyContent: "flex-start", width: "100%" }}>
          <FormCheckBox title="Agriculture" checked={props.data.sector === "Agriculture"} />
          <FormCheckBox title="Industry" checked={props.data.sector === "Industry"} />
          <FormCheckBox title="Service" checked={props.data.sector === "Service"} />
        </View>
        <FormTextArea index={9} title="Investment Activity" value={props.data.investment_activity} />
        <FormTextArea index={10} title="Brief description of the project objectivies and major activities" value={props.data.project_description} />
        <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>11</Text>
          </View>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Investment Location (የኢንቨስትመንት አድራሻ)</Text>
        </View>
        <View style={styles.flex_r}>
          <View style={styles.flex_c}>
            <FormSmallInput title="Region" value={props.data.investment_region} />
            <FormSmallInput title="Zone" value={props.data.investment_zone} />
            <FormSmallInput title="City" value={props.data.investment_city} />
            <FormSmallInput title="Sub-City" value={props.data.investment_sub_city} />
            <FormSmallInput title="Woreda/Kebele" value={props.data.investment_woreda} />
          </View>
          <View style={styles.flex_c}>
            <FormSmallInput title="ክልል" value={props.data.investment_region_amharic} />
            <FormSmallInput title="ዞን" value={props.data.investment_zone_amharic} />
            <FormSmallInput title="ከተማ" value={props.data.investment_city_amharic} />
            <FormSmallInput title="ክፍለ ከተማ" value={props.data.investment_sub_city_amharic} />
            <FormSmallInput title="ወረዳ/ቀበሌ" value={props.data.investment_woreda_amharic} />
          </View>
        </View>
        <FormInputNew index={12} title="Land Requirement (in square-meter) by type of project" value={props.data.land_size_sqm} style={{ marginTop: 0 }} />
        <View style={{ ...styles.flex_c, marginTop: 10 }}>
          <View style={{ ...styles.flex_r, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>13</Text>
            </View>
            <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Amount of investment capital (in United States Dollar and Ethiopian Birr)</Text>
          </View>
          <View style={{ ...styles.box_input, marginLeft: 30 }}>
            <Text style={{ ...styles.text_normal, ...styles.text_amh }}>USD {props.data.investment_capital_usd}</Text>
          </View>
          <View style={{ ...styles.box_input, marginLeft: 30 }}>
            <Text style={{ ...styles.text_normal, ...styles.text_amh }}>ETB {props.data.investment_capital_birr}</Text>
          </View>
        </View>
        <View style={{ ...styles.flex_c, marginTop: 10 }}>
          <View style={{ ...styles.flex_r, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>14</Text>
            </View>
            <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Source of Finance</Text>
          </View>
          <View style={{ ...styles.flex_r, alignItems: "center", marginLeft: 30 }}>
            <Text style={{ ...styles.text_normal, ...styles.text_amh, marginRight: 5 }}>Equity</Text>
            <View style={{ ...styles.box_input, width: 150 }}>
              <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.data.equity}</Text>
            </View>
          </View>
          <View style={{ ...styles.flex_r, alignItems: "center", marginLeft: 30 }}>
            <Text style={{ ...styles.text_normal, ...styles.text_amh, marginRight: 5 }}>Loan</Text>
            <View style={{ ...styles.box_input, width: 150 }}>
              <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.data.loan}</Text>
            </View>
          </View>
        </View>
        <FormInputNew index={15} title="Estimated number of employees at full capacity" value={props.data.number_of_employees} />
        <View style={{ ...styles.flex_c, marginTop: 10 }}>
          <View style={{ ...styles.flex_r, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>16</Text>
            </View>
            <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Market Destination</Text>
          </View>
          <View style={{ ...styles.flex_r, alignItems: "center", marginLeft: 30 }}>
            <Text style={{ ...styles.text_normal, ...styles.text_amh, marginRight: 5 }}>Export</Text>
            <View style={{ ...styles.box_input, width: 150 }}>
              <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.data.market_destination_export_amount}</Text>
            </View>
          </View>
          <View style={{ ...styles.flex_r, alignItems: "center", marginLeft: 30 }}>
            <Text style={{ ...styles.text_normal, ...styles.text_amh, marginRight: 5 }}>Local</Text>
            <View style={{ ...styles.box_input, width: 150 }}>
              <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.data.market_destination_local_amount}</Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.flex_r, alignItems: "center", marginTop: 20 }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>17</Text>
          </View>
          <Text style={styles.text_normal}>Estimated annual production/service rendering of the project at full capacity</Text>
        </View>
        <ProductsFormTable items={props.data.products.map(item => ({
          quantity: item.quantity,
          unit: item.unit,
          name: item.name,
          local_market_share: item.local_share_market,
          export_market_share: item.export_share_market
        }))} />
        <View style={{ ...styles.flex_r, alignItems: "center", marginTop: 20 }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>18</Text>
          </View>
          <Text style={styles.text_normal}>Raw material requirements at full capacity (applicable to manufacturing and agricultural projects only)</Text>
        </View>
        <RawMaterialsFormTable items={props.data.raw_materials.map(item => ({
          quantity: item.quantity,
          unit: item.unit,
          name: item.name,
          local_source: item.local_source,
          imported_source: item.import_source
        }))} />
        <FormTextArea index={19} title="Brief description about the potential impact of the proposed investment on environment and measures of mitigation to be undertaken" value={props.data.enviromental_impact} />
        <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>20</Text>
          </View>
          <Text style={styles.text_normal}>Please indicate where you received information about investing in Ethiopia</Text>
        </View>
        <View style={styles.flex_r}>
          <View style={styles.flex_c}>
            <FormCheckBox title="Website" checked={props.data.heard_from === "Website"} />
            <FormCheckBox title="Word of mouth" checked={props.data.heard_from === "Word of mouth"} />
            <FormCheckBox title="Friend, Family" checked={props.data.heard_from === "Friend, Family"} />
          </View>
          <View style={styles.flex_c}>
            <FormCheckBox title="Network" checked={props.data.heard_from === "Network"} />
            <FormCheckBox title="Other Government Institution" checked={props.data.heard_from === "Other Government Institution"} />
            <FormCheckBox title="Other" checked={props.data.heard_from === "Other"} />
          </View>
        </View>
        <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>21</Text>
          </View>
          <Text style={styles.text_normal}>Please ensure the following documents are submitted along with the form.</Text>
        </View>
        <View style={styles.flex_r}>
          <View style={styles.flex_c}>
            <FormCheckBox title="Power of Attorney" checked={props.data.permit_documents.power_of_attorney.length} />
            <FormCheckBox title="Investment Visa for Foreigners" checked={props.data.permit_documents.investment_visa_for_foreigners.length} />
            <FormCheckBox title="Notarized Minutes of Resolution" checked={props.data.permit_documents.notarized_minutes_of_resolution.length} />
            <FormCheckBox title="Passport" checked={props.data.permit_documents.passport.length} />
          </View>
          <View style={styles.flex_c}>
            <FormCheckBox title="Certificate of Incorporation" checked={props.data.permit_documents.certificate_of_incorporation.length} />
            <FormCheckBox title="Memorandum and Articles of Association" checked={props.data.permit_documents.memorandum_and_articles_of_association.length} />
            <FormCheckBox title="Business Background" checked={props.data.permit_documents.business_background.length} />
          </View>
        </View>
      </Page>
    </Document >
  )
}

export const MainDocument = () => (
  <PDFViewer>
    <MainDocument />
  </PDFViewer>
)