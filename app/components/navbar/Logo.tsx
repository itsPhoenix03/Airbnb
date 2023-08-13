"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <>
      <Image
        onClick={() => router.push("/")}
        className="hidden object-contain md:block cursor-pointer"
        alt="Airbnb Logo"
        width="100"
        height="100"
        src={"/images/logo.png"}
      />

      <Image
        onClick={() => router.push("/")}
        className="object-contain cursor-pointer md:hidden"
        alt="Airbnb Logo"
        width="35"
        height="35"
        src={"/images/icons8-airbnb-240.png"}
      />
    </>
  );
};

export default Logo;
