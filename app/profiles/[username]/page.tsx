"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_URL } from "@/lib/config";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, User, Edit, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TypographyH3 } from "../../components/Typography/TypographyH3";
import Link from "next/link";

interface UserProfile {
  username: string;
  email: string;
  profilePic: string | null;
}

const ProfilePage = () => {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/api/data`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        const userProfile = data.find(
          (user: UserProfile) => user.username === username
        );

        if (!userProfile) {
          throw new Error("Profile not found");
        }

        setProfile(userProfile);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching profile"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="hover:bg-blue-50">
            <Link href="/profiles" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profiles
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-lg text-gray-600">Loading profile...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        ) : profile ? (
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Profile Picture Section */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                        <AvatarImage
                          src={
                            profile.profilePic ||
                            "https://github.com/shadcn.png"
                          }
                          alt={profile.username}
                        />
                        <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {profile.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600">
                        Active
                      </Badge>
                    </div>
                  </div>

                  {/* Profile Details Section */}
                  <div className="flex-1">
                    <TypographyH3 className="text-3xl font-bold text-gray-900 mb-4">
                      {profile.username}
                    </TypographyH3>

                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-5 w-5 mr-3" />
                        <span>{profile.email}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <User className="h-5 w-5 mr-3" />
                        <span>
                          Member since {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button variant="outline" className="w-full md:w-auto">
                        <Edit className="mr-2 h-4 w-4" />
                        Contact User
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePage;
