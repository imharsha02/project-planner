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

const ProjectDescription = () => {
  const [username, setUsername] = useState<string>("");
  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/data");
        const data = await response.json();
        // Get the most recently registered user
        const latestUser = data[data.length - 1];
        if (latestUser) {
          setUsername(latestUser.username);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {username
                ? `${username}! Welcome to project planner`
                : "Welcome to project planner"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Click Continue and start planning your project
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowDialog(false)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TypographyH3 className="tracking-wide text-center py-2 mb-3">
        Describe your project
      </TypographyH3>
    </div>
  );
};

export default ProjectDescription;
