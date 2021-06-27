/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { Paper, makeStyles, Grid, Typography } from "@material-ui/core";
import Controls from "../../../components/Form/controls/Controls";
import { useForm, Form } from "../../../components/Form/useForm";
import UploadFile from "components/shared/upload/uploadFile";
import { fetchAllHealthTopics } from "apiRequests/common";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const getRelationshipCollection = () => [
  { id: 1, title: "Self" },
  { id: 2, title: "Spouse" },
  { id: 3, title: "Father" },
  { id: 4, title: "Mother" },
  { id: 5, title: "Brother" },
  { id: 6, title: "Sister" },
  { id: 7, title: "Child" },
];

const initialFValues = {
  id: 0,
  profileName: "",
  email: "",
  mobile: "",
  age: "",
  gender: "male",
  relationship: 1,
  // creationDate: new Date(),
  cancer: false,
  bloodPressure: false,
  sugar: false,
  covid: false,
};

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: "3rem",
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

const CreateProfile = ({ fetchAllHealthTopics }) => {
  const [documentData, setDocumentData] = useState({});
  const [profileName, setProfileName] = useState("");
  const [relationshipId, setRelationshipId] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [healthIssues, setHealthIssues] = useState("");
  const [errors, setErrors] = useState({});
  const uploadedLink = useSelector((state) => state.common.uploadedLink);
  const classes = useStyles();

  useEffect(() => {
    console.log(fetchAllHealthTopics);
    fetchAllHealthTopics();
    setRelationshipId(getRelationshipCollection()[0].id);
  }, []);

  useEffect(() => {
    setDocumentData({
      link: uploadedLink,
    });
  }, [uploadedLink]);
  const createNewProfile = () => {
    console.log("---------DocumentData------", documentData);
  };

  // const validate = (fieldValues = values) => {
  //   const temp = { ...errors };
  //   if ("fullName" in fieldValues)
  //     temp.fullName = fieldValues.fullName ? "" : "This field is required.";
  //   if ("email" in fieldValues)
  //     temp.email = /$^|.+@.+..+/.test(fieldValues.email)
  //       ? ""
  //       : "Email is not valid.";
  //   // if ("mobile" in fieldValues)
  //   //   temp.mobile =
  //   //     fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
  //   if ("relationship" in fieldValues)
  //     temp.relationship =
  //       fieldValues.relationship !== null ? "" : "This field is required.";
  //   setErrors({
  //     ...temp,
  //   });

  //   if (fieldValues === values)
  //     return Object.values(temp).every((x) => x === "");
  // };

  // const { values, setValues, errors, setErrors, handleInputChange, resetForm }
  // const { values, errors, setErrors, handleInputChange } = useForm(
  //   initialFValues,
  //   true,
  //   validate
  // );

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     // Save data to backend and in local storge also
  //     console.log(values);
  //     resetForm();
  //   }
  // };
  const handleInputChange = (e) => {
    if (e.target.name === "document") {
      setDocumentData({
        ...documentData,
        name: e.target.value,
      });
    }
    if (e.target.name === "topic") {
      setRelationshipId(e.target.value);
    }
    if (e.target.name === "profileName") {
      setProfileName(e.target.value);
    }
    console.log(documentData, relationshipId, profileName);
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <Grid container>
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <UploadFile />
          </Grid>
          {uploadedLink && (
            <Grid
              item
              xs={12}
              md={6}
              lg={9}
              xl={9}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Controls.Input
                name="document"
                label="Document name"
                value={documentData.name}
                onChange={handleInputChange}
                error={errors.document}
              />
              <Controls.Select
                name="topic"
                label="Health topic"
                value={relationshipId}
                onChange={handleInputChange}
                options={getRelationshipCollection()}
                error={errors.relationship}
              />
            </Grid>
          )}
        </Grid>
      </Paper>

      <Paper className={classes.pageContent}>
        <Form onSubmit={createNewProfile}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Controls.Input
                name="profileName"
                label="Profile Name"
                value={profileName}
                onChange={handleInputChange}
                error={errors.profileName}
              />
              <Controls.Select
                name="relationship"
                label="Relationship"
                value={relationshipId}
                onChange={handleInputChange}
                options={getRelationshipCollection()}
                error={errors.relationship}
              />
              <Controls.Input
                label="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <Controls.Input
                label="Mobile"
                name="mobile"
                value={mobile}
                onChange={handleInputChange}
                error={errors.mobile}
              />
              <Controls.Input
                name="age"
                label="Age"
                value={age}
                onChange={handleInputChange}
                error={errors.age}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controls.RadioGroup
                name="gender"
                label="Gender"
                value={gender}
                onChange={handleInputChange}
                items={genderItems}
              />
              <Typography variant="subtitle1">Any Health Issues</Typography>
              <Grid>
                <Grid item xs={6} sm={3}>
                  <Controls.Checkbox
                    name="cancer"
                    label="Cancer"
                    value={false}
                    onChange={handleInputChange}
                  />
                  <Controls.Checkbox
                    name="sugar"
                    label="Sugar"
                    value={true}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Controls.Checkbox
                    name="bloodPressure"
                    label="BloodPressure"
                    value={true}
                    onChange={handleInputChange}
                  />
                  <Controls.Checkbox
                    name="covid"
                    label="Covid"
                    value={false}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <div>
                <Controls.Button type="submit" text="Submit" />
                {/* <Controls.Button
                  text="Reset"
                  color="default"
                  onClick={resetForm}
                /> */}
              </div>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </>
  );
};

CreateProfile.propTypes = {
  fetchAllHealthTopics: PropTypes.func,
};

const mapStateToProps = (state) => ({
  healthTopics: state.common.healthTopics,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllHealthTopics: () => dispatch(fetchAllHealthTopics()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
