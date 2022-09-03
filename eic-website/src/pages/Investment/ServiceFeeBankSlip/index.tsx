import { useEffect } from "react";
import MainPage from "./main";
import { useDispatch } from "react-redux";
import { Actions as BufferActions } from "src/store/States/Buffer";
import routes from "src/routes"

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BufferActions.SetBreadCrumps([
        {
          path: "/",
          title: "Home",
        },
        {
          path: routes.INVESTMENT.NEW_INVESTMENT_PERMIT.ROUTE,
          title: "New Investment Permit",
        },
        {
          path: routes.INVESTMENT.SERVICE_FEE_BANK_SLIP.ROUTE,
          title: "Upload your Bank Slip for Service Fee Payment",
        },
      ])
    );
  }, [dispatch]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <MainPage />
      </div>
    </>
  );
};
