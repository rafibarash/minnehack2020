import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import { API_PATH } from "../api";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("Home");
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = dispatch => async ({ email, password }) => {
  console.log(email, password);
  try {
    const res = await fetch(`${API_PATH}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name: "John Doe",
      }),
    });
    console.log(res);
    const json = await res.json();
    await AsyncStorage.setItem("token", json.token);
    dispatch({ type: "signin", payload: json.token });

    navigate("Home");
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const res = await fetch(`${API_PATH}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res);
    const json = await res.json();
    await AsyncStorage.setItem("token", json.token);
    dispatch({ type: "signin", payload: response.token });
    navigate("Home");
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);