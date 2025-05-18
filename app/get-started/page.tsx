import React from "react";
import { TypographyH3 } from "../components/Typography/TypographyH3";
import { RegisterForm } from "../components/RegisterForm";

const GetStarted = () => {
  return (
    <div>
      <TypographyH3 className="text-center">
        Register to the planner
      </TypographyH3>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default GetStarted;
