import { PayloadAction } from "@reduxjs/toolkit";
import { REGISTER_USER } from "../_actions/types";

type UserState =
  | {
      register: string;
    }
  | {};

export default function (state: UserState = {}, action: PayloadAction<string>) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };

    default:
      return state;
  }
}
