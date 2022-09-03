import { useReducer, useEffect, FC } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import "../styles.css";
import "./investment_detail_styles.css";
import {
  formInitState,
  formReducer,
  formSubmit,
  register,
  setFormDefaults,
  getFormError,
  FormActions,
  selectRequriedKeys,
  registerForm,
} from "src/common/form";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { useSelector } from "react-redux";
import { getCommonDate } from "src/store/States/Helpers/date"

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const BioDataPositionOccupied: FC<Props> = (props) => {
  const inputs = [
    "full_name",
    "full_name_amharic",
    "gender",
    "date_of_birth",
    "nationality",
    "passport_number",
    "passport_valid_until",
    "visa_type",
    "visa_date_of_issue",
    "visa_valid_until_till",
    "title_to_be_occupied_by_expat",
    "project_phase_expat_employment_is_sought",
    "agreed_length_of_empl_per_empl_contract",
    "education_level",
    "professional_skill",
    "years_of_experiance",
    "expected_date_of_employment",
    "basic_salary_in_birr",
    "monthly_allowance_in_birr",
    "certification_name",
    "certification_title",
    "certification_date"
  ];

  const optional_inputs = [];

  const [formState, dispatch] = useReducer(formReducer, formInitState);

  const handleSubmit = (data: any) => {
    props.nextPage(data);
  };

  useEffect(() => {
    formSubmit(dispatch);
  }, [props.pageClickCount]);

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  const savedBuffer = useSelector(BufferSelectors.selectViewPermitBuffer);
  useEffect(() => {
    if (savedBuffer && savedBuffer.bio_data_expat_information && savedBuffer.certification) {
      if (Object.keys(savedBuffer).length > 0) {
        FormActions.UpdateFormData(
          selectRequriedKeys([...inputs, ...optional_inputs], {
            ...savedBuffer,
            ...savedBuffer.bio_data_expat_information,
            ...savedBuffer.bio_data_expat_information.expat_qualification,
            ...savedBuffer.certification,
            date_of_birth: getCommonDate(savedBuffer.bio_data_expat_information.date_of_birth),
            passport_valid_until: getCommonDate(savedBuffer.bio_data_expat_information.passport_valid_until),
            visa_date_of_issue: getCommonDate(savedBuffer.bio_data_expat_information.visa_date_of_issue),
            visa_valid_until_till: getCommonDate(savedBuffer.bio_data_expat_information.visa_valid_until_till),
            expected_date_of_employment: getCommonDate(savedBuffer.bio_data_expat_information.expected_date_of_employment),
            certification_name: savedBuffer.certification.name,
            certification_title: savedBuffer.certification.title,
            certification_date: getCommonDate(savedBuffer.certification.date)
          }),
          dispatch
        );
      }
    }
  }, [savedBuffer, dispatch]);

  console.log("fomsz", formState.formData)

  return (
    <>
      <div>
        <div className="form-box-content">
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Bio Data & Position to be Occupied</div>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Full name
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("full_name", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">ሙሉ ስም</FormLabel>
                <TextField
                  variant="outlined"
                  {...register(
                    "full_name_amharic",
                    formState,
                    dispatch
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4} justifyContent="flex-start">
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                {getFormError(formState, "gender").error ? (
                  <p style={{ color: "red" }}>
                    {getFormError(formState, "gender").helperText}
                  </p>
                ) : (
                  <></>
                )}
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  sx={{ flexDirection: "row" }}
                >
                  {["Female", "Male"].map((item) => (
                    <FormControlLabel
                      value={item}
                      control={
                        <Radio
                          {...registerForm({
                            name: "gender",
                            formState,
                            dispatch,
                            exactValue: item,
                          })}
                        />
                      }
                      label={item}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Date of Birth
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="date"
                  {...register("date_of_birth", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Nationality
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register(
                    "nationality",
                    formState,
                    dispatch
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Passport No.
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("passport_number", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Passport Valid until
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="date"
                  {...register("passport_valid_until", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Visa Type
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register(
                    "visa_type",
                    formState,
                    dispatch
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Visa date of Issue
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="date"
                  {...register("visa_date_of_issue", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Visa Valid Until
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="date"
                  {...register("visa_valid_until_till", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Title of professional line, position to be occupied by expat
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register(
                    "title_to_be_occupied_by_expat",
                    formState,
                    dispatch
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Project phase for which expat employment is sought
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("project_phase_expat_employment_is_sought", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Agreed length of employment per the employment contract
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register(
                    "agreed_length_of_empl_per_empl_contract",
                    formState,
                    dispatch
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <div className="invest-title">Qualification/s of expat</div>

          <Grid container width="100%" spacing={4}>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Education: PHD/master's degree / First Degree / Diploma /
                  Certificate / Others
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("education_level", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Professional skill
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("professional_skill", formState, dispatch)}
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Years of work experience
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("years_of_experiance", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Expected date of employment
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register(
                    "expected_date_of_employment",
                    formState,
                    dispatch
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Basic salary (in Birr)
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register(
                    "basic_salary_in_birr",
                    formState,
                    dispatch
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Monthly allowance (in Birr)
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("monthly_allowance_in_birr", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <hr style={{ width: "99.7%" }} />
        <div className="form-box-content">
          <div className="invest-title">Certification</div>

          <Grid container width="100%" spacing={4}>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Name</FormLabel>
                <TextField
                  variant="outlined"
                  {...register("certification_name", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Title</FormLabel>
                <TextField
                  variant="outlined"
                  {...register(
                    "certification_title",
                    formState,
                    dispatch
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Date</FormLabel>
                <TextField
                  variant="outlined"
                  {...register(
                    "certification_date",
                    formState,
                    dispatch
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default BioDataPositionOccupied;