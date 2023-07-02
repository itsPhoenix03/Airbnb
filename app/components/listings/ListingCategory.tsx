"use client";

import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  description: string;
  label: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  description,
  label,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4 items-center">
        <Icon size={25} className="text-rose-500" />

        <div className="flex flex-col">
          <p className=" text-sm font-semibold">{label}</p>
          <span className="text-xs text-neutral-500">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
