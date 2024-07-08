import { IoClose } from "react-icons/io5";

const InputOptions = ({ value }) => {
  return (
    <div className="w-full h-full relative">
      <input
        type="text"
        className="rounded-lg w-full outline-none bg-inherit p-2 border border-primary placeholder:text-normal placeholder:text-[16px] placeholder:text-[#787887]"
        placeholder={value}
      />
      <span className="absolute top-3 right-[3%] cursor-pointer">
        <IoClose />
      </span>
    </div>
  );
};
export default InputOptions;
