"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/config";
import { Loader2, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(50, "Username must not exceed 50 characters."),
  email: z.string().email("Invalid email address."),
  profilePic: z.any().optional(),
});

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    username: string;
    email: string;
    profilePic: string | null;
    id: string;
  };
  onProfileUpdate: (updatedUser: {
    username: string;
    email: string;
    profilePic: string | null;
  }) => void;
}

export function EditProfileDialog({
  isOpen,
  onClose,
  currentUser,
  onProfileUpdate,
}: EditProfileDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: currentUser.username,
      email: currentUser.email,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      if (file) {
        formData.append("profilePic", file);
      }

      // Append user ID to the form data
      formData.append("userId", currentUser.id);

      const response = await fetch(`${API_URL}/api/data`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update profile");
      }

      const updatedUser = await response.json();
      onProfileUpdate(updatedUser);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while updating profile"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the email we use to contact you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profilePic"
              render={() => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        onChange={handleFileChange}
                        className="h-11 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept="image/*"
                      />
                      <Upload className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a new profile picture (optional).
                  </FormDescription>
                  <FormMessage />
                  {file && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ {file.name} selected
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
