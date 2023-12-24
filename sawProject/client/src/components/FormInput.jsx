import React from "react";
import styled from "styled-components";

const FormInput = ({
  labelText,
  labelClass,
  id,
  name,
  type,
  whenChange,
  value,
  errorText,
  errorClass,
}) => {
  return (
    <InputWrapper className="flex flex-col">
      <label htmlFor={id} className={labelClass}>
        {labelText}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        onChange={whenChange}
        value={value}
      />
      <p className={errorClass}>{errorText}</p>
    </InputWrapper>
  );
};

export default FormInput;

const InputWrapper = styled.div`
  margin-top: 0.5rem;
  width: 300px;

  label {
    font-size: 1rem;
    font-weight: 500;
    color: white;
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
