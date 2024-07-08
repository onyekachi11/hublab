"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components";
import { participantsData } from "@/utils/data";
import VerxioGold from "@/assets/VerxioCoin.svg";
import { Task } from "@/components/dashHomeComponents";
import Linkedin from "@/assets/linkedin-logo.svg";
import Discord from "@/assets/discord-logo.svg";
import Github from "@/assets/github-logo.svg";
import XLogo from "@/assets/X-logo.svg";
import Website from "@/assets/website-logo.svg";

const page = ({ params }) => {
  const [loading, setLoading] = useState(false);

  return (
    <section className="w-full h-full p-10">
      <section className="w-full h-full border rounded-lg flex flex-col items-start md:flex-row gap-3">
        {/* ID: {params?.[`campaignpreview-${id}`]} */}
        ID: {params?.["[campaignpreview-id"]}
        <section className="w-full h-full p-4 md:w-[60%]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <Image
              src={"/images/previewLogo.svg"}
              height={250}
              width={250}
              alt="campaign logo"
            />
            <Button name="Share" outline />
          </div>

          <div className="border-b py-[20px]">
            <h2 className="font-normal text-[#484851] text-[32px]">
              Launch Campaign:{" "}
              <span className="font-semibold text-[#484851]">
                Join LexiFay <br />
                200,000 VPoint
              </span>
            </h2>

            <blockquote className="flex flex-col md:flex-row items-start md:items-center gap-4 my-3">
              <button
                className={`py-2 px-6 rounded-lg border font-normal text-[14px] text-[#34A90B] border-[#34A90B] bg-[#DAFCDE]`}
              >
                Ongoing
              </button>
              <button
                className={`py-2 px-6 rounded-lg border font-normal text-[14px] text-[#484851] border-[#484851]`}
              >
                2024 April 02 - 2024 April 10
              </button>
            </blockquote>
          </div>

          <h2 className="text-primary font-semibold text-[28px] my-3">
            Description
          </h2>

          <p className="font-normal text-[18px] text-[#484851] my-3">
            Join Lexifay and embark on an exciting journey with us! We're
            thrilled to announce our latest campaign, where we're inviting 1000
            participants to become integral members of our thriving community.
            As part of this exclusive opportunity, each participant will receive
            200 points to kickstart their journey with Lexifay. Your mission?
            Simply join our various platforms and immerse yourself in the
            vibrant ecosystem we've cultivated. By joining us on this adventure,
            you'll not only gain access to cutting-edge technologies and
            groundbreaking projects but also forge meaningful connections with
            like-minded individuals passionate about the future of Web 3.
          </p>

          <p className="font-normal text-[18px] text-[#484851] my-3">
            As part of this exclusive opportunity, each participant will receive
            200 points to kickstart their journey with Lexifay. Your mission?
            Simply join our various platforms and immerse yourself in the
            vibrant ecosystem we've cultivated
          </p>

          <p className="font-normal text-[18px] text-[#484851] my-3">
            By joining us on this adventure, you'll not only gain access to
            cutting-edge technologies and groundbreaking projects but also forge
            meaningful connections with like-minded individuals passionate about
            the future of Web 3.
          </p>

          <div className="flex flex-col gap-6">
            <h2 className="text-primary font-semibold text-[28px] my-3">
              Tasks
            </h2>

            <div className="flex flex-col gap-4 items-start">
              <Task
                logo={XLogo}
                name={"Twitter"}
                task={"follow @_lexifay on X"}
                taskLink={
                  "https://app.slack.com/client/T3M2U44GN/C3KMQ1L2V?cdn_fallback=2&force_cold_boot=1"
                }
              />
              <Task
                logo={XLogo}
                name={"Twitter"}
                task={"follow @_lexifaycommunity on X"}
                taskLink={
                  "https://app.slack.com/client/T3M2U44GN/C3KMQ1L2V?cdn_fallback=2&force_cold_boot=1"
                }
              />
              <Task
                logo={Discord}
                name={"Discord"}
                task={"follow @_lexifay on Discord"}
                taskLink={
                  "https://app.slack.com/client/T3M2U44GN/C3KMQ1L2V?cdn_fallback=2&force_cold_boot=1"
                }
              />
              <Task
                logo={Github}
                name={"Github"}
                task={"follow @_lexifaycommunity on Discord"}
                taskLink={
                  "https://app.slack.com/client/T3M2U44GN/C3KMQ1L2V?cdn_fallback=2&force_cold_boot=1"
                }
              />
              <Task
                logo={Website}
                name={"Website"}
                task={"follow @_lexifay on their Website"}
                taskLink={
                  "https://app.slack.com/client/T3M2U44GN/C3KMQ1L2V?cdn_fallback=2&force_cold_boot=1"
                }
              />
              <Task
                logo={Linkedin}
                name={"Website"}
                task={"follow @_lexifaycommunity on LinkedIn"}
                taskLink={
                  "https://app.slack.com/client/T3M2U44GN/C3KMQ1L2V?cdn_fallback=2&force_cold_boot=1"
                }
              />
            </div>
          </div>
        </section>
        <section className="w-full h-full border-l md:w-[40%]">
          <div className="p-6 border-b py-8">
            <div className="relative mb-7">
              <div className="border border-primary bg-white rounded-lg px-5 relative z-50">
                <p className="text-[30px] ">
                  Points: <span className="font-bold">200</span>
                </p>
                <div className="flex justify-center py-7">
                  <Image alt="coin" src={VerxioGold} className="w-[200px]" />
                </div>
              </div>
              <div className="rounded-lg border border-primary h-full absolute w-full top-[6px] left-[6px] "></div>
            </div>
            <Button
              name="claim rewards"
              // onClick={() => handleClaimRewards(total)}
              isLoading={loading}
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <p className="text-[24px] font-bold">Participants</p>
              <p className="border rounded p-1 px-2">
                +<span>101</span>
              </p>
              {/* <p className="border rounded p-1 px-2">
                +<span>{reward?.participants.toLocaleString()}</span>
              </p> */}
            </div>
            <div className="flex items-center gap-3 flex-wrap my-5">
              {participantsData.map((item, index) => (
                <Link
                  className={
                    "cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in"
                  }
                  key={index}
                  href={"/participants/profile"}
                >
                  <Image
                    src={item.imgUrl}
                    height={50}
                    width={50}
                    alt={"user profile"}
                  />
                </Link>
              ))}
            </div>

            <Button
              name="Delete Campaign"
              outline
              // onClick={() => handleClaimRewards(total)}
              // isLoading={loading}
            />
          </div>
        </section>
      </section>
    </section>
  );
};

export default page;
