/* eslint-disable */
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
import { getCalenderDate } from "src/helpers/getDateTime";

const dateToString = formatWithOptions({}, "MMM DD, YYYY");

// Create styles
const permit_styles = StyleSheet.create({
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
    width: 60,
    height: 60,
  },
  text: {
    fontSize: 9,
    textOverflow: "ellipsis",
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

export const MainDocument: React.FC<MainProps> = ({ data, users }) => {
  const [customData, setCustomData] = useState({});
  useEffect(() => {
    users.forEach((item) => {
      if (String(data.investor_id) === String(item.service_id)) {
        setCustomData({
          investor_name: `${item.first_name} ${item.last_name}`,
          home_country: data.home_address
            ? data.home_address.country
              ? data.home_address.country
              : ""
            : "",
        });
      }
    });
  }, [data, users]);

  return (
    <PermitDocument
      data={{
        ...data,
        ...customData,
      }}
    />
  );
};

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

const FormTextArea: FC<{
  title: string;
  value: string;
  index: number;
  Component?: any;
}> = (props) => (
  <View style={{ ...styles.flex_c, marginTop: 10, justifyContent: "center" }}>
    <View style={{ ...styles.flex_r, alignItems: "center" }}>
      <View style={{ ...styles.number_container, marginRight: 5 }}>
        <Text style={styles.number_text}>{props.index}</Text>
      </View>
      <View style={styles.flex_c}>
        <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
          {props.title}
        </Text>
      </View>
    </View>
    <View style={{ ...styles.box_input, height: 50, marginLeft: 27 }}>
      <Text style={{ ...styles.text_normal, ...styles.text_amh }}>
        {props.value}
      </Text>
    </View>
  </View>
);

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

const hasProjectStatus = (status: string, project_status: string[]) => {
  return (
    project_status.findIndex((item) => String(item) === String(status)) >= 0
  );
};

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
              የሃገር ውስጥ ባለሀብት የኢንቨስትመንት እድሳት ፍቃድ
            </Text>
            <Text style={styles.text_title}>
              INVESTMENT RENEWAL PERMIT FOR LOCAL INVESTOR
            </Text>
          </>
        ) : (
          <>
            <Text style={{ ...styles.text_h1, ...styles.text_amh }}>
              የውጪ ሀገር ባለሀብት የኢንቨስትመንት እድሳት ፍቃድ
            </Text>
            <Text style={styles.text_title}>
              INVESTMENT RENEWAL PERMIT FOR FOREIGN INVESTOR
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
        <FormInputNew
          index={2}
          title="Investment Activity"
          value={props.data.investment_activity}
        />
        <FormInputNew
          index={3}
          title="Project Location"
          value={`${props.data.investment_address.region}, ${props.data.investment_address.city}`}
        />
        <View style={{ ...styles.flex_r, marginTop: 10, alignItems: "center" }}>
          <View style={{ ...styles.number_container, marginRight: 5 }}>
            <Text style={styles.number_text}>4</Text>
          </View>
          <Text style={styles.text_normal}>Project Status</Text>
        </View>
        <View style={styles.flex_r}>
          <View style={styles.flex_c}>
            <FormCheckBox
              title="Pre-Implementation"
              checked={hasProjectStatus(
                "Pre-Implementation",
                props.data.project_status
              )}
            />
            <FormCheckBox
              title="Processing land acquisition"
              checked={hasProjectStatus(
                "Processing land acquisition",
                props.data.project_status
              )}
            />
            <FormCheckBox
              title="Civil Works contruction"
              checked={hasProjectStatus(
                "Civil Works contruction",
                props.data.project_status
              )}
            />
            <FormCheckBox
              title="Machinery Procurement"
              checked={hasProjectStatus(
                "Machinery Procurement",
                props.data.project_status
              )}
            />
          </View>
          <View style={styles.flex_c}>
            <FormCheckBox
              title="Machinery Erecting/Installation"
              checked={hasProjectStatus(
                "Machinery Erecting/Installation",
                props.data.project_status
              )}
            />
            <FormCheckBox
              title="Preparation for production/services"
              checked={hasProjectStatus(
                "Preparation for production/services",
                props.data.project_status
              )}
            />
            <FormCheckBox
              title="Others"
              checked={hasProjectStatus("Others", props.data.project_status)}
            />
          </View>
        </View>
        <FormTextArea
          index={5}
          title="Indicate major problems encountered (if any)"
          value={props.data.problems_encountered}
        />
        <FormInputNew
          index={6}
          title="Expected date of commencement of production/service of project"
          value={getCalenderDate(new Date(props.data.date_of_commencement))}
        />
      </View>
    </Page>
  </Document>
);
