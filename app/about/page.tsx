"use client";

import { TypographyH3 } from "../components/Typography/TypographyH3";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  Share2,
  Sparkles,
  Shield,
  Heart,
} from "lucide-react";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <TypographyH3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About ProfileHub
          </TypographyH3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            ProfileHub is a modern platform designed to help professionals
            showcase their skills, connect with opportunities, and build
            meaningful relationships in their industry.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We believe that every professional deserves a platform to
                showcase their unique talents and connect with opportunities
                that align with their goals. ProfileHub was created to bridge
                the gap between talented individuals and the organizations that
                need them.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Professional Profiles
              </h3>
              <p className="text-gray-600">
                Create comprehensive profiles that highlight your experience,
                skills, and achievements in a visually stunning format.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Easy Sharing
              </h3>
              <p className="text-gray-600">
                Share your profile instantly with recruiters, clients, and
                collaborators through custom links and social media integration.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Secure Platform
              </h3>
              <p className="text-gray-600">
                Your data is protected with industry-standard security measures
                and privacy controls.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="border-0 shadow-xl max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Join Our Community
              </h2>
              <p className="text-gray-600 mb-6">
                Start building your professional presence today and connect with
                opportunities that match your aspirations.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/get-started">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
