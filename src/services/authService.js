import axios from "axios";
import { endpoints } from "../endpoints/endpoints";

export const signIn = async (values, userRole) => {
  try {
    const response = await axios.post(endpoints.auth.signin, {
      ...values,
      UserRole: userRole,
    });

    console.log("--------", response.data);

    localStorage.setItem("id", response.data.existingUser._id);
    localStorage.setItem("name", response.data.existingUser.name);
    localStorage.setItem("token", response.data.token);

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const signUp = async (values, userRole) => {
  try {
    const response = await axios.post(endpoints.auth.signup, {
      ...values,
      UserRole: userRole,
    });

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  } else {
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};
