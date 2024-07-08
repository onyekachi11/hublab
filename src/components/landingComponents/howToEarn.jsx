import { Image } from "iconsax-react";
import { HowToEarnCards } from "@/components";

const HowToEarn = () => {
  return (
    <div className="w-full h-full">
      <section className="max-w-[1440px] bg-earnBg mx-auto px-[MIN(100px,8%)] flex flex-col gap-5 md:gap-12 py-4 md:py-24">
        <h2 className="font-medium text-2xl md:text-5xl color text-primary text-center my-4">
          How To Earn on Verxio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5"> 
          <HowToEarnCards
            headingText={"Quest"}
            description={
              "Learn and familiarise yourself with various aspects of cryptocurrency"
            }
            imageURL={"/images/questImage.svg"}
            className={
              "border-2 rounded-tr-[60px] rounded-bl-[20px] md:rounded-bl-[60px] bg-[#91DBF8] border-[#00ADEF]"
            }
            headingTextColor={"text-[#fff]"}
            descriptionColor="#212121"
          />
          <HowToEarnCards
            headingText={"Bounties"}
            description={
              "Undertake tasks to contribute and to the protocol community and ecosystem"
            }
            imageURL={"/images/bountiesImage.svg"}
            className={
              "border-2 rounded-tl-[60px] rounded-br-[20px] md:rounded-br-[60px] bg-[#FF8ADF] border-[#EF00AD]"
            }
          />

          <HowToEarnCards
            headingText={"Contest"}
            description={"Showcase your skills, creativity, and expertise."}
            imageURL={"/images/contestImage.svg"}
            className={
              "border-2 rounded-tl-[60px] rounded-br-[20px] md:rounded-br-[60px] bg-[#DFFF8A] border-[#89BD00]"
            }
          />
          <HowToEarnCards
            headingText={"Projects"}
            description={
              "Work together and achieve a common goal or objective."
            }
            imageURL={"/images/projectsImage.svg"}
            className={
              "border-2 rounded-tr-[60px] rounded-bl-[20px] md:rounded-bl-[60px] bg-[#A2A4E7] border-[#2E31AC]"
            }
          />
        </div>

        <section className="relative bg-[#F3F3FC] w-full h-full flex flex-col items-center md:flex-row border-2 border-primary rounded-full">
          <div className="absolute z-[-1] right-[5px] bottom-[5px] border-2 rounded-full border-[#151751] h-full w-full"></div>

          <div className="w-full flex flex-col items-center gap-2 border-b md:border-b-0 md:border-r border-primary p-12 transition-all ease-in duration-600 cursor-pointer hover:scale-[1.02] hover:-skew-y-3">
            <Image
              src={"/images/verxioRefer.svg"}
              width={100}
              height={100}
              alt="refer"
            />
            <p className="text-[#151751] font-normal text-2xl md:text-3xl">
              Verxio Refer
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-2 border-t md:border-t-0 md:border-l border-primary p-12 transition-all ease-in duration-600 cursor-pointer hover:scale-[1.02] hover:skew-y-3">
            <Image
              src={"/images/verxioPlay.svg"}
              width={100}
              height={100}
              alt="play"
            />
            <p className="text-[#151751] font-normal text-2xl md:text-3xl">
              Verxio Play
            </p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default HowToEarn;
