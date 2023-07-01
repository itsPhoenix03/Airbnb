"use client";

import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div
      className="
    bg-white
    rounded-xl
    border-[1px]
    border-neutral-200
    overflow-hidden
  "
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <span className="text-md font-semibold">$ {price}</span>
        <span className="text-xs text-neutral-600">/ nights</span>
      </div>

      <hr />

      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value)}
      />
    </div>
  );
};

export default ListingReservation;
