"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { supabase } from "@/lib/supabaseClient"; // adjust path as needed

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(3),
  password: z.string().min(8),
  profilePic: z.any().optional(),
});
export function RegisterForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      profilePic: "",
    },
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);
  //   setUsers(values);
  // }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let profilePicUrl = "";

      // If a file is selected, upload it
      if (values.profilePic && values.profilePic instanceof File) {
        const file = values.profilePic;
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("profile-pic") // your bucket name
          .upload(filePath, file);

        if (uploadError) {
          alert("Failed to upload image");
          return;
        }

        // Get public URL
        const { data } = supabase.storage
          .from("profile-pic")
          .getPublicUrl(filePath);

        profilePicUrl = data.publicUrl;
      }

      // Now send the user data with the image URL to your backend
      const res = await fetch("http://localhost:3001/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          profile_pic: profilePicUrl, // send the URL, not the file
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to register");
      }

      console.log("User registered successfully:", result);
      // You can add navigation or success message here
    } catch (err) {
      console.error("Registration error:", err);
      // You can add error handling UI feedback here
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mx-auto"
      >
        {/* Username 👇 */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} className="w-1/2" />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email 👇 */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} className="w-1/2" />
              </FormControl>
              <FormDescription>
                This is the mail we use to contact you
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password 👇 */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  {...field}
                  className="w-1/2"
                />
              </FormControl>
              <FormDescription>Enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profile pic 👇 */}
        <FormField
          control={form.control}
          name="profilePic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile pic</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) {
                      field.onChange(""); // No file selected
                      return;
                    }
                    if (!file.type.startsWith("image/")) {
                      alert("Please select a valid image file.");
                      e.target.value = ""; // Clear the input
                      field.onChange(""); // Clear the form value
                      return;
                    }
                    field.onChange(file); // Only set if it's an image
                  }}
                  className="w-1/2"
                />
              </FormControl>
              <FormDescription>Add your profile pic</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-1/2">
          Register
        </Button>
      </form>
    </Form>
  );
}
