import * as React from "react";
import { Dispatch } from "react";

export interface ReducerState {
  // status: "ready" | "playing" | "success" | "fail";
  status: string;
  target: number;
  tryCnt: number;
  fake: number;
  color: string;
  text: string;
}

export const SET_STATUS = "SET_STATUS";
export const SET_TABLE = "SET_TABLE";
export const SET_RESULT = "SET_RESULT";

export interface SetStateAction {
  type: typeof SET_STATUS;
  // status: "ready" | "playing" | "success" | "fail";
  status: string;
}

export interface SetTableAction {
  type: typeof SET_TABLE;
  target: number;
  fake: number;
  color: string;
  text: string;
  tryCnt: number;
}

export type ReducerActions = SetStateAction | SetTableAction | SetResultAction;

export interface SetResultAction {
  type: typeof SET_RESULT;
}

export interface Context {
  status: string;
  target: number;
  tryCnt: number;
  fake: number;
  color: string;
  text: string;
  dispatch: Dispatch<ReducerActions>;
}
