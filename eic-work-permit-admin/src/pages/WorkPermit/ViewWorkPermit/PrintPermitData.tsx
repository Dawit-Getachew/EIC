import { FC } from "react"
import { Document, Page, Text, View, StyleSheet, Font, PDFViewer, Image } from '@react-pdf/renderer';
import { styles as permit_styles } from './PrintPermit'
import { getCommonDate } from "src/store/Helpers/date"

Font.register({
  family: "Noto Serif",
  src: "/static/fonts/Noto_Serif_Ethiopic/static/NotoSerifEthiopic/NotoSerifEthiopic-Regular.ttf"
})

export const styles = StyleSheet.create({
  ...permit_styles,
  h1: {
    fontSize: 32
  },
  h2: {
    fontSize: 18
  },
  h3: {
    fontSize: 12
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

export const FormInputNew: FC<{ index: number, title: string, value: string, style?: any }> = (props) => (
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

export const FormTextArea: FC<{ title: string, value: string, index: number, Component?: any }> = (props) => (
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

export const FormSmallInput: FC<{ title: string, value: string, style?: any }> = (props) => (
  <View style={{ ...styles.flex_c, marginLeft: 30, marginTop: 5, alignItems: "flex-start", justifyContent: "center", ...(props.style ? props.style : {}) }}>
    <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.title}</Text>
    <View style={{ ...styles.box_input, width: 150 }}>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>{props.value}</Text>
    </View>
  </View>
)

export const FormCheckBox: FC<{ title: string, checked?: boolean, noBorder?: boolean }> = (props) => (
  <View style={{ ...styles.flex_r, alignItems: "center", marginLeft: 30, marginBottom: 5 }}>
    <View style={{ ...(props.noBorder ? {} : styles.box_checkbox), marginRight: 5 }}>
      {props.checked && <View style={{ width: 10, height: 10, backgroundColor: "black", borderRadius: 50, marginLeft: -19 }}></View>}
    </View>
    <Text style={styles.text_normal}>{props.title}</Text>
  </View>
)

const EmployeesFormTable: FC<{
  items: {
    name: string;
    age: string;
    gender: string;
    full_address: string;
    description_of_academic_credentials_and_experience: string
  }[]
}> = (props) => (
  <View style={styles.tableContainer}>
    <View style={styles.flex_r}>
      <View style={{ ...styles.tableItem, width: 40 }}>
        <Text style={styles.text_normal}>NO</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Employee Name</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Age</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Gender</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Full Address</Text>
      </View>
      <View style={{ ...styles.tableItem }}>
        <Text style={styles.text_normal}>Description of Academic Credtials</Text>
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
          <Text style={styles.text_normal}>{item.age}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.gender}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.tableItemNoRight, ...styles.tableItemNoLeft, ...styles.flex_c, width: 110 }}>
          <Text style={styles.text_normal}>{item.full_address}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.description_of_academic_credentials_and_experience}</Text>
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
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].age}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoLeft, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].gender}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.tableItemNoRight, ...styles.tableItemNoLeft, ...styles.flex_c, width: 110 }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].full_address}</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.flex_c }}>
        <Text style={styles.text_normal}>{props.items[props.items.length - 1].description_of_academic_credentials_and_experience}</Text>
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
            <Text style={{ ...styles.h3, ...styles.text_underline }}>Work Permit Application Form</Text>
          </View>
        </View>
        <Text style={{ ...styles.text_normal, marginTop: 15, marginBottom: 15 }}>
          Note: This form is designed to register new work permits in Ethiopia. Before youstart filling this form, please ensure that
          you have all information and documents necessary for this process. Please fill in all requierd information
          to make the registration process as quick and seamless as possible. Thank you
        </Text>
        <FormInputNew index={1} title="Name of the Company" value={props.data.company_name} />
        <View style={{ ...styles.flex_r, alignItems: "center", marginTop: 20 }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>2</Text>
          </View>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Address of the Business Organization (የንግድ ድርጅቱ አድራሻ)</Text>
        </View>
        <View style={styles.flex_r}>
          <View style={styles.flex_c}>
            <FormSmallInput title="Region" value={props.data.company_region} />
            <FormSmallInput title="Zone / Sub-City" value={props.data.company_zone} />
            <FormSmallInput title="City" value={props.data.company_city} />
            <FormSmallInput title="Wereda" value={props.data.company_wereda} />
          </View>
          <View style={styles.flex_c}>
            <FormSmallInput title="House Number" value={props.data.company_house_number} />
            <FormSmallInput title="Tel. No" value={props.data.company_telephone_direct} />
            <FormSmallInput title="P.O. Box" value={props.data.company_po_box} />
            <FormSmallInput title="Fax" value={props.data.company_fax} />
          </View>
        </View>
        <FormInputNew index={3} title="Nationality / Country of incorporation of enterprise" value={props.data.country_of_incorporation} />
        <FormInputNew index={4} title="Investment / Business activity" value={props.data.business_activity} />
        <FormInputNew index={5} title="Business location of enterprise" value={props.data.business_location} />
        <FormInputNew index={6} title="Capital of enterprise" value={props.data.capital_of_enterprise} />
        <FormInputNew index={7} title="Investment permit" value={props.data.investment_permit_license_number} />
        <FormInputNew index={8} title="Investment Permit Date of Issue" value={getCommonDate(props.data.date_of_issuance)} />
        <FormInputNew index={7} title="Business License Number" value={props.data.business_license_number} />
        <FormInputNew index={8} title="Business License Date of Issue" value={getCommonDate(props.data.business_license_date_of_issuance)} />
        <FormInputNew index={7} title="Expansion License Number" value={props.data.expansion_license_number} />
        <FormInputNew index={8} title="Expansion License Date of Issue" value={getCommonDate(props.data.expansion_license_date_of_issuance)} />
        <FormInputNew index={9} title="Expansion license number, date of issuance (if any)" value={props.data.expansion_license_number} />
        <FormInputNew index={7} title="Tin Number" value={props.data.tin_number} />
        <FormInputNew index={10} title="Total number of employees in enterprise (current)" value={props.data.current_total_number_of_expansion} />
        <FormInputNew index={11} title="Total number of expats (current)" value={props.data.current_total_number_of_expats} />
        <FormInputNew index={12} title="Total number of Ethiopian employees in permanent positions (current)" value={props.data.current_number_of_permanent_eth_employees} />
        <FormInputNew index={13} title="Total number of Ethiopian employees holding management posts (current)" value={props.data.current_number_of_holding_eth_management_posts} />
        <View style={{ ...styles.flex_r, alignItems: "center", marginTop: 20 }}>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Bio Data & Position to be Occupied by the Expat</Text>
        </View>
        <FormInputNew index={14} title="Full name" value={props.data.full_name} />
        <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>14</Text>
          </View>
          <Text style={styles.text_normal}>Gender</Text>
        </View>
        <View style={styles.flex_r}>
          <FormCheckBox title="Male" checked={props.data.gender === "Male"} />
          <FormCheckBox title="Female" checked={props.data.gender === "Female"} />
        </View>
        <FormInputNew index={15} title="Date of Birth" value={getCommonDate(props.data.date_of_birth)} />
        <FormInputNew index={16} title="Nationality" value={props.data.nationality} />
        <FormInputNew index={17} title="Passport No." value={props.data.passport_number} />
        <FormInputNew index={18} title="Passport Valid until" value={getCommonDate(props.data.passport_valid_until)} />
        <FormInputNew index={19} title="Visa Type" value={props.data.visa_type} />
        <FormInputNew index={20} title="Visa date of Issue" value={getCommonDate(props.data.visa_date_of_issue)} />
        <FormInputNew index={21} title="Visa Valid Until" value={getCommonDate(props.data.visa_valid_until_till)} />
        <FormInputNew index={22} title="Title of professional line, position to be occupied by expat" value={props.data.title_to_be_occupied_by_expat} />
        <FormInputNew index={23} title="Project phase for which expat employment is sought" value={props.data.project_phase_expat_employment_is_sought} />
        <FormInputNew index={24} title="Agreed length of employment per the employment contract" value={props.data.agreed_length_of_empl_per_empl_contract} />
        <View style={{ ...styles.flex_r, alignItems: "center", marginTop: 20 }}>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Qualifications of Expat</Text>
        </View>
        <FormInputNew index={25} title="Education" value={props.data.education_level} />
        <FormInputNew index={26} title="Professional skill" value={props.data.professional_skill} />
        <FormInputNew index={27} title="Years of work experience" value={props.data.years_of_experiance} />
        <FormInputNew index={28} title="Expected date of employment" value={getCommonDate(props.data.expected_date_of_employment)} />
        <FormInputNew index={29} title="Basic salary (in Birr)" value={props.data.basic_salary_in_birr} />
        <FormInputNew index={30} title="Monthly allowance (in Birr)" value={props.data.monthly_allowance_in_birr} />
        <View style={{ ...styles.flex_r, alignItems: "center", marginTop: 20 }}>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Certification</Text>
        </View>
        <FormInputNew index={31} title="Name" value={props.data.certification_name} />
        <FormInputNew index={32} title="Title" value={props.data.certification_title} />
        <FormInputNew index={32} title="Date" value={getCommonDate(props.data.certification_date)} />
        <View style={{ ...styles.flex_r, alignItems: "center", marginTop: 20 }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>33</Text>
          </View>
          <Text style={{ ...styles.text_normal, ...styles.text_amh }}>Particulars of Ethiopian Replacement Employee</Text>
        </View>
        <EmployeesFormTable items={props.data.replacement_employees} />
      </Page>
    </Document >
  )
}

export const MainDocument = () => (
  <PDFViewer>
    <MainDocument />
  </PDFViewer>
)