import React, { FC } from "react"
import { Document, Image, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import './styles.css'
import { getCommonDate } from "src/helpers/getDateTime"

// Create styles
export const permit_styles = StyleSheet.create({
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
    width: 50,
    height: 50
  },
  text: {
    fontSize: 9,
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
    fontWeight: "bold"
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
  text_h2: {
    fontSize: 10
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
    borderWidth: 1,
    borderRadius: 8,
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
  tableItemBottom: {
    borderBottomWidth: 1
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

interface Props {
  data: any
}

Font.register({
  family: "Noto Serif",
  src: "/static/fonts/Noto_Serif_Ethiopic/static/NotoSerifEthiopic/NotoSerifEthiopic-Regular.ttf"
})

const FormCheckBox: FC<{ title: string, checked?: boolean }> = (props) => (
  <View style={{ ...styles.flex_r, alignItems: "center", marginLeft: 30, marginBottom: 5 }}>
    <View style={{ ...styles.box_checkbox, marginRight: 5 }}>
      {props.checked && <View style={{ width: 10, height: 10, backgroundColor: "black", borderRadius: 50, marginLeft: -19 }}></View>}
    </View>
    <Text style={styles.text_normal}>{props.title}</Text>
  </View>
)

const FormInput: FC<{ title: string, value: string }> = (props) => (
  <View style={{ ...styles.flex_c, marginLeft: 30, marginTop: 5 }}>
    <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.title}</Text>
    <View style={styles.box_input}>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.value}</Text>
    </View>
  </View>
)

const FormTextArea: FC<{ title: string, value: string, Component?: any }> = (props) => (
  <View style={{ ...styles.flex_c, marginTop: 10, justifyContent: "center" }}>
    <View style={{ ...styles.flex_r, alignItems: "center", marginLeft: 30, }}>
      <View style={styles.flex_c}>
        <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.title}</Text>
      </View>
    </View>
    <View style={{ ...styles.box_input, height: 50, marginLeft: 27, }}>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.value}</Text>
    </View>
  </View>
)

const CurrentProductsFormTable: FC<{ items: { name: string, unit: string, quantity: string, local_market_share: string, export_market_share: string }[] }> = (props) => (
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

const AnticipatedProductsFormTable: FC<{
  items: {
    name: string, unit: string, quantity: number, local_market_share: number, export_market_share: number,
    percentage_capacity_increased: number, percentage_unit_increased: number
  }[]
}> = (props) => (
  <View style={styles.tableContainer}>
    <View style={styles.flex_r}>
      <View>
        <View style={{ ...styles.tableItem, ...styles.flex_c, height: 50, width: 30, ...styles.tableItemNoRight }}>
          <Text style={styles.text_normal}>#</Text>
          <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight, ...styles.tableItemNoTop }}></View>
        </View>
      </View>
      <View>
        <View style={{ ...styles.tableItem, ...styles.flex_c, height: 50, ...styles.tableItemNoRight }}>
          <Text style={styles.text_normal}>Type of Product</Text>
          <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight, ...styles.tableItemNoTop }}></View>
        </View>
      </View>
      <View>
        <View style={{ ...styles.tableItem, ...styles.flex_c, height: 50, justifyContent: "space-around", ...styles.tableItemNoRight }}>
          <Text style={styles.text_normal}>Capacity</Text>
          <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight }}>
            <View style={{ ...styles.tableItem, ...styles.tableItemNoTop, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
              <Text style={styles.text_normal}>Unit</Text>
            </View>
            <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoTop, ...styles.tableItemNoRight, height: 20 }}>
              <Text style={styles.text_normal}>Quanity</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={{ ...styles.tableItem, ...styles.flex_c, height: 50, justifyContent: "space-around", ...styles.tableItemNoRight }}>
          <Text style={styles.text_normal}>Percentage Increased</Text>
          <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight }}>
            <View style={{ ...styles.tableItem, ...styles.tableItemNoTop, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
              <Text style={styles.text_normal}>Unit</Text>
            </View>
            <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoTop, ...styles.tableItemNoRight, height: 20 }}>
              <Text style={styles.text_normal}>Quanity</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={{ ...styles.tableItem, ...styles.flex_c, height: 50, justifyContent: "space-around" }}>
          <Text style={styles.text_normal}>Market Share</Text>
          <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight }}>
            <View style={{ ...styles.tableItem, ...styles.tableItemNoTop, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
              <Text style={styles.text_normal}>Domestic</Text>
            </View>
            <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoTop, ...styles.tableItemNoRight, height: 20 }}>
              <Text style={styles.text_normal}>Export</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
    {props.items.slice(0, props.items.length - 1).map((item, idx) => (
      <View style={styles.flex_r}>
        <View>
          <View style={{ ...styles.tableItem, ...styles.flex_c, height: 20, width: 30, ...styles.tableItemNoRight }}>
            <Text style={styles.text_normal}>{idx + 1}</Text>
            <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight, ...styles.tableItemNoTop }}>
              {idx + 1}
            </View>
          </View>
        </View>
        <View>
          <View style={{ ...styles.tableItem, ...styles.flex_c, height: 20, ...styles.tableItemNoRight }}>
            <Text style={styles.text_normal}>{item.name}</Text>
          </View>
        </View>
        <View>
          <View style={{ ...styles.tableItem, ...styles.flex_c, height: 20, justifyContent: "space-between", ...styles.tableItemNoRight }}>
            <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight, ...styles.tableItemNoTop }}>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoTop, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
                <Text style={styles.text_normal}>{item.unit}</Text>
              </View>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoTop, ...styles.tableItemNoRight, height: 20 }}>
                <Text style={styles.text_normal}>{item.quantity}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ ...styles.tableItem, ...styles.flex_c, height: 20, justifyContent: "space-between", ...styles.tableItemNoRight }}>
            <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight, ...styles.tableItemNoTop }}>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoTop, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
                <Text style={styles.text_normal}>{item.percentage_unit_increased}</Text>
              </View>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoTop, ...styles.tableItemNoRight, height: 20 }}>
                <Text style={styles.text_normal}>{item.percentage_capacity_increased}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ ...styles.tableItem, ...styles.flex_c, height: 20, justifyContent: "space-between" }}>
            <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight, ...styles.tableItemNoTop }}>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoTop, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
                <Text style={styles.text_normal}>{item.local_market_share}</Text>
              </View>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoTop, ...styles.tableItemNoRight, height: 20 }}>
                <Text style={styles.text_normal}>{item.export_market_share}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    ))}
    {props.items.slice(props.items.length - 1, props.items.length).map((item, idx) => (
      <View style={styles.flex_r}>
        <View>
          <View style={{ ...styles.tableItem, ...styles.flex_c, height: 20, width: 30, ...styles.tableItemNoRight, ...styles.tableItemBottom }}>
            <Text style={styles.text_normal}>{props.items.length}</Text>
            <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight, ...styles.tableItemNoTop }}></View>
          </View>
        </View>
        <View>
          <View style={{ ...styles.tableItem, ...styles.flex_c, height: 20, ...styles.tableItemNoRight, ...styles.tableItemBottom }}>
            <Text style={styles.text_normal}>{item.name}</Text>
          </View>
        </View>
        <View>
          <View style={{ ...styles.tableItem, ...styles.flex_c, height: 20, justifyContent: "space-between", ...styles.tableItemNoRight, ...styles.tableItemBottom }}>
            <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight, ...styles.tableItemNoTop }}>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoTop, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
                <Text style={styles.text_normal}>{item.unit}</Text>
              </View>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoTop, ...styles.tableItemNoRight, height: 20 }}>
                <Text style={styles.text_normal}>{item.quantity}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ ...styles.tableItem, ...styles.flex_c, height: 20, justifyContent: "space-between", ...styles.tableItemNoRight, ...styles.tableItemBottom }}>
            <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight, ...styles.tableItemNoTop }}>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoTop, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
                <Text style={styles.text_normal}>{item.percentage_unit_increased}</Text>
              </View>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoTop, ...styles.tableItemNoRight, height: 20 }}>
                <Text style={styles.text_normal}>{item.percentage_capacity_increased}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ ...styles.tableItem, ...styles.flex_c, height: 20, justifyContent: "space-between", ...styles.tableItemBottom }}>
            <View style={{ ...styles.flex_r, ...styles.tableItem, ...styles.tableItemNoLeft, height: 20, ...styles.tableItemNoRight, ...styles.tableItemNoTop }}>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoTop, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
                <Text style={styles.text_normal}>{item.local_market_share}</Text>
              </View>
              <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoTop, ...styles.tableItemNoRight, height: 20 }}>
                <Text style={styles.text_normal}>{item.export_market_share}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    ))
    }
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

