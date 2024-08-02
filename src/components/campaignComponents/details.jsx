"use client";
import React, { useEffect, useRef, useState } from "react";
import campaignBanner from "@/assets/campaignBanner.svg";
import Image from "next/image";
import UploadIcon from "../../assets/uploadIcon.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components";
import country from "world_countries_lists/data/countries/_combined/countries.json";
import Select from "react-select";
import {
  AccountTransactionType,
  CcdAmount,
  ContractAddress,
  Energy,
  EntrypointName,
  ReceiveName,
} from "@concordium/web-sdk";
import {
  DEFAULT_CONTRACT_INDEX,
  MAX_CONTRACT_EXECUTION_ENERGY,
} from "@/config";
import { useWallet } from "@/context";
import { moduleSchemaFromBase64 } from "@concordium/react-components";
import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Formikerror from "../formikerror";
import { toast } from "react-toastify";
import Info from "../../assets/info.png";

const Details = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [tasks, setTask] = useState([]);

  const {
    connection,
    account,
    contract,
    moduleSchemaBase64Embedded,
    fetchCampaign,
  } = useWallet();

  const router = useRouter();

  const initialValues = {
    title: "",
    description: "",
    nationality: [],
    task: "",
    allTask: [],
    lower: "",
    upper: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    nationality: Yup.array()
      .min(1, "At least one nationality is required")
      .required("Nationality is required"),
    allTask: Yup.array()
      .min(1, "At least one task is required")
      .required("Task is required"),
    lower: Yup.number()
      .min(
        Yup.ref("upper"),
        "Upper age must be greater than or equal to lower age"
      )
      .required("Upper age is required"),
    upper: Yup.number()
      .min(18, "Lower age must be at least 18")
      .required("Lower age is required"),
  });

  const options = country.map((item) => ({
    value: `${item.alpha2}`.toUpperCase(),
    label: `${item.en} - ${item.alpha2}`.toUpperCase(),
  }));

  const createCampaign = (connection, account, amount, value) => {
    let year = 2022;

    let upper = year - value.upper + "1212";
    let lower = year - value.lower + "1212";

    const params = {
      parameters: {
        title: value.title,
        description: value.description,
        nationality: value.nationality,
        tasks: value.allTask,
        age_range: {
          lower: lower,
          upper: upper,
        },
      },
      schema: moduleSchemaFromBase64(moduleSchemaBase64Embedded),
    };

    // Sign and send the transaction
    return connection
      ?.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
          amount,
          address: ContractAddress.create(contract.index, 0),
          receiveName: ReceiveName.create(
            contract.name,
            EntrypointName.fromString("create_campaign")
          ),
          maxContractExecutionEnergy: Energy.create(
            MAX_CONTRACT_EXECUTION_ENERGY
          ),
        },
        params
      )
      .then((transactionHash) => {
        toast.success(`Campaign created successfully", ${transactionHash}`);
        fetchCampaign();
        return transactionHash;
      })
      .catch((error) => {
        console.error("Error creating campaign:", error);
        toast.error("Error creating campaign. Please try again.");
        throw error;
      });
  };

  // useEffect(() => {
  //   if (account && contract) {
  //     fetchCampaign();
  //   }

  //   return () => {
  //     // cleanup
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [account, contract]);

  return (
    <section className="w-full">
      <div
        className="border border-primary rounded-full p-3 w-[50px] mb-3 "
        onClick={() => router.back()}
      >
        <ArrowLeft />
      </div>
      <div
        className="rounded-lg p-5 mb-10  "
        style={{
          backgroundImage: `url(${campaignBanner.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="font-semibold text-3xl mb-2 text-[#FBFBFE]">
          General Information
        </h2>
        <p className="font-normal text-lg text-[#FBFBFE]">
          Basic Information about your campaign
        </p>
      </div>

      <Formik
        onSubmit={() => {}}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, isValid, dirty, setFieldError, errors }) => (
          <Form className="flex flex-col gap-8">
            <div className="flex gap-4 flex-col">
              <div>
                <p className="font-medium text-[#303036] mb-3">
                  Campaign Title
                </p>
                <Field
                  className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#60606C]"
                  name="title"
                  placeholder="e.g Groupy share token contest"
                />
                <ErrorMessage name="title" component={Formikerror} />
              </div>
              <div>
                <p className="font-medium text-[#303036] mb-3">
                  Campaign Description
                </p>
                <Field
                  className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#60606C]"
                  name="description"
                  as="textarea"
                  placeholder="desribe your campaign"
                />
                <ErrorMessage name="description" component={Formikerror} />
              </div>
            </div>

            <div>
              <div className="flex gap-5 mb-3 items-center">
                <p className=" text-[#303036] font-bold text-[18px]">Tasks</p>
              </div>

              <p className="font-medium text-[#303036] mb-3"> Describe to-do</p>
              <div className="flex gap-2 flex-wrap">
                {tasks.map((task, index) => (
                  <div key={index} className="flex gap-1 ">
                    <span>
                      {"("}
                      {index + 1}.{")"}
                    </span>
                    <p className="capitalize">{task}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <div className="flex w-full items-center gap-4">
                  <Field
                    className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-[500px] px-5 py-3 border-[#60606C]"
                    name="task"
                    placeholder="e.g Groupy share token contest"
                  />
                  <Button
                    name="Add task"
                    type="button"
                    onClick={() => {
                      tasks.push(values.task);
                      console.log(tasks);
                      setFieldValue("allTask", tasks);
                      setFieldValue("task", "");
                    }}
                  />
                </div>
                <ErrorMessage name="allTask" component={Formikerror} />
              </div>
            </div>

            <section>
              <p className="font-bold text-[18px] text-[#303036] my-3">
                Participants Specification
              </p>

              <div className="space-y-3 my-5">
                <p className="font-medium text-[#303036]">Nationality</p>
                <Select
                  defaultValue={selectedOption}
                  onChange={(selectedOption) => {
                    setSelectedOption(selectedOption);
                    setFieldValue(
                      "nationality",
                      selectedOption?.map((item) =>
                        `${item.value}`.toUpperCase()
                      )
                    );
                    setFieldError("nationality", errors.nationality);
                  }}
                  options={options}
                  isMulti
                />
                <ErrorMessage name="nationality" component={Formikerror} />
                <div className="flex gap-2 items-center text-xs">
                  <div className="w-[20px]">
                    <Image sizes="" src={Info} alt="Information" />
                  </div>
                  <p>
                    User are allowed to participate if they are on this list
                  </p>
                </div>
              </div>
              <div className="space-y-3 my-5">
                <p className="font-medium text-[#303036]">Age Range</p>
                <div className="flex gap-3">
                  <div className="">
                    <p>From</p>

                    <div className="flex flex-col">
                      <Field
                        name="upper"
                        type="number"
                        placeholder="from"
                        className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#60606C]"
                      />
                      <ErrorMessage name="upper" component={Formikerror} />
                    </div>
                  </div>
                  <div>
                    <p>To</p>
                    <div className="flex flex-col">
                      <Field
                        name="lower"
                        type="number"
                        placeholder="to"
                        className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#60606C]"
                      />
                      <ErrorMessage name="lower" component={Formikerror} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className=" flex w-full gap-5">
              <Button
                name="Publish"
                type="submit"
                className="w-[300px] text-base"
                onClick={() => {
                  console.log(values);
                  if (!account) {
                    toast.info("Connect your wallet");
                  } else if (isValid && dirty && account) {
                    createCampaign(
                      connection,
                      account,
                      CcdAmount.fromCcd(0),
                      values
                    );
                  }

                  // .then(() => toast.success("Campaign created successfully"))
                  // .catch((e) => toast.error(e.message));
                }}
              />
              <Button
                name="Cancel"
                onClick={() => {
                  router.back();
                }}
                className="w-[200px] text-base"
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Details;
