import React from "react";
import { TypographyH3 } from "../components/Typography/TypographyH3";
import  RegisterForm from "../components/RegisterForm";
import Link from "next/link";

const GetStarted = () => {
  return (
    <div>
      <TypographyH3 className="text-center">
        Register to the planner
      </TypographyH3>
      <div className="flex flex-col justify-center">
        <RegisterForm />
        <Link
          href="/sign-in"
          className="text-center underline text-gray-500 hover:cursor-pointer hover:text-gray-900 transition"
          target="_blank"
        >
          Or sign in
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