const calculateTotalInvestmentCosts = (investment_cost: any) => {
  const values = Object.values(investment_cost)
  let totalAmount = 0
  values.forEach(value => totalAmount += Number(value))
  return String(totalAmount)
}

export const ExpansionPermitDocument: React.FC<Props> = (props) => (
  <Document>
    <Page size="A4" style={{ ...styles.flex_c, padding: 15 }} fixed>
      <View style={{ ...styles.flex_c, ...styles.flex_both_center }}>
        <View style={{ ...styles.flex_r, alignItems: "center" }}>
          <Image style={styles.image} src="/static/images/eic/eic-logo.jpg" />
          <Text style={styles.h1}>EIC</Text>
        </View>
        <Text style={{ ...styles.text_h1, ...styles.text_amh }}>የውጪ ሀገር ባለሀብት የኢንቨስትመንት ማስፋፊያ ፍቃድ</Text>
        <Text style={styles.text_title}>INVESTMENT PERMIT EXPANSION FORM FOR FORIGN INVESTORS</Text>
      </View>
      <View style={styles.flex_c}>
        <>
          <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>1</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: "extrabold", textDecoration: "underline" }}>Particulars of the Applicant</Text>
          </View>
          <FormInput title="Name of Investor/Company" value={props.data.company_name_amharic} />
          <FormInput title="የድርጅቱ ስም" value={props.data.company_name_amharic} />
          <View style={{ marginTop: 10, marginLeft: 30 }}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>Location of the previous project</Text>
          </View>
          <View style={styles.flex_r}>
            <View style={styles.flex_c}>
              <FormSmallInput title="Region" value={props.data.company_expansion_address.region} />
              <FormSmallInput title="Zone" value={props.data.company_expansion_address.zone} />
              <FormSmallInput title="City" value={props.data.company_expansion_address.city} />
              <FormSmallInput title="Sub-City" value={props.data.company_expansion_address.sub_city} />
              <FormSmallInput title="Woreda/Kebele" value={props.data.company_expansion_address.wereda} />
            </View>
            <View style={styles.flex_c}>
              <FormSmallInput title="Telephone" value={props.data.company_expansion_address.telephone_direct} />
              <FormSmallInput title="Cellphone" value={props.data.company_expansion_address.telephone_mobile} />
              <FormSmallInput title="Fax" value={props.data.company_expansion_address.fax} />
              <FormSmallInput title="Email" value={props.data.company_expansion_address.email} />
              <FormSmallInput title="P.O. Box" value={props.data.company_expansion_address.po_box} />
            </View>
          </View>
          <View style={{ marginTop: 20, marginLeft: 30 }}>
            <Text style={{ ...styles.text_normal, ...styles.text_amh }}>If the expansion location is different from the previous</Text>
          </View>
          <View style={styles.flex_r}>
            <View style={styles.flex_c}>
              <FormSmallInput title="Region" value={props.data.company_expansion_address.region} />
              <FormSmallInput title="Wereda" value={props.data.company_expansion_address.wereda} />
            </View>
            <View style={styles.flex_c}>
              <FormSmallInput title="City" value={props.data.company_expansion_address.city} />
              <FormSmallInput title="Zone" value={props.data.company_expansion_address.zone} />
            </View>
          </View>
        </>
        <>
          <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>2</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: "extrabold", textDecoration: "underline" }}>
              Profile of Proposed Investment for the expansion/upgrading
            </Text>
          </View>
          <FormInput title="Project Title (Investment Activity)" value={props.data.investment_activity} />
          <FormInput title="Brief description of the project objective and major activities" value={props.data.project_description} />
        </>
        <>
          <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>3</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: "extrabold", textDecoration: "underline" }}>
              Proposed capital and source of capital for the expansion/upgrading
            </Text>
          </View>
          <FormInput title="Proposed Expansion Capital" value={props.data.proposed_investment_capital} />
          <Text style={{ ...styles.text_normal, marginLeft: 30, marginBottom: 10, ...styles.boldText }}>Source of Finance</Text>
          <FormInput title="Equity" value={props.data.equity} />
          <FormInput title="Loan" value={props.data.loan} />
          <FormInput title="Other source of capital" value="0" />
          <Text style={{ ...styles.text_normal, marginLeft: 30, marginBottom: 10, ...styles.boldText }}>Estimated investment cost</Text>
          <View style={styles.flex_r}>
            <View style={styles.flex_c}>
              <FormSmallInput title="Land" value={props.data.investment_costs.land} />
              <FormSmallInput title="Building" value={props.data.investment_costs.building} />
              <FormSmallInput title="Working Capital" value={props.data.investment_costs.working_capital} />
              <FormSmallInput title="Machinery" value={props.data.investment_costs.machinery} />
            </View>
            <View style={styles.flex_c}>
              <FormSmallInput title="Material/Equipment" value={props.data.investment_costs.material} />
              <FormSmallInput title="Other Costs" value={props.data.investment_costs.other_costs} />
              <FormSmallInput title="Total" value={calculateTotalInvestmentCosts(props.data.investment_costs)} />
            </View>
          </View>
        </>
        <>
          <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>4</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: "extrabold", textDecoration: "underline" }}>
              Expected Employement Oppurtunities
            </Text>
          </View>
          <View style={{ marginTop: 10, marginLeft: 30 }}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>3.1 Expected</Text>
          </View>
          <View style={styles.flex_r}>
            <FormSmallInput title="Permanent" value={props.data.expected_employees.permanent_amount} />
            <FormSmallInput title="Temporary" value={props.data.expected_employees.temporary_amount} />
          </View>
          <View style={{ marginTop: 10, marginLeft: 30 }}>
            <Text style={{ fontSize: 9, fontWeight: "bold", marginTop: 10, }}>3.2 Previous created oppurtunity</Text>
          </View>
          <View style={styles.flex_r}>
            <View style={styles.flex_c}>
              <Text style={{ fontSize: 9, fontWeight: "bold", marginLeft: 30 }}>Permanent Employees</Text>
              <FormSmallInput title="Male" value={props.data.previous_employees.permanent_male_amount} />
              <FormSmallInput title="Female" value={props.data.previous_employees.permanent_female_amount} />
            </View>
            <View style={styles.flex_c}>
              <Text style={{ fontSize: 9, fontWeight: "bold", marginLeft: 30 }}>Temporary Employees</Text>
              <FormSmallInput title="Male" value={props.data.previous_employees.temporary_male_amount} />
              <FormSmallInput title="Female" value={props.data.previous_employees.temporary_female_amount} />
            </View>
          </View>
        </>
        <>
          <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>5</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: "extrabold", textDecoration: "underline" }}>
              Project site/utility required for expansion
            </Text>
          </View>
          <FormInput title="Size of land required" value={`${props.data.project_utilities.size_of_land_sqm} (Sq.M or Ha)`} />
          <FormInput title="Electrical Power" value={`${props.data.project_utilities.electrical_power_kw} Kw`} />
          <FormInput title="Water" value={`${props.data.project_utilities.water_m3} m³`} />
          <FormInput title="Telecom services needed" value={`${props.data.project_utilities.telecom_services_needed}`} />
          <FormInput title="Others (if any)" value={`${props.data.project_utilities.other_services}`} />
        </>
        <>
          <View style={{ ...styles.flex_r, marginTop: 135, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>6</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: "extrabold", textDecoration: "underline" }}>
              Main Products/Services
            </Text>
          </View>
          <View style={{ marginTop: 10, marginLeft: 30 }}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              Show the average production capacity (in percentage %) of each product/service and market destination
              in the past 2 years and the anticipated amount with increased percentage in volume and new products as a result of expansion
            </Text>
          </View>
          <View style={{ marginTop: 10, marginLeft: 30, marginBottom: 10 }}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              5.1 The Past 2 years production services and sale program (average)
            </Text>
          </View>
          <CurrentProductsFormTable items={props.data.current_products.map(item => ({
            quantity: item.quantity,
            unit: item.unit,
            name: item.name,
            local_market_share: item.local_share_market,
            export_market_share: item.export_share_market
          }))} />
          <View style={{ marginTop: 10, marginLeft: 30, marginBottom: 10 }}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              5.2 Anticipated (future) and annual production/service and percentage increase and market share
            </Text>
          </View>
          <AnticipatedProductsFormTable items={props.data.anticipated_products.map(item => ({
            export_market_share: item.export_share_market,
            local_market_share: item.local_share_market,
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            percentage_capacity_increased: item.percentage_capacity_increased,
            percentage_unit_increased: item.percentage_unit_increased
          }))} />
          <View style={{ marginTop: 10, marginLeft: 30, marginBottom: 10 }}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              5.3 Raw materials requirements (applicable to manufacturing and agricultural projects only)
            </Text>
          </View>
          <RawMaterialsFormTable items={props.data.raw_materials.map(item => ({
            quantity: item.quantity,
            unit: item.unit,
            name: item.name,
            local_source: item.local_source,
            imported_source: item.import_source
          }))} />
        </>
        <>
          <View style={{ ...styles.flex_r, marginTop: 20, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>7</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: "extrabold", textDecoration: "underline" }}>
              Project Implementation Plan
            </Text>
          </View>
          <Text style={{ ...styles.text_normal, marginLeft: 30, marginBottom: 10, ...styles.boldText }}>7.1 Starting and ending date of the project</Text>
          <View style={styles.flex_r}>
            <FormSmallInput title="Starting Date" value={getCommonDate(new Date(props.data.starting_date))} />
            <FormSmallInput title="Ending Date" value={getCommonDate(new Date(props.data.ending_date))} />
          </View>
          <Text style={{ ...styles.text_normal, marginLeft: 30, marginBottom: 5, marginTop: 10, ...styles.boldText }}>7.2 Detail Activities and implementation time</Text>
          <FormInput title="Project development and feasibility study" value={getCommonDate(props.data.project_impl_plan.project_devt_feasiblility_study)} />
          <FormInput title="Land Acquisition" value={getCommonDate(props.data.project_impl_plan.land_acquisition)} />
          <FormInput title="Building/Civil Work (including for construction material parching order and purchase)" value={getCommonDate(props.data.project_impl_plan.building_civil_work)} />
          <View style={styles.flex_r}>
            <View style={styles.flex_c}>
              <FormSmallInput title="Electricity" value={getCommonDate(props.data.project_impl_plan.public_utility_acquisition.electricity)} />
              <FormSmallInput title="Water" value={getCommonDate(props.data.project_impl_plan.public_utility_acquisition.water)} />
            </View>
            <View style={styles.flex_c}>
              <FormSmallInput title="Telecom" value={getCommonDate(props.data.project_impl_plan.public_utility_acquisition.telecom)} />
              <FormSmallInput title="If others..." value={getCommonDate(props.data.project_impl_plan.public_utility_acquisition.other)} />
            </View>
          </View>
          <FormInput title="Machinery procurement purchase" value={getCommonDate(props.data.project_impl_plan.machinery_procurement_purchase)} />
          <FormInput title="Reaching of machinery at project site" value={getCommonDate(props.data.project_impl_plan.reaching_of_machinery_at_project_site)} />
          <FormInput title="Work permit for technician" value={getCommonDate(props.data.project_impl_plan.work_permit_for_technician)} />
          <FormInput title="Machinery erection installation" value={getCommonDate(props.data.project_impl_plan.machinery_erection_installation)} />
          <FormInput title="Preparation of raw material (order, purchase, import)" value={getCommonDate(props.data.project_impl_plan.preparation_of_raw_material)} />
          <FormInput title="Co missing machines and make ready for operator" value={getCommonDate(props.data.project_impl_plan.co_missing_machines_and_make_ready_for_operator)} />
          <FormInput title="Common cement of product service" value={getCommonDate(props.data.project_impl_plan.common_cement_of_product_service)} />
          <FormInput title="Any other" value={getCommonDate(props.data.project_impl_plan.other)} />
        </>
        <>
          <View style={{ ...styles.flex_r, marginTop: 20, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>8</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: "extrabold", textDecoration: "underline" }}>
              Documents to be attached
            </Text>
          </View>
          <Text style={{ ...styles.text_normal, marginLeft: 30, marginBottom: 5, marginTop: 10, ...styles.boldText }}>
            The following documents should be attached with the application letter
          </Text>
          <FormCheckBox title="Copy of business license" checked={String(props.data.expansion_documents.copy_of_business_license).length > 10} />
          <FormCheckBox title="Summary of financial state ment of the recent two years" checked={String(props.data.expansion_documents.financial_statement).length > 10} />
          <FormCheckBox title="List of Capital goods and basic raw materials" checked={String(props.data.expansion_documents.list_of_capital_good_and_raw_materials).length > 10} />
          <FormCheckBox title="Land lease agreement" checked={String(props.data.expansion_documents.land_lice_agreement).length > 10} />
        </>
        <>
          <View style={{ ...styles.flex_r, marginTop: 20, alignItems: "center" }}>
            <View style={{ ...styles.number_container, marginRight: 5 }}>
              <Text style={styles.number_text}>7</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: "extrabold", textDecoration: "underline" }}>
              Please provide the following information
            </Text>
          </View>
          <FormTextArea title="Main factors influencing project implementation plan and product marketing of the existing project" value={props.data.factors_influencing_plan} />
          <FormTextArea title="What do you intend to do in order to avoid previous problems for the fast and accurate implemtation of the expansion project" value={props.data.how_to_avoid_problems} />
          <FormTextArea title="What kind of basic support that has to be provided by EIC" value={props.data.support_needed_from_eic} />
          <FormTextArea title="Please specify if you have any other comments" value={props.data.other_documents} />
        </>
      </View>
    </Page>
  </Document >
);