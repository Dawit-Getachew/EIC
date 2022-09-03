import { ChangeEventHandler, FormEventHandler, useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  Grid, Container, Card, Typography, Avatar, Button, CircularProgress
} from "@mui/material";
import Footer from "src/components/Footer";
import UserDetails from "./UserDetails";
import NotificationsActive from "@mui/icons-material/NotificationsActive";
import Money from "@mui/icons-material/Money";
import Upload from "@mui/icons-material/Upload";
import { useDispatch, useSelector } from "react-redux";
import { Actions as BufferActions, Selectors as BufferSelectors } from "src/store/States/Buffer";
import { Selectors as WorkPermitSelectors } from "src/store/States/InvestmentPermit/"
import { uploadFile } from "src/store/States/Helpers/Services/upload"
import {
  ChangeProfilePicture, ChangeUserBasicProfile, ChangeUserEmail, ChangeUserPhoneNumber,
  ChangeUserPassword
} from "src/store/States/User/action"
import "./style.css";

function UserProfile() {
  const userObj = useSelector(BufferSelectors.selectUserObject)
  const investment_permits = useSelector(WorkPermitSelectors.selectInvestmentPermits)
  const user = {
    name: `${userObj.first_name} ${userObj.last_name}`,
    avatar: `${userObj.profile_picture}`,
    jobtitle: "Investor",
  };
  const dispatch = useDispatch();

  const [pictureFormData, setPictureFormData] = useState<any>(null);
  const [pictureFormBlob, setPictureFormBlob] = useState<any>(null);
  const [isProfilePictureLoading, setIsProfilePictureLoading] = useState<boolean>(false)
  const [isBasicProfileLoading, setIsBasicProfileLoading] = useState<boolean>(false)

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      if (event.target.files[0]) {
        setPictureFormData(event.target.files[0])
        setPictureFormBlob(URL.createObjectURL(event.target.files[0]))
      }
    }
  }

  useEffect(() => {
    const updateProfilePicture = async (formData: any) => {
      const profile_picture = await uploadFile(formData)
      if (String(profile_picture).length > 10) {
        ChangeProfilePicture({
          _id: userObj._id,
          profile_picture
        }, (err, data) => {
          if (err) throw err
          setIsProfilePictureLoading(false)
        })
      }
    }
    if (pictureFormData) {
      setIsProfilePictureLoading(true)
      updateProfilePicture(pictureFormData)
      console.log("once")
    }
  }, [pictureFormData])

  useEffect(() => {
    dispatch(
      BufferActions.SetBreadCrumps([
        {
          path: "/",
          title: "Home",
        },
        {
          path: "/user/profile",
          title: "User Profile",
        },
      ])
    );
  }, []);

  const [totalWorkPermits, setTotalWorkPermits] = useState<number>(0)
  const [totalMoneyInvested, setTotalMoneyInvested] = useState<number>(0)

  useEffect(() => {
    if (investment_permits) {
      setTotalWorkPermits(investment_permits.length)
      let totalAmount = 0
      investment_permits.forEach((permit: any) => {
        totalAmount += Number(permit.investment_capital_birr)
      })
      setTotalMoneyInvested(totalAmount)
    }
  }, [investment_permits, setTotalWorkPermits, setTotalMoneyInvested])

  const [basicFormData, setBasicFormData] = useState<any>({})
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setBasicFormData({
      ...basicFormData,
      [event.target.name]: event.target.value
    })
  }

  const handleBasicUserProfileSubmit = () => {
    setIsBasicProfileLoading(true)
    ChangeUserBasicProfile({
      _id: userObj._id,
      first_name: basicFormData.first_name ? basicFormData.first_name : userObj.first_name,
      last_name: basicFormData.last_name ? basicFormData.last_name : userObj.last_name,
      city: basicFormData.city ? basicFormData.city : userObj.city,
      country: basicFormData.country ? basicFormData.country : userObj.country,
      gender: basicFormData.gender ? basicFormData.gender : userObj.gender
    }, (err, data) => {
      if (err) throw err
      if (data._id) {
        dispatch(BufferActions.SetUserObject({
          ...userObj,
          ...data
        }))
      }
      setIsBasicProfileLoading(false)
    })
  }

  const [basicEmailData, setBasicEmailData] = useState<any>({})
  const [isBasicEmailLoading, setIsBasicEmailLoading] = useState<boolean>(false)
  const handleEmailDataChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setBasicEmailData({
      ...basicEmailData,
      [event.target.name]: event.target.value
    })
  }
  const handleEmailChangeSubmit = () => {
    setIsBasicEmailLoading(true)
    ChangeUserEmail({
      _id: userObj._id,
      email: basicEmailData.email? basicEmailData.email : userObj.email,
      password: basicEmailData.password
    }, (err, data) => {
      if (err) throw err
      if (data._id) {
        dispatch(BufferActions.SetUserObject({
          ...userObj,
          ...data
        }))
      }
      setIsBasicEmailLoading(false)
    })
  }

  const [basicPhoneNumberData, setBasicPhoneNumberData] = useState<any>({})
  const [isBasicPhoneNumberLoading, setIsBasicPhoneNumberLoading] = useState<boolean>(false)
  const handlePhoneNumberDataChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setBasicPhoneNumberData({
      ...basicPhoneNumberData,
      [event.target.name]: event.target.value
    })
  }
  const handlePhoneNumberChangeSubmit = () => {
    setIsBasicPhoneNumberLoading(true)
    ChangeUserPhoneNumber({
      _id: userObj._id,
      phone_number: basicPhoneNumberData.phone_number? basicPhoneNumberData.phone_number : userObj.phone_number,
      password: basicPhoneNumberData.password
    }, (err, data) => {
      if (err) throw err
      if (data._id) {
        dispatch(BufferActions.SetUserObject({
          ...userObj,
          ...data
        }))
      }
      setIsBasicPhoneNumberLoading(false)
    })
  }

  const [basicPasswordData, setBasicPasswordData] = useState<any>({})
  const [isBasicPasswordLoading, setIsBasicPasswordLoading] = useState<boolean>(false)
  const handlePasswordDataChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setBasicPasswordData({
      ...basicPasswordData,
      [event.target.name]: event.target.value
    })
  }
  const handlePasswordChangeSubmit = () => {
    setIsBasicPasswordLoading(true)
    ChangeUserPassword({
      _id: userObj._id,
      old_password: basicPasswordData.old_password,
      new_password: basicPasswordData.new_password
    }, (err, data) => {
      if (err) throw err
      if (data._id) {
        dispatch(BufferActions.SetUserObject({
          ...userObj,
          ...data
        }))
      }
      setIsBasicPasswordLoading(false)
    })
  }

  const inputRef = useRef<any>()
  return (
    <>
      <input ref={inputRef} type="file" onChange={handleFileChange} hidden />
      <Helmet>
        <title>EIC - User Profile</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ mb: 7 }}>
        <Grid container xs={12}>
          <Grid
            container
            xs={12}
            display={"flex"}
            direction={"row"}
            mt={0}
            spacing={2}
          >
            <Grid item xs>
              <UserDetails
                city={userObj.city ?? ''}
                country={userObj.country ?? ''}
                email={userObj.email ?? ''}
                first_name={userObj.first_name ?? ''}
                last_name={userObj.last_name ?? ''}
                gender={userObj.gender ?? ''}
                phone_number={userObj.phone_number ?? ''}
                phone_number_type={userObj.phone_number_type ?? ''}
                profile_picture={userObj.profile_picture ?? ''}
                handleChange={handleChange}
                handleBasicUserProfileSubmit={handleBasicUserProfileSubmit}
                isBasicProfileLoading={isBasicProfileLoading}
                handleEmailDataChange={handleEmailDataChange}
                handleEmailChangeSubmit={handleEmailChangeSubmit}
                isBasicEmailLoading={isBasicEmailLoading}
                handlePhoneNumberChangeSubmit={handlePhoneNumberChangeSubmit}
                handlePhoneNumberDataChange={handlePhoneNumberDataChange}
                isBasicPhoneNumberLoading={isBasicPhoneNumberLoading}
                handlePasswordChangeSubmit={handlePasswordChangeSubmit}
                handlePasswordDataChange={handlePasswordDataChange}
                isBasicPasswordLoading={isBasicPasswordLoading}
              />
            </Grid>

            <Grid item style={{ width: "300px" }}>
              <Grid md={12}>
                <Card
                  sx={{
                    p: 3,
                    pt: 6,
                    pb: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Grid
                    style={{ marginBottom: 13 }}
                    className={"img-upload-wrapper"}
                  >
                    {isProfilePictureLoading ? <CircularProgress /> : (
                      <>
                        <Avatar
                          alt={user.name}
                          src={pictureFormBlob ? pictureFormBlob : user.avatar}
                          style={{ width: 130, height: 130 }}
                        />
                        <Button className={"upload-icon-btn"}>
                          <Upload
                            style={{
                              width: "40px",
                              height: "40px",
                            }}
                            onClick={() => inputRef.current.click()}
                            className={"upload-icon"}
                          />
                        </Button>
                      </>
                    )}
                  </Grid>

                  <Typography
                    variant="h3"
                    component="h3"
                    style={{ textAlign: "center" }}
                  >
                    {user.name}
                  </Typography>

                  <p style={{ textAlign: "center", margin: 0 }}>
                    {user.jobtitle}
                  </p>

                  <hr
                    style={{ marginTop: 30, marginBottom: 30 }}
                    className={"hr-line"}
                  />

                  <Grid
                    style={{
                      padding: 6,
                      marginBottom: 10,
                    }}
                    className={"sml-box"}
                  >
                    <NotificationsActive style={{ marginRight: 10 }} />
                    <Typography variant="h5">{totalWorkPermits} Investment Permits</Typography>
                  </Grid>

                  <Grid
                    style={{
                      marginBottom: 10,

                      padding: 6,
                    }}
                    className={"sml-box"}
                  >
                    <Money style={{ marginRight: 10 }} />
                    <Typography variant="h5">{totalMoneyInvested} Br. Invested</Typography>
                  </Grid>

                  <hr
                    style={{ marginTop: 30, marginBottom: 30 }}
                    className={"hr-line"}
                  />

                  <p style={{ margin: 0, textAlign: "center" }}>
                    Member since {new Date(userObj.createdAt).getFullYear()}
                  </p>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default UserProfile;