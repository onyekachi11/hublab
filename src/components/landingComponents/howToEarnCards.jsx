import Image from "next/image";
import { twMerge } from "tailwind-merge";

const HowToEarnCards = ({
  headingText,
  headingColor,
  imageURL,
  description,
  descriptionColor,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col md:flex-row items-center justify-center gap-8 p-10 transition-all ease-in duration-600 hover:scale-[1.07] cursor-pointer",
        className
      )}
    >
      <Image src={imageURL} alt={`${headingText}`} width={150} height={150} />
      <div className="flex flex-col gap-3 items-start md:text-left text-center">
        <h2
          className={`font-medium md:text-left text-center mx-auto md:mx-0 text-2xl md:text-4xl ${headingColor}`}
        >
          {headingText}
        </h2>

        <p className={`font-normal text-[20px] ${descriptionColor}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default HowToEarnCards;
