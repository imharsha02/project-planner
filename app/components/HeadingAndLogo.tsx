// "use client";
// import { TypographyH3 } from "./Typography/TypographyH3";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// const HeadingAndLogo = () => {
//   const pathname = usePathname();
//   return pathname === "/" ? (
//     <div className="py-3 justify-between mx-auto px-2 flex items-center">
//       <Link href="/" title="Home">
//         <Image
//           width={40}
//           src="/images/logo.png"
//           height={45}
//           alt="planner_logo"
//         />
//       </Link>
//       <TypographyH3 className="tracking-wide w-full text-center">
//         ProfileHub
//       </TypographyH3>
//       <Button asChild>
//         <Link href="/get-started">Get started</Link>
//       </Button>
//     </div>
//   ) : (
//     <div className="py-3 justify-between mx-auto px-2 flex items-center">
//       <Link href="/" title="Home">
//         <Image
//           width={40}
//           src="/images/logo.png"
//           height={45}
//           alt="planner_logo"
//         />
//       </Link>
//       <TypographyH3 className="tracking-wide w-full text-center">
//         ProfileHub
//       </TypographyH3>
//     </div>
//   );
// };

// export default HeadingAndLogo;

// {
//   /* <div className="py-3 justify-between mx-auto px-2 flex items-center">
//       <Link href="/" title="Home">
//         <Image
//           width={40}
//           src="/images/logo.png"
//           height={45}
//           alt="planner_logo"
//         />
//       </Link>
//       <TypographyH3 className="tracking-wide w-full text-center">
//         Planner
//       </TypographyH3>
//     </div> */
// }
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ProfileHub
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/profiles" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Profiles
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* User Avatar with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Get Started Button */}
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
            >
              <Link href="/get-started">Get Started</Link>
            </Button>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer">
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profiles" className="cursor-pointer">
                    Profiles
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about" className="cursor-pointer">
                    About
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
