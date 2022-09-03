import React, { useEffect } from "react";
import routes from "src/constants/routes";
import { useNavigate } from "react-router";
import { isAuthenticated } from "src/store/States/Buffer";
import { useSelector, useDispatch } from "react-redux"
import { Actions as BufferActions, selectServiceID } from "src/store/States/Buffer"
import { FetchUserInfoBySession } from "../States/Auth/actions";
import { API as NotificationAPI, Actions as NotificationActions } from "../States/Notification/"

const Loader = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const service_id = useSelector(selectServiceID)
  useEffect(() => {
    FetchUserInfoBySession({}, (err: any, data: any) => {
      if (err) throw err
      dispatch(BufferActions.SetServiceID(data.service_id))
      dispatch(BufferActions.SetUserObject(data))
    })

    NotificationAPI.FetchNotifications((err, data) => {
      if (err) throw err
      dispatch(NotificationActions.setNotifications(data.filter(item => String(service_id) === String(item.service_id))))
    })
  }, [dispatch])

  return <></>;
};

export default Loader
