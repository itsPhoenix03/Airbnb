"use client";

interface MenuItemsProps {
  onClick: () => void;
  label: string;
}

const MenuItems: React.FC<MenuItemsProps> = ({ onClick, label }) => {
  return (
    <div
      className="px-4 py-3 font-semibold hover:bg-neutral-100 transition"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItems;
