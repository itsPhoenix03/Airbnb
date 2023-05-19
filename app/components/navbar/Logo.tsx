"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      className="hidden object-contain md:block cursor-pointer"
      alt="Airbnb Logo"
      width="100"
      height="100"
      src={"/images/logo.png"}
    />
  );
};

export default Logo;
