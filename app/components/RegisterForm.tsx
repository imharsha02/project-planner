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
      // If a file is selected, upload it

      // Now send the user data with the image URL to your backend
      const res = await fetch("http://localhost:3001/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
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

        <Button type="submit" className="w-1/2">
          Register
        </Button>
      </form>
    </Form>
  );
}
