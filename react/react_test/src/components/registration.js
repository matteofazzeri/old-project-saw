import { useState } from "react";
import axios from "axios";

export default function Registration() {

  const [inputs, setInputs] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/es/saw-projectc/react/apiSQL/registration.php', inputs);

    console.log(inputs);
  }

  const handleChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  return (
    <div>
      <h1>Registration</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" required onChange={handleChange}/>
        <input type="email" placeholder="E-mail" name="email" required onChange={handleChange}/>
        <input type="password" placeholder="Password" name="pass" required onChange={handleChange}/>
        <input type="submit" value='submit'></input>
      </form>
    </div>
  );
}
