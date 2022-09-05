/* eslint-disable */
import { useState, useEffect } from "react";
import IntroPage from "./IntroPage";
import MainPage from "./main";
import { useDispatch } from "react-redux";
import { Actions as BufferActions } from "src/store/States/Buffer";

export default () => {
  const [hasBegan, setHasBegan] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BufferActions.SetBreadCrumps([
        {
          path: "/",
          title: "Home",
        },
        {
          path: "/invest/new",
          title: "New Work Permit",
        },
      ])
    );
  }, [dispatch]);

  return (
    <>
      <div style={{ display: hasBegan ? "none" : "flex" }}>
        <IntroPage closePage={() => setHasBegan(true)} />
      </div>
      <div style={{ display: hasBegan ? "flex" : "none" }}>
        <MainPage />
      </div>
    </>
  );
};
