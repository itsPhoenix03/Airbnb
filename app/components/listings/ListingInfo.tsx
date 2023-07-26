"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Heading from "../Heading";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

//! Import the Map Module
const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoParams {
  user: SafeUser;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  description: string;
  title: string;
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
  title,
  category,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center font-semibold text-sm gap-2">
          <span>Hosted by {user?.name}</span>
          <Avatar src={user?.image} />
        </div>

        <div className="flex flex-row items-center text-neutral-500 gap-4 font-light text-xs">
          <span>{guestCount} guest&#39s</span>
          <span>{roomCount} room&#39s</span>
          <span>{bathroomCount} bathroom&#39s</span>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          description={category.description}
          label={category.label}
        />
      )}

      <hr />

      <p className="text-sm text-neutral-500 font-light">{description}</p>

      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
