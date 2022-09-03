import {
  Grid,
  Card,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Selectors as InvestmentPermitSelectors } from "src/store/States/InvestmentPermit";
import { Selectors as InvestmentExpansionPermitSelectors } from "src/store/States/InvestmentPermitExpansion";
import { useSelector } from "react-redux";
import { FormEventHandler, useState, useEffect, FC, ChangeEventHandler } from "react";
import DropWithInput from "src/components/DropWithInput/DropWithInput";
import "./style.css";

interface Props {
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  phone_number_type: string;
  profile_picture: string;
  country: string;
  city: string;
  email: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleBasicUserProfileSubmit: () => void;
  isBasicProfileLoading: boolean;
  handleEmailDataChange: ChangeEventHandler<HTMLInputElement>;
  handleEmailChangeSubmit: () => void;
  isBasicEmailLoading: boolean;
  handlePhoneNumberDataChange: (value: any) => void;
  handlePhoneNumberChangeSubmit: () => void;
  isBasicPhoneNumberLoading: boolean;
  handlePasswordDataChange: (value: any) => void;
  handlePasswordChangeSubmit: () => void;
  isBasicPasswordLoading: boolean;
}

const DashboardCards: FC<Props> = (props) => {
  const investment_permits = useSelector(
    InvestmentPermitSelectors.selectInvestmentPermits
  );
  const investment_permit_expansions = useSelector(
    InvestmentExpansionPermitSelectors.selectInvestmentPermitExpansions
  );
  const [invested_capital, setInvestmentCapital] = useState(0);
  const [permit_amount, setPermitAmount] = useState(0);
  const [expansion_permit_amount, setExpansionPermitAmount] = useState(0);

  useEffect(() => {
    let capital_amount = 0;
    investment_permits.forEach((permit: any) => {
      capital_amount += permit.investment_capital_usd;
    });
    setPermitAmount(investment_permits.length);
    setInvestmentCapital(capital_amount);
    setExpansionPermitAmount(investment_permit_expansions.length);
  }, [
    investment_permits,
    investment_permit_expansions,
    setInvestmentCapital,
    setPermitAmount,
    setExpansionPermitAmount,
  ]);

  return (
    <>
      <Grid
        container
        xs={12}
        direction={"column"}
        display={"flex"}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Grid item md={12} xs={12} style={{ width: "100%" }}>
          <Card>
            <Grid
              sx={{
                p: 3,
                borderRadius: 1.1,
                background: "#777",
              }}
            >
              <Typography variant={"h4"} style={{ color: "#ffffff" }}>
                Account / User Details
              </Typography>
            </Grid>
          </Card>
        </Grid>

        <Grid item md={12} xs={12} style={{ width: "100%" }}>
          <Card>
            <Grid
              sx={{
                p: 3,
                m: 3,
                borderRadius: 1.1,
              }}
              className="card-grid-wrapper"
            >
              <Grid
                md={6}
                display={"flex"}
                direction={"column"}
                alignItems={"center"}
                mr={3}
              >
                <Typography variant={"h4"} className={"section-header"}>
                  Personal Details
                </Typography>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      First Name
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                      defaultValue={props.first_name}
                      name="first_name"
                      onChange={props.handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Last Name
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                      defaultValue={props.last_name}
                      name="last_name"
                      onChange={props.handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                      select
                      defaultValue={props.gender}
                      name="gender"
                      onChange={props.handleChange}
                    >
                      {["MALE", "FEMALE"].map(item => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      City
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                      defaultValue={props.city}
                      name="city"
                      onChange={props.handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Country
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                      defaultValue={props.country}
                      name="country"
                      onChange={props.handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <FormControl className="flex-c">
                    <Button
                      variant="contained"
                      style={{ padding: "12px", background: "#01497c" }}
                      disabled={props.isBasicProfileLoading}
                      onClick={props.handleBasicUserProfileSubmit}
                    >
                      {props.isBasicProfileLoading ? <CircularProgress color="success" /> : "Save Changes"}
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                md={6}
                display={"flex"}
                direction={"column"}
                alignItems={"center"}
                spacing={3}
              >
                {/* <form onSubmit={() => console.log("lolzzz")}> */}
                  <Typography variant={"h4"} className={"section-header"}>
                    Security / Change Email
                  </Typography>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    style={{ width: "100%", marginTop: "15px" }}
                  >
                    <FormControl className="flex-c">
                      <FormLabel id="demo-radio-buttons-group-label">
                        Your Email
                      </FormLabel>
                      <TextField
                        style={{ width: "100%", marginTop: "5px" }}
                        className="default-input"
                        variant="outlined"
                        defaultValue={props.email}
                        required
                        name="email"
                        onChange={props.handleEmailDataChange}
                      />
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    style={{ width: "100%", marginTop: "15px" }}
                  >
                    <FormControl className="flex-c">
                      <FormLabel id="demo-radio-buttons-group-label">
                        Password
                      </FormLabel>
                      <TextField
                        style={{ width: "100%", marginTop: "5px" }}
                        className="default-input"
                        variant="outlined"
                        required
                        name="password"
                        type="password"
                        onChange={props.handleEmailDataChange}
                      />
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    <FormControl className="flex-c">
                      <Button
                        variant="contained"
                        style={{ padding: "12px", background: "#01497c" }}
                        disabled={props.isBasicEmailLoading}
                        onClick={props.handleEmailChangeSubmit}
                      >
                        {props.isBasicEmailLoading ? <CircularProgress color="success" /> : "Change Email"}
                      </Button>
                    </FormControl>
                  </Grid>
                {/* </form> */}
                <Typography variant={"h4"} className={"section-header"} mt={4}>
                  Security / Change Phone Number
                </Typography>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl
                    className="flex-c"
                    onChange={(event) => props.handlePhoneNumberDataChange({
                      ...event,
                      target: event.target
                    })}
                  >
                    <FormLabel id="demo-radio-buttons-group-label">
                      Your Phone Number
                    </FormLabel>
                    <DropWithInput
                      key={1}
                      dropItems={[
                        { dropItem: "Mobile", dropValue: 'MOBILE' },
                        { dropItem: "Fixed Line", dropValue: 'FIXED LINE' },
                      ]}
                      gridStyle={{ marginTop: "5px" }}
                      defaultPhoneNumberValue={props.phone_number}
                      handlePhoneNumberChange={props.handlePhoneNumberDataChange}
                      defaultPhoneTypeValue={props.phone_number_type}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Password
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                      type="password"
                      name="password"
                      onChange={props.handlePhoneNumberDataChange}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <FormControl className="flex-c">
                    <Button
                      variant="contained"
                      style={{ padding: "12px", background: "#01497c" }}
                      disabled={props.isBasicPhoneNumberLoading}
                      onClick={props.handlePhoneNumberChangeSubmit}
                    >
                      {props.isBasicPhoneNumberLoading? <CircularProgress color="success" /> : "Change Phone Number"}
                    </Button>
                  </FormControl>
                </Grid>

                <Typography variant={"h4"} className={"section-header"} mt={4}>
                  Security / Change Password
                </Typography>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Old Password
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                      name="old_password"
                      type="password"
                      onChange={props.handlePasswordDataChange}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      New Password
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                      name="new_password"
                      type="password"
                      onChange={props.handlePasswordDataChange}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Confirm Password
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                      name="confirm_password"
                      type="password"
                      onChange={props.handlePasswordDataChange}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <FormControl className="flex-c">
                    <Button
                      variant="contained"
                      style={{ padding: "12px", background: "#01497c" }}
                      disabled={props.isBasicPasswordLoading}
                      onClick={props.handlePasswordChangeSubmit}
                    >
                      {props.isBasicPasswordLoading? <CircularProgress color="success" /> : "Change Password"}
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardCards;
