import '../css/forminput.css';

const FormInput = (props) => {
  return (
    <div className="formInput">
      {/* <label>something</label> */}
      <input placeholder={props.placeholder}/>
    </div>
  );
};

export default FormInput;