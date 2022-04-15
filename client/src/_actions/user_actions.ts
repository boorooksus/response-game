import axios from "axios";
import { REGISTER_USER } from "./types";
import { USER_SERVER } from "../components/Config";

type DataToSubmitType = {
  email: string;
  password: string;
  name: string;
};

export const registerUser = (dataToSubmit: DataToSubmitType) => {
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit).then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

type UserAction = ReturnType<typeof registerUser>;
