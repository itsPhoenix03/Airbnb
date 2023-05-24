"use client";

import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiBoatFishing,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import CategoriesBox from "../CategoriesBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is having windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is mordern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the Counrtyside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This property is on a island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Aritic",
    icon: BsSnow,
    description: "This property is located in the polar region!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is located inside a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is located in a desert!",
  },
  {
    label: "Barn",
    icon: GiBarn,
    description: "This property is located in a barn!",
  },
  {
    label: "Luxurious",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex flex-row itmes-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoriesBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
