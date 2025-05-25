// import React from "react";
// import { TypographyH3 } from "../components/Typography/TypographyH3";
// import RegisterForm from "../components/RegisterForm";
// //import Link from "next/link";

// const GetStarted = () => {
//   return (
//     <div>
//       <TypographyH3 className="text-center">Add a user</TypographyH3>
//       <div className="flex flex-col justify-center">
//         <RegisterForm />
//         {/* <Link
//           href="/sign-in"
//           className="text-center underline text-gray-500 hover:cursor-pointer hover:text-gray-900 transition"
//           target="_blank"
//         >
//           Or sign in
//         </Link> */}
//       </div>
//     </div>
//   );
// };

// export default GetStarted;

import { TypographyH3 } from "../components/Typography/TypographyH3";
import RegisterForm from "../components/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPlus } from "lucide-react";

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <TypographyH3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create Your Profile
            </TypographyH3>
            <p className="text-gray-600 text-lg">
              Join our community and start planning your next big project
            </p>
          </div>

          {/* Form Card */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">Get Started Today</CardTitle>
              <CardDescription className="text-base">
                Fill in your details below to create your account and begin your
                journey
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <RegisterForm />
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
