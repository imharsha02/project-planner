"use client";
import { useEffect, useState } from "react";
import { TypographyH3 } from "../components/Typography/TypographyH3";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { API_URL } from "@/lib/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, User, Sparkles, Edit } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EditProfileDialog } from "../components/EditProfileDialog";

interface UserData {
  username: string;
  email: string;
  profilePic: string | null;
}

const ProjectDescription = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/data`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        const latestUser = data[data.length - 1];
        if (latestUser) {
          setUserData(latestUser);

          const hasSeenWelcome = localStorage.getItem(
            `welcomeSeen_${latestUser.username}`
          );
          if (!hasSeenWelcome) {
            setShowDialog(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDialogClose = () => {
    if (userData) {
      localStorage.setItem(`welcomeSeen_${userData.username}`, "true");
    }
    setShowDialog(false);
  };

  const handleProfileUpdate = (updatedUser: UserData) => {
    setUserData(updatedUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-lg text-gray-600">Loading your profile...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        ) : userData ? (
          <>
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <AlertDialogTitle className="text-center text-2xl">
                    Welcome, {userData.username}!
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-base">
                    You&apos;re all set! Your profile has been created
                    successfully. Let&apos;s start planning your amazing
                    projects together.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    onClick={handleDialogClose}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Let&apos;s Get Started
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="max-w-4xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-12">
                <TypographyH3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Your Profile
                </TypographyH3>
                <p className="text-gray-600 text-lg">
                  Welcome to your personal dashboard
                </p>
              </div>

              {/* Profile Card */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Avatar Section */}
                <div className="lg:col-span-1">
                  <Card className="border-0 shadow-xl">
                    <CardContent className="p-8 text-center">
                      <div className="relative inline-block mb-6">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                          <AvatarImage
                            src={
                              userData.profilePic ||
                              "https://github.com/shadcn.png"
                            }
                            alt={userData.username}
                          />
                          <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            {userData.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600">
                          Active
                        </Badge>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {userData.username}
                      </h2>
                      <p className="text-gray-600 mb-6">Project Planner</p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowEditDialog(true)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Details Section */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-xl">
                    <CardHeader className="pb-6">
                      <CardTitle className="text-2xl flex items-center">
                        <User className="mr-3 h-6 w-6 text-blue-600" />
                        Profile Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm font-medium text-gray-500 uppercase tracking-wide">
                            <User className="mr-2 h-4 w-4" />
                            Username
                          </div>
                          <p className="text-xl font-semibold text-gray-900">
                            {userData.username}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-sm font-medium text-gray-500 uppercase tracking-wide">
                            <Mail className="mr-2 h-4 w-4" />
                            Email Address
                          </div>
                          <p className="text-xl font-semibold text-gray-900">
                            {userData.email}
                          </p>
                        </div>
                      </div>

                      {/* Stats Section */}
                      <div className="border-t pt-8">
                        <h3 className="text-lg font-semibold mb-4">
                          Quick Stats
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              0
                            </div>
                            <div className="text-sm text-gray-600">
                              Projects
                            </div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">
                              0
                            </div>
                            <div className="text-sm text-gray-600">Tasks</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              0
                            </div>
                            <div className="text-sm text-gray-600">
                              Completed
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start New Project
                </Button>
                <Button variant="outline" size="lg">
                  View All Projects
                </Button>
              </div>
            </div>

            {/* Edit Profile Dialog */}
            <EditProfileDialog
              isOpen={showEditDialog}
              onClose={() => setShowEditDialog(false)}
              currentUser={userData}
              onProfileUpdate={handleProfileUpdate}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectDescription;
