import React, { FC, useEffect, useState } from "react";
import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import "./styles.css";
import { FetchAllUsers } from "src/store/States/User/action";
import {
  getCurrentEthiopianDate,
  getRenewedEthiopianDate,
} from "src/helpers/amharic_date";
import { parse, formatWithOptions } from "date-fns/fp";

const dateToString = formatWithOptions({}, "MMM DD, YYYY");

// Create styles
export const permit_styles = StyleSheet.create({
  flex_justify_end: {
    display: "flex",
    justifyContent: "flex-end",
  },
  flex_align_end: {
    display: "flex",
    alignItems: "flex-end",
  },
  flex_justify_start: {
    display: "flex",
    justifyContent: "flex-start",
  },
  flex_justify_between: {
    display: "flex",
    justifyContent: "space-between",
  },
  flex_justify_center: {
    display: "flex",
    justifyContent: "center",
  },
  flex_align_center: {
    display: "flex",
    alignItems: "center",
  },
  flex_both_center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  flex_JEND_ASTART: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  flex_JSTART_AEND: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    height: "100%",
  },
  flex_JEND_AEND: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "100%",
  },
  flex_JBET_AEND: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
    flexDirection: "column",
  },
  flex_r: {
    display: "flex",
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: 50,
    height: 50,
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
    fontFamily: "Noto Serif",
  },
  boldText: {
    marginLeft: 20,
    marginRight: 10,
    fontSize: 13,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  pdf_box: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
  },
  formItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  formMiniItem: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "50%",
  },
});

const styles = StyleSheet.create({
  ...permit_styles,
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 18,
  },
  h3: {
    fontSize: 14,
  },
  text_underline: {
    textDecoration: "underline",
  },
  text_normal: {
    fontSize: 9,
  },
  number_container: {
    backgroundColor: "#4f4646",
    display: "flex",
    alignItems: "center",
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: "center",
  },
  number_text: {
    color: "white",
    fontSize: 9,
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
    marginTop: 5,
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
    marginTop: 5,
  },
  tableContainer: {
    marginLeft: 30,
    marginTop: 20,
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
    borderRightWidth: 0,
  },
  tableItemNoLeft: {
    borderLeftWidth: 0,
  },
  tableItemNoTop: {
    borderTopWidth: 0,
  },
  tableFooter: {
    borderBottomWidth: 1,
  },
  pageBreak: {
    marginBottom: 100,
  },
});

// Create Document Component
interface MainProps {
  data: any;
  users: any[];
}

interface Props {
  data: any;
}

Font.register({
  family: "Noto Serif",
  src: "/static/fonts/Noto_Serif_Ethiopic/static/NotoSerifEthiopic/NotoSerifEthiopic-Regular.ttf",
});
const getCurrentDate = () =>
  `${new Date().getDate()}/${
    new Date().getMonth() + 1 > 10
      ? new Date().getMonth() + 1
      : `0${new Date().getMonth() + 1}`
  }/${new Date().getFullYear()}`;

const getRenewDate = () =>
  `${new Date().getDate()}/${
    new Date().getMonth() + 1 > 10
      ? new Date().getMonth() + 1
      : `0${new Date().getMonth() + 1}`
  }/${new Date().getFullYear() + 1}`;

const FormCheckBox: FC<{ title: string; checked?: boolean }> = (props) => (
  <View
    style={{
      ...styles.flex_r,
      alignItems: "center",
      marginLeft: 30,
      marginBottom: 5,
    }}
  >
    <View style={{ ...styles.box_checkbox, marginRight: 5 }}>
      {props.checked && (
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: "black",
            borderRadius: 50,
            marginLeft: -19,
          }}
        ></View>
      )}
    </View>
    <Text style={styles.text_normal}>{props.title}</Text>
  </View>
);

const FormInputNew: FC<{
  index: number;
  title: string;
  value: string;
  style?: any;
}> = (props) => (
  <View style={{ ...styles.flex_c, marginTop: 10, ...props.style }}>
    <View style={{ ...styles.flex_r, alignItems: "center" }}>
      <View style={{ ...styles.number_container, marginRight: 5 }}>
        <Text style={styles.number_text}>{props.index}</Text>
      </View>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
        {props.title}
      </Text>
    </View>
    <View style={{ ...styles.box_input, marginLeft: 30 }}>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
        {props.value}
      </Text>
    </View>
  </View>
);

