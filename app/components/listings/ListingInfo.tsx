"use client";

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";

interface ListingInfoParams {
  user: SafeUser;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  description: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

const ListingInfo: React.FC<ListingInfoParams> = ({
  user,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  description,
  category,
}) => {
  return <div></div>;
};

export default ListingInfo;
