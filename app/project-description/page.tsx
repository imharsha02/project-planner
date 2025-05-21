"use client";
import React, { useEffect, useState } from "react";
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
interface UserData {
  username: string;
  email: string;
}

const ProjectDescription = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showDialog, setShowDialog] = useState(false);
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
        // Get the most recently registered user
        const latestUser = data[data.length - 1];
        if (latestUser) {
          setUserData(latestUser);

          // Check local storage to see if this user has seen the welcome dialog
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

  // Function to handle dialog close and set local storage flag
  const handleDialogClose = () => {
    if (userData) {
      localStorage.setItem(`welcomeSeen_${userData.username}`, "true");
    }
    setShowDialog(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Loading your data...</p>
        </div>
      ) : error ? (
        <div
          className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      ) : userData ? (
        <>
          <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {userData.username}! Welcome to project planner
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Click Continue and start planning your project
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={handleDialogClose}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <TypographyH3 className="tracking-wide text-center py-2 mb-3">
            Describe your project
          </TypographyH3>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Card className="w-max">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold">Username</p>
                <p>{userData.username}</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p>{userData.email}</p>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No user data available
        </div>
      )}
    </div>
  );
};

export default ProjectDescription;
