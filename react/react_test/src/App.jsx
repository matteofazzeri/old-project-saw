import FormInput from "./components/FormInputs";
import "./css/App.css";
import axios from "axios";

const App = () => {
  return (
    <div className="App">
      <form action="">
        <FormInput placeholder="Username" />
        <FormInput placeholder="Email" />
        <FormInput placeholder="Password" />
        <FormInput placeholder="Confirm Password" />
      </form>
    </div>
  );
};
export default App;
