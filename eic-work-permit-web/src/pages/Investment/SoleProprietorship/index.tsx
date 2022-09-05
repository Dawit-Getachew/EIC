/* eslint-disable */
import { useState, useEffect } from "react";
import MainPage from "./main";
import { useDispatch } from "react-redux";
import { Actions as BufferActions } from "src/store/States/Buffer";

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
          path: "/invest/new",
          title: "New Investment Permit",
        },
      ])
    );
  }, [dispatch]);

  return <MainPage />;
};
