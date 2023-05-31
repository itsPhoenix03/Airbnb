"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  value: number;
  title: string;
  subtitle: string;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  value,
  title,
  subtitle,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <p className="font-medium">{title}</p>
        <span className="font-light text-neutral-600">{subtitle}</span>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="
        w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 hover:opacity-80 cursor-pointer transition
      "
        >
          <AiOutlineMinus />
        </div>

        <span className="font-light text-neutral-600 text-xl">{value}</span>

        <div
          onClick={onAdd}
          className="
        w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 hover:opacity-80 cursor-pointer transition
      "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