const FormInput: FC<{ title: string; value: string }> = (props) => (
  <View style={{ ...styles.flex_c, marginLeft: 30, marginTop: 5 }}>
    <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
      {props.title}
    </Text>
    <View style={styles.box_input}>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
        {props.value}
      </Text>
    </View>
  </View>
);

const ShareholdersFormTable: FC<{
  items: {
    name: string;
    nationality: string;
    country: string;
    address: string;
  }[];
}> = (props) => (
  <View style={styles.tableContainer}>
    <View style={styles.flex_r}>
      <View style={styles.tableItem}>
        <Text style={styles.text_normal}>Name</Text>
      </View>
      <View style={{ ...styles.tableItem, ...styles.tableItemNoLeft }}>
        <Text style={styles.text_normal}>Nationality</Text>
      </View>
      <View
        style={{
          ...styles.tableItem,
          ...styles.tableItemNoRight,
          ...styles.tableItemNoLeft,
        }}
      >
        <Text style={styles.text_normal}>Country of Incorporation</Text>
      </View>
      <View style={{ ...styles.tableItem }}>
        <Text style={styles.text_normal}>Address</Text>
      </View>
    </View>
    {props.items.slice(0, props.items.length - 1).map((item) => (
      <View style={styles.flex_r} key={item.name}>
        <View style={{ ...styles.tableItem, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.name}</Text>
        </View>
        <View
          style={{
            ...styles.tableItem,
            ...styles.tableItemNoLeft,
            ...styles.flex_c,
          }}
        >
          <Text style={styles.text_normal}>{item.nationality}</Text>
        </View>
        <View
          style={{
            ...styles.tableItem,
            ...styles.tableItemNoRight,
            ...styles.tableItemNoLeft,
            ...styles.flex_c,
            width: 110,
          }}
        >
          <Text style={styles.text_normal}>{item.country}</Text>
        </View>
        <View style={{ ...styles.tableItem, ...styles.flex_c }}>
          <Text style={styles.text_normal}>{item.address}</Text>
        </View>
      </View>
    ))}
    <View style={styles.flex_r}>
      <View
        style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.flex_c }}
      >
        <Text style={styles.text_normal}>
          {props.items[props.items.length - 1].name}
        </Text>
      </View>
      <View
        style={{
          ...styles.tableItem,
          ...styles.tableFooter,
          ...styles.tableItemNoLeft,
          ...styles.flex_c,
        }}
      >
        <Text style={styles.text_normal}>
          {props.items[props.items.length - 1].nationality}
        </Text>
      </View>
      <View
        style={{
          ...styles.tableItem,
          ...styles.tableFooter,
          ...styles.tableItemNoRight,
          ...styles.tableItemNoLeft,
          ...styles.flex_c,
          width: 110,
        }}
      >
        <Text style={styles.text_normal}>
          {props.items[props.items.length - 1].country}
        </Text>
      </View>
      <View
        style={{ ...styles.tableItem, ...styles.tableFooter, ...styles.flex_c }}
      >
        <Text style={styles.text_normal}>
          {props.items[props.items.length - 1].address}
        </Text>
      </View>
    </View>
  </View>
);

