import { proxy } from "valtio";

const state = proxy({
  pageTitle: "home",
  color: "#EFBD48",
  form: "login",
});

const userInfo = proxy({
  username: localStorage.getItem("username") || "",
  uuid: localStorage.getItem("uuid") || "",
  admin: !!localStorage.getItem("admin") || false,
  loggedIn: false /* localStorage.getItem("autoLog") !== false || localStorage.getItem("autoLog") !== null ? true : false */,
});

export default {state, userInfo};
