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
    fontSize: 10,
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
  `${new Date().getDate()}/${new Date().getMonth() + 1 > 10
    ? new Date().getMonth() + 1
    : `0${new Date().getMonth() + 1}`
  }/${new Date().getFullYear()}`;

const getRenewDate = () =>
  `${new Date().getDate()}/${new Date().getMonth() + 1 > 10
    ? new Date().getMonth() + 1
    : `0${new Date().getMonth() + 1}`
  }/${new Date().getFullYear() + 1}`;

export const PermitDocument: React.FC<Props> = (props) => (
  <Document>
    <Page size="A4" style={{ ...styles.flex_c, padding: 15 }} fixed>
      <View style={{ ...styles.flex_c, ...styles.flex_both_center }}>
        <View style={{ ...styles.flex_r, alignItems: "center" }}>
          <Image style={styles.image} src="/static/images/eic/eic-logo.jpg" />
          <Text style={styles.h1}>EIC</Text>
        </View>
        <Text style={{ ...styles.text_h1, ...styles.text_amh }}>
        የባንክ ሂሳብ ለመፍጠር የባንክ ድጋፍ ደብዳቤ
        </Text>
        <Text style={styles.text_title}>
          Bank Support Letter for Createing a Bank Account
        </Text>
      </View>
      <View style={styles.flex_c}>
        <View style={styles.flex_c}>
          <Text style={styles.text_normal}>{getCurrentDate()}</Text>
          <Text style={styles.text_normal}>{props.data.manager_full_name}</Text>
          <Text style={styles.text_normal}>{`${props.data.company_address.zone} ${props.data.company_address.region}`}</Text>
          <Text style={styles.text_normal}>{`${props.data.company_address.city}`}</Text>
          <Text style={styles.text_normal}>{`${props.data.company_address.telephone_mobile}`}</Text>
          <Text style={styles.text_normal}>{`${props.data.company_address.email}`}</Text>
        </View>
        <Text style={{ marginTop: 20, ...styles.text_normal }}>
          Dear [Mr./Ms.] {props.data.manager_full_name},
        </Text>
        <Text style={{ marginTop: 15, ...styles.text_normal }}>
          My name is {props.data.company_name}, and I’m writing in support of my application for the Investment Banking Associate position at David Blair & Company.
          While a Bachelor’s Degree in Finance and a Master’s Degree in Business Administration have given me the fundamental knowledge necessary to be a successful investment banker,
          it’s the 2+ years at LTA Inc that’s significantly furthered my expertise.
        </Text>
        <Text style={{ marginTop: 15, ...styles.text_normal }}>
          Over the last 2 years as an analyst in the M&A division at LTA Inc, I’ve contribute meaningfully to 6 M&A deals totaling in excess of $3.8 billion,
          serving as the lead analyst in 3 of these deals. Apart from being integrally involved in valuation and financial modeling for these deals, I was also responsible for maintaining
          pitch books and ensuring that all stakeholders, both internal and external, had all the information they needed at the right time.
        </Text>
        <Text style={{ marginTop: 15, ...styles.text_normal }}>
          Sincerely,
        </Text>
        <Text style={{ marginTop: 5, ...styles.text_normal }}>
          {props.data.manager_full_name}
        </Text>
      </View>
    </Page>
  </Document>
);