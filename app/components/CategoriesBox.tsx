"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoriesBoxProps {
  label: string;
  icon: IconType;
  description: string;
  selected?: boolean;
}

const CategoriesBox: React.FC<CategoriesBoxProps> = ({
  label,
  icon: Icon,
  description,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) delete updatedQuery.category;

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [router, params, label]);

  return (
    <div
      onClick={handleClick}
      className={`
    flex flex-col items-center justify-center gap-2 border-b-2 p-3 hover:text-neutral-800 transition cursor-pointer
    ${selected ? "text-neutral-800" : "text-neutral-500"} ${
        selected ? "border-b-neutral-800" : "border-transparent"
      }
  `}
    >
      <Icon size={26} />
      <p className="font-medium text-sm">{label}</p>
    </div>
  );
};

export default CategoriesBox;
