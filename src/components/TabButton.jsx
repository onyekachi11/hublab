import Link from "next/link";

const TabButton = ({ name, href, isActive }) => (
  <Link
    href={href}
    className={`${
      isActive ? "bg-white text-primary" : "bg-transparent border-red-500"
    } px-8 py-1 border border-white rounded-[10px] text-[24px]`}
  >
    {name}
  </Link>
);

export default TabButton;
