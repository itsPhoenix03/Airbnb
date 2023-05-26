"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
            rounded-xl
            border-2
            p-4
            flex
            flex-row
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? "border-black" : "border-neutral-200"}
        `}
    >
      <Icon size={30} />
      <span className="font-semibold">{label}</span>
    </div>
  );
};

export default CategoryInput;
