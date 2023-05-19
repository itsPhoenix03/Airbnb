"use client";

import Image from "next/image";

// TODO Bring the placeholder image

const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      width="30"
      height="30"
      alt="Your Profile Image for Booking.io Account"
      src={"/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
