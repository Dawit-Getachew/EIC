import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container, Modal } from "@mui/material";
import Footer from "src/components/Footer";
import InvestmentPermits from "./InvestmentPermits";
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { API, Actions, Selectors } from "src/store/States/Investment/InvestmentPermit";
import { API as InvestmentPermitAmmendmentAPI, Actions as InvestmentPermitAmmendmentActions, Selectors as InvestmentPermitAmmendmentSelectors } from "src/store/States/Investment/InvestmentPermitAmmendment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IRoleAccount, InvestmentPermitStatus } from "src/common/enums"

function ApplicationsInvestmentPermits() {
  const investment_permits = useSelector(Selectors.selectInvestmentPermits);
  const investment_permits_ammendments = useSelector(InvestmentPermitAmmendmentSelectors.selectInvestmentPermitAmmendments);
  const [rows, setRows] = useState([])
  const dispatch = useDispatch();
  const user_role = useSelector(BufferSelectors.selectUserRole)
  useEffect(() => {
    API.FetchInvestmentPermits({}, (err, data) => {
      if (err) throw err;
      dispatch(Actions.setInvestmentPermits(data));
    });

    InvestmentPermitAmmendmentAPI.FetchInvestmentPermitAmmendments({}, (err, data) => {
      if (err) throw err
      dispatch(InvestmentPermitAmmendmentActions.setInvestmentPermitAmmendments(data))
    })
  }, [dispatch]);

  useEffect(() => {
    const items = []
    investment_permits_ammendments.forEach(item => {
      const foundIndex = investment_permits.findIndex(prop => String(prop._id) === String(item.investment_id))
      if (foundIndex >= 0) items.push({
        ...investment_permits[foundIndex],
        _id: item._id,
        investment_id: investment_permits[foundIndex]._id,
        permit_status: item.permit_status,
        company_name: item.company_name,
        company_name_amharic: item.company_name_amharic,
        trade_name: item.trade_name,
        trade_name_amharic: item.trade_name_amharic,
      })
    })
    setRows(items)
  }, [investment_permits, investment_permits_ammendments])

  const filter_permits = (role: string, permits: any[]) => {
    console.log("lolz", permits)
    switch(role) {
      case IRoleAccount.TEAM_LEADER: {
        return permits.filter((item: any) => String(item.permit_status) === InvestmentPermitStatus.REVIEWED ||  String(item.permit_status) === InvestmentPermitStatus.VERIFIED)
      }

      case IRoleAccount.DIRECTOR: {
        return permits.filter((item: any) => String(item.permit_status) === InvestmentPermitStatus.VERIFIED ||  String(item.permit_status) === InvestmentPermitStatus.APPROVED)
      }

      default: {
        return []
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Investment Permit Amendments</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <InvestmentPermits investment_permits={filter_permits(user_role, rows)} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsInvestmentPermits;
