'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
  const loginUser = useSelector((state: any) => state.loginUser.user);
  console.log(loginUser);

  return (
    <main className="w-screen justify-center">
      <div className="flex justify-center">
        <div className="w-11/12 xl:w-9/12 p-2 xl:p-8 flex justify-center">
          <div className="w-full flex justify-center items-center">
            <div className="w-10/12 flex justify-between px-40 items-center rounded-2xl shadow-2xl min-h-96">
              <div>소셜 로그인</div>
              <div>일반 로그인 + 회원가입</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
