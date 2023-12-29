import React, { isValidElement } from "react";
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
        .required(""),
      email: Yup.string().email("Invalid email address").required(""),
      username: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required(""),
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
        .required(""),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required(""),
    }),

    onSubmit: (values) => {
      // need to make a json object
      let inputData = JSON.stringify(values, null, 2);
      /* alert(inputData); */
      let info = {
        method: "POST",
        body: inputData,
      };

      //console.log(`${serverURL.development.backendUrl}/forms?registration=0`);

      // need to fetch
      fetch(`${serverURL.development.backendUrl}/forms?registration=0`, info)
        .then((res) => res.json())
        // analyse the returned data
        .then((data) => {
          // need to update userInfo values
          let info = data;
          console.log(info);
        })
        // if error
        // - show error message
        .catch((err) => console.log(err));

      // if success
      // - redirect to homepage

      // - clear form fields

      //formik.resetForm();
    },
  });

  return (
    <>
      {/* need to make some condition to see if the user already logged or not */}
      {true ? (
        <FormWrapper>
          <form onSubmit={formik.handleSubmit}>
            <h1>Register</h1>
            <FormInput
              labelText="First Name:"
              id={"name"}
              name={"name"}
              type={"text"}
              whenChange={formik.handleChange}
              value={formik.values.name}
              errorClass={formik.errors.name ? "" : "hidden"}
              errorText={formik.errors.name}
            />
            <FormInput
              labelText="Email:"
              id={"email"}
              name={"email"}
              type={"email"}
              whenChange={formik.handleChange}
              value={formik.values.email}
              errorClass={formik.errors.email ? "" : "hidden"}
              errorText={formik.errors.email}
            />
            <FormInput
              labelText="Username:"
              id={"username"}
              name={"username"}
              type={"text"}
              whenChange={formik.handleChange}
              value={formik.values.username}
              errorClass={formik.errors.username ? "" : "hidden"}
              errorText={formik.errors.username}
            />
            <FormInput
              labelText="Password:"
              id={"password"}
              name={"password"}
              type={"password"}
              whenChange={formik.handleChange}
              value={formik.values.password}
              errorClass={formik.errors.password ? "" : "hidden"}
              errorText={formik.errors.password}
            />
            <FormInput
              labelText="Confirm Password:"
              id={"confirmPassword"}
              name={"confirmPassword"}
              type={"password"}
              whenChange={formik.handleChange}
              value={formik.values.confirmPassword}
              errorClass={formik.errors.confirmPassword ? "" : "hidden"}
              errorText={formik.errors.confirmPassword}
            />

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
