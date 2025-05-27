// import React from "react";
// import Header from "./components/Header";
// import { TypographyP } from "./components/Typography/TypographyP";
// const Home = () => {
//   return (
//     <div>
//       <Header />
//       <div className="my-3 mx-auto">
//         <TypographyP>
//           Plan your project. Lorem ipsum dolor sit amet consectetur adipisicing
//           elit. Ad veniam, sit sint explicabo aliquid porro aperiam iste hic,
//           mollitia voluptatem dolor laboriosam optio dolores quibusdam. Porro
//           architecto velit illum mollitia.
//         </TypographyP>
//       </div>
//     </div>
//   );
// };

// export default Home;

import Header from "./components/Header";
import { TypographyP } from "./components/Typography/TypographyP";
import { TypographyH1 } from "./components/Typography/TypographyH1";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, User, Share2, Globe } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <TypographyH1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            ProfileHub
          </TypographyH1>
          <TypographyP className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create your perfect professional profile and showcase your skills to
            the world. Connect with opportunities, build your network, and let
            your expertise shine through a beautifully crafted digital presence.
          </TypographyP>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href="/get-started">
                Create Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              View Examples
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Professional Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Build comprehensive profiles that highlight your experience,
                skills, and achievements in a stunning visual format.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Easy Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Share your profile instantly with recruiters, clients, and
                collaborators through custom links and social media integration.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Global Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Connect with professionals worldwide and discover opportunities
                that match your skills and career aspirations.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
