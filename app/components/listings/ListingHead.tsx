"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  currentUser,
  id,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return <div>Listing Head</div>;
};

export default ListingHead;
