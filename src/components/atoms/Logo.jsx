import Image from "next/image";
import { twMerge } from "tailwind-merge";
import AxiosLogo from "../../assets/AxiosLogo.svg";

const Logo = ({ className }) => {
  return (
    <div className={twMerge(` max-w-[60p] w-[110px]`, className)}>
      <Image
        src={AxiosLogo}
        alt="Verxio logo"
        // className={twMerge(`w-full max-w-[60px]`, className)}
      />
    </div>
  );
};

export default Logo;
