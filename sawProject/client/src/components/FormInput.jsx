import React from "react";
import styled from "styled-components";

const FormInput = ({
  labelText,
  classValue,
  id,
  name,
  type,
  whenChange,
  value,
  errorText,
  errorClass,
}) => {
  return (
    <InputWrapper className={`flex flex-col ` + classValue}>
      <label htmlFor={id}>
        {labelText}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        onChange={whenChange}
        value={value}
        className="text-gray-600"
      />
      <p className={errorClass}>{errorText}</p>
    </InputWrapper>
  );
};

export default FormInput;

const InputWrapper = styled.div`
  margin-top: 0.5rem;
  width: 300px;
  display: flex;
  flex-direction: column;

  label {
    font-size: 1rem;
    font-weight: 500;
  }

  input {
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
  input:focus {
    outline: none;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
  }

  p {
    font-size: 0.8rem;
    color: red;
  }
`;