export const PermitDocument: React.FC<Props> = (props) => (
  <Document>
    <Page size="A4" style={{ ...styles.flex_c, padding: 15 }} fixed>
      <View style={{ ...styles.flex_c, ...styles.flex_both_center }}>
        <View style={{ ...styles.flex_r, alignItems: "center" }}>
          <Image style={styles.image} src="/static/images/eic/eic-logo.jpg" />
          <Text style={styles.h1}>EIC</Text>
        </View>

        {props.data.type_of_ownership === "Domestic Investor" ? (
          <>
            <Text style={{ ...styles.text_h1, ...styles.text_amh }}>
              የሃገር ውስጥ ባለሀብት የኢንቨስትመንት ማሻሻያ ፍቃድ
            </Text>
            <Text style={styles.text_title}>
              INVESTMENT AMENDMENT PERMIT FOR LOCAL INVESTOR
            </Text>
          </>
        ) : (
          <>
            <Text style={{ ...styles.text_h1, ...styles.text_amh }}>
              የውጪ ሀገር ባለሀብት የኢንቨስትመንት ማሻሻያ ፍቃድ
            </Text>
            <Text style={styles.text_title}>
              INVESTMENT AMENDMENT PERMIT FOR FOREIGN INVESTOR
            </Text>
          </>
        )}
      </View>
      <View style={styles.flex_c}>
        <FormInputNew
          index={1}
          title="Investor/Company Name"
          value={props.data.company_name}
        />
        <FormInput title="የድርጅቱ ስም" value={props.data.trade_name} />
        <FormInputNew
          index={2}
          title="Trade Name of the Company"
          value={props.data.trade_name_amharic}
        />
        <FormInput title="የንግድ ስም" value={props.data.trade_name} />
        <FormInputNew
          index={3}
          title="Type of Business"
          value={props.data.type_of_business}
        />
        <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>4</Text>
          </View>
          <Text style={styles.text_normal}>Type of Ownership</Text>
        </View>
        <View style={styles.flex_r}>
          <View style={styles.flex_c}>
            <FormCheckBox
              title="Domestic Investor"
              checked={props.data.type_of_ownership === "Domestic Investor"}
            />
            <FormCheckBox
              title="Joint Investment (Foreign and Local Investment)"
              checked={
                props.data.type_of_ownership ===
                "Joint Investment (Foreign and Local Investment)"
              }
            />
          </View>
          <View style={styles.flex_c}>
            <FormCheckBox
              title="Foreign Investor"
              checked={props.data.type_of_ownership === "Foreign Investor"}
            />
            <FormCheckBox
              title="Branch"
              checked={props.data.type_of_ownership === "Branch"}
            />
          </View>
        </View>
        <View style={{ ...styles.flex_r, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>5</Text>
          </View>
          <Text style={styles.text_normal}>Name of Shareholders</Text>
        </View>
        <ShareholdersFormTable
          items={props.data.shareholders.map((item) => ({
            name: item.name,
            nationality: item.nationality,
            country: item.country_of_incorporation,
            address: item.address,
          }))}
        />
        <FormInputNew
          index={6}
          title="Full Name of the Manager"
          value={props.data.manager_full_name}
        />
        <FormInput
          title="የሥራ አስኪያጅ ስም"
          value={props.data.manager_full_name_amharic}
        />
        <FormInputNew
          index={6}
          title="Amount of investment capital (in United States Dollar and Ethiopian Birr)"
          value={`USD ${props.data.investment_capital_usd}`}
        />
        <FormInput
          title=""
          value={`Br ${props.data.investment_capital_birr}`}
        />
      </View>
    </Page>
  </Document>
);

const PrintPermit = () => {
  let selectedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer);
  const [users, setUsers] = useState([]);
  const [mainData, setMainData] = useState({});
  useEffect(() => {
    FetchAllUsers((err, data) => {
      if (err) throw err;
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    const foundIndex = users.findIndex(
      (user) => user.service_id === selectedBuffer.service_id
    );
    setMainData({
      ...selectedBuffer,
      ref_number: selectedBuffer.ref_number ? selectedBuffer.ref_number : "",
      investor_name:
        foundIndex >= 0
          ? `${users[foundIndex].first_name} ${users[foundIndex].middle_name} ${users[foundIndex].last_name}`
          : "",
      home_country: selectedBuffer.home_address.country,
      home_region: selectedBuffer.home_address.region,
      home_city: selectedBuffer.home_address.city,
      home_wereda: selectedBuffer.home_address.sub_city,
      home_kebele: selectedBuffer.home_address.zone,
      home_house_number: selectedBuffer.home_address.house_number,
      investment_region: selectedBuffer.investment_address.region,
      investment_city: selectedBuffer.investment_address.city,
    });
  }, [users, selectedBuffer, setMainData]);
  return (
    <PDFViewer>
      <PermitDocument data={mainData} />
    </PDFViewer>
  );
};

export default PrintPermit;
