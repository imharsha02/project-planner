"use client";
import { TypographyH3 } from "./Typography/TypographyH3";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const HeadingAndLogo = () => {
  const pathname = usePathname();
  return pathname === "/" ? (
    <div className="py-3 justify-between mx-auto px-2 flex items-center">
      <Link href="/" title="Home">
        <Image
          width={40}
          src="/images/logo.png"
          height={45}
          alt="planner_logo"
        />
      </Link>
      <TypographyH3 className="tracking-wide w-full text-center">
        Planner
      </TypographyH3>
      <Button asChild>
        <Link href="/get-started">Get started</Link>
      </Button>
    </div>
  ) : (
    <div className="py-3 justify-between mx-auto px-2 flex items-center">
      <Link href="/" title="Home">
        <Image
          width={40}
          src="/images/logo.png"
          height={45}
          alt="planner_logo"
        />
      </Link>
      <TypographyH3 className="tracking-wide w-full text-center">
        Planner
      </TypographyH3>
    </div>
  );
};

export default HeadingAndLogo;

{
  /* <div className="py-3 justify-between mx-auto px-2 flex items-center">
      <Link href="/" title="Home">
        <Image
          width={40}
          src="/images/logo.png"
          height={45}
          alt="planner_logo"
        />
      </Link>
      <TypographyH3 className="tracking-wide w-full text-center">
        Planner
      </TypographyH3>
    </div> */
}
