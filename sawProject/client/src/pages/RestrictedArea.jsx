import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import serverURL from "../config/config";
import CustomButton from "../components/CustomButton";
import FormInput from "../components/FormInput";

const RestrictedArea = () => {
  const [product, setProduct] = useState("spaceships");

  const formik = useFormik({
    initialValues: {
      product: "",
      // generic values for products
      name: "",
      image: "",
      description: "",
      price: "",
      available: false,
      quantity: "",
      // values for spaceship
      model: "",
      fuel_type: "",
      capacity: "",
      speed: "",
      // values for spacesuit
      size: "",
      material: "",
      color: "",
    },

    validationSchema: () => {
      let schema;

      if (product) {
        schema = Yup.object({
          /* photo: Yup.mixed().test(
            "fileSize",
            "File size is too large",
            (value) => {
              if (!value) return true; // Allow empty file input
              return value.size <= 5242880; // 5 MB limit (you can adjust this)
            }
          ), */
          name: Yup.string()
            .min(3, "Must be 3 characters or more")
            .max(30, "Must be 30 characters or less")
            .required("Name is required"),
          description: Yup.string()
            .max(1000, "Cannot write more than 1000")
            .required("Description is required"),
          price: Yup.number()
            .required("Price is required")
            .positive("Price must be positive"),
          available: Yup.boolean(),
          quantity: Yup.number()
            .required("Quantity is required")
            .positive("Quantity must be positive"),
        });
      }
      if (product === "spaceships") {
        schema = Yup.object({
          model: Yup.string()
            .min(3, "Must be 3 characters or more")
            .max(30, "Must be 30 characters or less")
            .required("Model name is required"),
          fuel_type: Yup.string()
            .min(3, "Must be 3 characters or more")
            .max(30, "Must be 30 characters or less")
            .required("Fuel type is required"),
          capacity: Yup.number()
            .min(0, "Must be a positive number")
            .required("Capacity is required"),
          speed: Yup.number()
            .min(0, "Must be a positive number")
            .required("Speed is required"),
          size: Yup.string()
            .min(0, "Must be a positive number")
            .required("Size is required"),
        });
      }
      if (product === "spacesuits") {
        schema = Yup.object({
          material: Yup.string()
            .min(3, "Must be 3 characters or more")
            .max(30, "Must be 30 characters or less")
            .required("Material is required"),
          color: Yup.string().required("Color is required"),
          size: Yup.string()
            .min(0, "Must be a positive number")
            .required("Size is required"),
        });
      }

      return schema;
    },

    onSubmit: (values) => {
      // ! Delete all the empty values and then convert them into JSON objects

      let inputData = JSON.stringify(
        Object.fromEntries(
          Object.entries(values).filter(([key, value]) => value !== "")
        ),
        null,
        2
      );

      let info = {
        method: "POST",
        body: inputData,
      };

      fetch(
        `${serverURL.development.backendUrl}/shop?categories=${product}`,
        info
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          // Check if the response content type is JSON
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            // Handle non-JSON response (e.g., plain text or HTML)
            return response.text();
          }
        })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Fetch error:", error.message);
        });

      console.log(inputData);
    },
  });

  const renderFormInput = (label, id, name, type) => (
    <FormInput
      labelText={label}
      classValue={"text-black"}
      id={id}
      name={name}
      type={type}
      whenChange={formik.handleChange}
      value={formik.values[name]}
      errorClass={formik.errors[name] ? "" : "hidden"}
      errorText={formik.errors[name]}
    />
  );

  const handleSelectionProductChange = (e) => {
    console.log(product);
    setProduct(e.target.value);
    console.log("changed product: ", product);
  };

  return (
    <section className="text-white">
      <h2>Admin Area</h2>
      <form onSubmit={formik.handleSubmit}>
        <select
          name="product"
          id="product"
          onChange={handleSelectionProductChange}
          defaultValue="spaceship"
          className="text-black w-[200px] outline-none"
        >
          <option value="spaceships">Spaceship</option>
          <option value="spacesuits">Spacesuit</option>
          <option value="space_parts">Spacepart</option>
        </select>
        {product && (
          <>
            {/* {renderFormInput("Photo", "photo", "image", "file")} */}
            {renderFormInput("Name", "name", "name", "text")}
            {renderFormInput(
              "Description",
              "description",
              "description",
              "text"
            )}
            {renderFormInput("Price", "price", "price", "text")}
            {renderFormInput("Available", "available", "available", "checkbox")}
            {renderFormInput("Quantity", "quantity", "quantity", "text")}
          </>
        )}
        {product === "spaceships" ? (
          <>
            {renderFormInput("Model", "model", "model", "text")}
            {renderFormInput("Fuel Type", "fuel_type", "fuel_type", "text")}
            {renderFormInput("Capacity", "capacity", "capacity", "text")}
            {renderFormInput("Speed", "speed", "speed", "text")}
            {renderFormInput("Size", "size", "size", "text")}
          </>
        ) : product === "spacesuits" ? (
          <>
            {renderFormInput("Material", "material", "material", "text")}
            {renderFormInput("Color", "color", "color", "text")}
            {renderFormInput("Size", "size", "size", "text")}
          </>
        ) : (
          <></>
        )}

        <CustomButton
          title={"submit"}
          type={"submit"}
          customStyles={"bg-blue-300 hover:bg-blue-400 focus:bg-blue-500"}
          disable={false}
        />
      </form>
    </section>
  );
};

export default RestrictedArea;
