"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  return (
    <div
      onClick={searchModal.onOpen}
      className="
      border-[1px]
      w-full
      md:w-auto
      shadow-sm
      hover:shadow-md
      transition
      cursor-pointer
      rounded-full
      py-2
    "
    >
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm font-semibold px-6 hover:text-rose-500">
          Anywhere
        </div>

        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center hover:text-rose-500">
          Any Week
        </div>

        <div className="text-sm pl-6 pr-3 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block hover:text-rose-500">Add Guests</div>

          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
