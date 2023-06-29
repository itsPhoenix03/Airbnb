"use client";

import { SafeUser } from "@/app/types";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingImageProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingImage: React.FC<ListingImageProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
}) => {
  return (
    <div className="relative w-full h-[60vh] rounded-xl overflow-hidden">
      <Image src={imageSrc} alt={title} fill className="object-cover w-full" />

      <div className="absolute top-5 right-5">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default ListingImage;
