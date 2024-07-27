"use client";
import React, { useRef, useState } from "react";
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
import { initContract } from "@/utils/initCotract";
import { getEmbeddedSchema } from "@/utils/getEmbededSchema";

const Details = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const { connection, account, contract, moduleSchemaBase64Embedded } =
    useWallet();

  const initialValues = {
    title: "",
    description: "",
    nationality: [],
    lower: 0,
    upper: 0,
  };

  const options = country.map((item) => ({
    value: `${item.alpha2}`.toUpperCase(),
    label: `${item.en} - ${item.alpha2}`.toUpperCase(),
  }));

  function createCampaign(connection, account, amount, value) {
    let year = 2022;

    let upper = year - value.upper + "1212";
    let lower = year - value.lower + "1212";

    const params = {
      parameters: {
        title: value.title,
        description: value.description,
        nationality: value.nationality,
        age_range: {
          lower: lower,
          upper: upper,
        },
      },
      schema: moduleSchemaFromBase64(moduleSchemaBase64Embedded),
    };

    // Sign and send the transaction
    return connection?.signAndSendTransaction(
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
    );
  }
  return (
    <section className="w-full">
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

      <Formik onSubmit={() => {}} initialValues={initialValues}>
        {({ values, setFieldValue }) => (
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
              </div>
              <div>
                <p className="font-medium text-[#303036] mb-3">
                  Campaign Description
                </p>
                <Field
                  className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#60606C]"
                  name="description"
                  as="textArea"
                  placeholder="desribe your campaign"
                />
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
                  }}
                  options={options}
                  isMulti
                />
              </div>
              <div className="space-y-3 my-5">
                <p className="font-medium text-[#303036]">Age Range</p>
                <div className="flex gap-3">
                  <div className="">
                    <p>From</p>
                    <Field
                      name="upper"
                      type="number"
                      placeholder="from"
                      className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#60606C]"
                    />
                  </div>
                  <div>
                    <p>To</p>
                    <Field
                      name="lower"
                      type="number"
                      placeholder="to"
                      className="border outline-none bg-transparent text-[#484851] font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#60606C]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="w-full">
              <Button
                name="Continue"
                onClick={() => {
                  console.log(connection);
                  createCampaign(
                    connection,
                    account,
                    CcdAmount.fromCcd(0),
                    values
                  );
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Details;
