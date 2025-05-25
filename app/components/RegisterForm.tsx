// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { API_URL } from "@/lib/config";

// // Changed profilePic to be optional and of type File | null
// const formSchema = z.object({
//   username: z
//     .string()
//     .min(2, "Username must be at least 2 characters.")
//     .max(50, "Username must not exceed 50 characters."),
//   email: z.string().email("Invalid email address."), // Added email validation
//   password: z.string().min(8, "Password must be at least 8 characters."),
//   profilePic: z.any().optional(), // Using z.any() for file input, validation will be custom
// });

// export default function RegisterForm() {
//   const router = useRouter();
//   const [error, setError] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null); // State to hold the selected file

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//       // profilePic will be handled separately
//     },
//   });

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     } else {
//       setFile(null);
//     }
//   };

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     if (!file) {
//       setError("Profile picture is required.");
//       return;
//     }

//     try {
//       setError(null); // Clear any previous errors

//       const formData = new FormData();
//       formData.append("username", values.username);
//       formData.append("email", values.email);
//       formData.append("password", values.password);
//       formData.append("profilePic", file); // Append the file

//       const res = await fetch(`${API_URL}/api/data`, {
//         method: "POST",
//         // No 'Content-Type' header when sending FormData, it's set automatically
//         body: formData,
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(result.error || "Failed to register");
//       }

//       console.log("User registered successfully:", result);
//       // Redirect to ProjectDescription page after successful registration
//       router.push("/project-description");
//     } catch (err) {
//       console.error("Registration error:", err);
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8 mx-auto my-3"
//       >
//         {error && (
//           <div
//             className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative"
//             role="alert"
//           >
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
//         {/* Username 👇 */}
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Username</FormLabel>
//               <FormControl>
//                 <Input placeholder="Username" {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is your public display name.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {/* Email 👇 */}
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="Email" {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is the mail we use to contact you
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Password 👇 */}
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input placeholder="Password" type="password" {...field} />
//               </FormControl>
//               <FormDescription>Enter your password</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {/* profilePic 👇 */}
//         <FormField
//           control={form.control}
//           name="profilePic"
//           render={() => (
//             // No need to spread field here, handle onChange manually
//             <FormItem>
//               <FormLabel>Profile pic</FormLabel>
//               <FormControl>
//                 <Input type="file" onChange={handleFileChange} />
//               </FormControl>
//               <FormDescription>Upload your profile pic</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full">
//           Add user
//         </Button>
//       </form>
//     </Form>
//   );
// }

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";

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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_URL } from "@/lib/config";
import { Loader2, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(50, "Username must not exceed 50 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  profilePic: z.any().optional(),
});

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
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
    if (!file) {
      setError("Profile picture is required.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("profilePic", file);

      const res = await fetch(`${API_URL}/api/data`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to register");
      }

      console.log("User registered successfully:", result);
      router.push("/project-description");
    } catch (err) {
      console.error("Registration error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
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
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  We&apos;ll use this to contact you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Create a secure password"
                  type="password"
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Must be at least 8 characters long.
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
              <FormLabel className="text-sm font-medium">
                Profile Picture
              </FormLabel>
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
              <FormDescription className="text-xs">
                Upload a profile picture (JPG, PNG, or GIF).
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

        <Button
          type="submit"
          className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
