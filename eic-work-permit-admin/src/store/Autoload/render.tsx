import React, { useEffect } from "react";
import routes from "src/constants/routes";
import { useNavigate } from "react-router";
import { isAuthenticated } from "src/store/States/Buffer";
import { useSelector, useDispatch } from "react-redux"
import { Actions as BufferActions } from "src/store/States/Buffer"
import { FetchUserInfoBySession } from "../States/Auth/actions";
import { FetchAllUsers } from "../States/User/action";

const Loader = (props: any) => {
  const navigate = useNavigate();
  const isAuthenticatedValue = useSelector(isAuthenticated)
  const dispatch = useDispatch()
  useEffect(() => {
    FetchAllUsers((err, data) => {
      if (err) throw err
      dispatch(BufferActions.SetAllUsers(data))
    })

    FetchUserInfoBySession({}, (err: any, data: any) => {
      if (err) throw err
      dispatch(BufferActions.SetUserRole(data.role))
      dispatch(BufferActions.SetServiceID(data.service_id))
      dispatch(BufferActions.SetUserObject(data))
    })
  }, [dispatch])

  useEffect(() => {
    if (!isAuthenticatedValue) {
      navigate(routes.AUTH.LOGIN.ROUTE, {replace: true })
    }
  }, [isAuthenticatedValue]);

  return <></>;
};

export default Loader
