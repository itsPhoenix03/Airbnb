"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Heading from "../Heading";

interface ListingHeadProps {
  title: string;
  locationValue: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({ title, locationValue }) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
    </>
  );
};

export default ListingHead;
