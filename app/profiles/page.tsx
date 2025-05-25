"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Edit } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TypographyH3 } from "../components/Typography/TypographyH3";
import Link from "next/link";

interface UserProfile {
  username: string;
  email: string;
  profilePic: string | null;
}

const Profiles = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`${API_URL}/api/data`);
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const data = await response.json();
        setProfiles(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching profiles"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <TypographyH3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            User Profiles
          </TypographyH3>
          <p className="text-gray-600 text-lg">
            Discover and connect with other professionals
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-lg text-gray-600">Loading profiles...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((profile, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
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

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {profile.username}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-4">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm">{profile.email}</span>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/profiles/${profile.username}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profiles;
