"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h4 className="text-2xl font-bold">{title}</h4>
      <h6 className="font-light text-neutral-500 mt-2">{subtitle}</h6>
    </div>
  );
};

export default Heading;
