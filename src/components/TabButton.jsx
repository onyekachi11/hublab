import Link from "next/link";

const TabButton = ({ name, href, isActive }) => (
  <Link
    href={href}
    className={`text-[#787887] font-normal text-sm${
      isActive
        ? "bg-[#DFDFF7] shadow text-[#2C30AA] border-b border-[#2C30AA] font-bold bg"
        : "bg-transparent"
    } px-8 py-2`}
  >
    {name}
  </Link>
);

export default TabButton;
