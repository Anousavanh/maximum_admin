"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-black-1 shadow-xl max-lg:hidden">
      {/* <Image src="/logo.png" alt="logo" width={150} height={70} /> */}
      <a className="text-heading2-bold text-white-1" href="/">
        Maximum 
        
      </a>

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-white-1" : "text-grey-1"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p className="text-white-1">Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
