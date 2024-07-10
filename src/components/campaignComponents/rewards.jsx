"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components";
import { ArrowDown2, ArrowSquareUp, ArrowUp2 } from "iconsax-react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Rewards = () => {
  const [revealMethod, setRevealMethod] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleSelectMethod = (label, src) => {
    setSelectedMethod(label);
    setSelectedIcon(src);
    setRevealMethod(false);
  };

  const method = [
    {
      label: "First Come First Serve (FCFS)",
      value: "fcfs",
      src: "/images/fcfs.svg",
    },
    {
      label: "Everyone",
      value: "everyone",
      src: "/images/everyoneMethod.svg",
    },
    {
      label: "Stake Holders",
      value: "stakeHolders",
      src: "/images/raffle.svg",
    },
  ];

  return (
    <Formik onSubmit={() => {}}>
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-8">
          <div className="w-full p-2 rounded-lg">
            <div className="rounded-lg p-3 mb-10 shadow ">
              <h2 className="font-semibold text-lg mb-2 text-[#0D0E32]">
                Reward Details
              </h2>
              <p className="font-normal text-sm text-[#0D0E32]">
                Add rewards and number of winners to be rewarded
              </p>
            </div>

            <section>
              <div className="my-5">
                <p className="font-medium text-[#303036] mb-3">
                  Number of participants to be Rewarded
                </p>
                <Field
                  className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#60606C]"
                  name="title"
                  placeholder="10,000"
                />
              </div>

              <div className="my-5">
                <p className="font-medium text-[#303036] mb-3">
                  Method of Reward
                </p>

                <div className="relative h-[50px] rounded-lg">
                  <span className="absolute top-2 left-2">
                    {selectedIcon ? (
                      <Image
                        src={selectedIcon}
                        height={30}
                        width={30}
                        alt="selected method"
                        className="inline"
                      />
                    ) : (
                      <ArrowSquareUp size="32" color="#60606C" />
                    )}
                  </span>
                  <Field
                    className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full h-full px-5 py-3 pl-12 border-[#60606C]"
                    name="title"
                    placeholder={selectedMethod || "Select method of reward"}
                  />
                  <span
                    onClick={() => setRevealMethod(!revealMethod)}
                    className="cursor-pointer transition-all duration-300 ease absolute top-4 right-4"
                  >
                    {revealMethod ? (
                      <ArrowUp2 size="16" color="#484851" />
                    ) : (
                      <ArrowDown2 size="16" color="#484851" />
                    )}
                  </span>

                  {revealMethod && (
                    <div className="shadow-sm bg-white w-full py-3 px-1 rounded relative  z-[999]">
                      {method.map(({ label, src }, index) => {
                        return (
                          <div
                            className="relative h-[50px] rounded-lg mb-3"
                            onClick={() => handleSelectMethod(label, src)}
                            key={index}
                          >
                            <span className="absolute top-2 left-3">
                              <Image
                                src={src}
                                height={30}
                                width={30}
                                alt="champ"
                                className="inline"
                              />
                            </span>

                            <Field
                              className="border cursor-pointer outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full h-full  px-5 py-3 pl-14 border-[#60606C]"
                              name="title"
                              onClick={() => setRevealMethod(false)}
                              placeholder={label}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <section className="w-full flex flex-col gap-3 md:flex-row items-start md:items-center">
                <div className="w-full md:w-1/2 my-5">
                  <p className="font-medium text-[#303036] mb-3">
                    Amount for each winner
                  </p>
                  <Field
                    className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#60606C]"
                    name="title"
                    placeholder="250"
                  />
                </div>
                <div className="w-full md:w-1/2 my-5">
                  <p className="font-medium text-[#303036] mb-3">
                    Total Number of rewards
                  </p>
                  <Field
                    className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#60606C]"
                    name="title"
                    placeholder="200,000"
                  />
                </div>
              </section>
            </section>

            <div className="w-full">
              <Button
                name="Continue"
                href={"/dashboard/campaign/create_campaign?route=action"}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Rewards;
