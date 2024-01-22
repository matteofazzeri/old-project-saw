import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnapshot } from "valtio";

// components & settings
import serverURL from "../config/config";
import CustomButton from "../components/CustomButton";
import FormInput from "../components/FormInput";
import settings from "../settings/state";

const Forms = () => {
  const { state, userInfo } = settings;
  const snap = useSnapshot(state);

  const formik = new useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email address is required"),
      username: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("username is required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .max(20, "Must be 20 characters or less")
        .matches(
          /*
            (?=.{8,}) - at least 8 characters
            (?=.*[!@#$%^&*()\-_=+{};:,<.>]) - at least one special character
            (?=.*\d) - at least one number
            (?=.*[a-z]) - at least one lowercase letter
            (?=.*[A-Z]) - at least one uppercase letter
            */
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        )
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),

    onSubmit: (values) => {

      // need to make a json object
      let inputData = JSON.stringify(values, null, 2);
      console.log(inputData);
      /* alert(inputData); */
      let info = {
        method: "POST",
        body: inputData,
      };

      //console.log(`${serverURL.development.backendUrl}/forms?registration=0`);

      // need to fetch
      fetch(`${serverURL.development.backendUrl}/forms?registration=0`, info)
        .then((res) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          res.json();
        })
        // analyse the returned data
        .then((data) => {
          // need to update userInfo values
          let info = data;
          console.log(info);
        })
        // if error
        // - show error message
        .catch((err) => console.log("ups an error occurred\n", err));

      // if success
      // - redirect to homepage

      // - clear form fields

      //formik.resetForm();
    },
  });

  const renderFormInput = (label, id, name, type) => (
    <FormInput
      labelText={label}
      id={id}
      name={name}
      type={type}
      whenChange={formik.handleChange}
      value={formik.values[name]}
      errorClass={formik.errors[name] ? "" : "hidden"}
      errorText={formik.errors[name]}
    />
  );

  return (
    <>
      {/* need to make some condition to see if the user already logged or not */}
      {true ? (
        <FormWrapper>
          <form onSubmit={formik.handleSubmit}>
            <h1>Register</h1>
            {renderFormInput("Name", "name", "name", "text")}
            {renderFormInput("Email", "email", "email", "email")}
            {renderFormInput("Username", "username", "username", "text")}
            {renderFormInput("Password", "password", "password", "password")}
            {renderFormInput(
              "Confirm Password",
              "confirmPassword",
              "confirmPassword",
              "password"
            )}
            <CustomButton
              title={"submit"}
              type={"submit"}
              customStyles={"bg-blue-300 hover:bg-blue-400 focus:bg-blue-500"}
              disable={false}
            />
          </form>
        </FormWrapper>
      ) : (
        console.log(snap.pageTitle)
      )}
    </>
  );
};

export default Forms;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  h1 {
    color: inherit;
    font-size: 3rem;
    font-weight: 700;
  }

  form {
    padding: 0.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.308);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    box-shadow: 0 0 7px rgba(255, 255, 255, 0.5);
  }

  button {
    margin-top: 1rem;
  }
`;
