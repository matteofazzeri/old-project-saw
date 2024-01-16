import { proxy } from "valtio";

const state = proxy({
  pageTitle: "home",
  color: "#EFBD48",
  form: "login",
  sidebarOpen: false,
});

const userInfo = proxy({
  name: localStorage.getItem("name") || "",
  username: localStorage.getItem("username") || "",
  uuid: localStorage.getItem("uuid") || "",
  admin: !!localStorage.getItem("admin") || false,
  address: localStorage.getItem("address") || "",
  loggedIn: false /* localStorage.getItem("autoLog") !== false || localStorage.getItem("autoLog") !== null ? true : false */,
});

export default {state, userInfo};
