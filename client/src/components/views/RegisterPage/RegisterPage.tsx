import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    // preventdefault: 페이지 리프레시 막아줌
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let dataToSubmit = {
      email: Email,
      password: Password,
      name: Name,
    };

    // redux 이용하므로 axios로 데이터 보낼 필요x
    dispatch(registerUser(dataToSubmit)).payload.then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("Failed to sign up");
      }
    });

    // const request = axios.post("/api/users/register", body).then((response) => {
    //   console.log(response.data);
    //   return response.data;
    // });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="w-full max-w-xl">
        <form onSubmit={onSubmitHandler}>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <h3 className="text-xl text-gray-600 font-bold">Sign up</h3>
            </div>
          </div>
          <br></br>
          {/* 이메일 */}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="emal">
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="email"
                type="text"
                value={Email}
                onChange={onEmailHandler}
              />
            </div>
          </div>
          {/* 이름 */}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="name">
                Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="name"
                type="text"
                value={Name}
                onChange={onNameHandler}
              />
            </div>
          </div>
          {/* 비밀번호 */}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="password"
                type="password"
                value={Password}
                onChange={onPasswordHandler}
              />
            </div>
          </div>
          {/* 비밀번호 확인 */}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="confirmPassword">
                Confirm Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="confirmPassword"
                type="password"
                value={ConfirmPassword}
                onChange={onConfirmPasswordHandler}
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
