"use client";
import React, { useRef, useState } from "react";
import campaignBanner from "@/assets/campaignBanner.svg";
import Image from "next/image";
import UploadIcon from "../../assets/uploadIcon.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components";

const Details = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    await getImageDataUrl(file, setFieldValue);
  };

  const getImageDataUrl = async (file, setFieldValue) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Ibelachi_Test_Run");
    formData.append("api_key", "968631257356497");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/verxioaventor/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const results = await response.json();
      setFieldValue("bannerImg", results.url);
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };
  const fileInputRef = useRef(null);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

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

      <Formik onSubmit={() => {}}>
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

            {/* <div className="">
              <p className="font-medium text-[#303036] mb-3">Display Banner</p>

              <div className=" rounded-lg border border-primary border-dashed bg-[#E7E7F9]">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="cover Banner"
                    className="w-full h-full bg-cover"
                    width={500}
                    height={400}
                  />
                ) : (
                  <div className="mx-28 my-24 border rounded-lg px-2 py-1 border-[#0D0E32] ">
                    <div className="flex items-center gap-2 justify-center">
                      <Image alt="upload" src={UploadIcon} />
                      <button
                        className="text-[14px]"
                        onClick={handleUploadButtonClick}
                      >
                        Upload Image
                      </button>
                    </div>
                    <input
                      name="profileImageDoc"
                      type="file"
                      capture="environment"
                      className="hidden"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => {
                        handleImageChange(e, setFieldValue);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center text-[13px] mt-2">
                <p>PNG / SVG / JPEG / 120*804</p>
                <p>Max 24MB</p>
              </div>
            </div> */}

            <section>
              <p className="font-bold text-[18px] text-[#303036] my-3">
                Participants Specification
              </p>
              {/* <div className="flex flex-col items-start gap-3 my-5">
                <p className="font-medium text-[#303036]">
                  Participants Status
                </p>
                <select
                  className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                  // value={values.proofOfPurchase.collectionId}
                  // onChange={(event) => handleNFTChange(event, setFieldValue)}
                >
                  <option value="">Anyone can participate</option>
                  <option value="">Family</option>
                  <option value="">Friends</option>
                </select>
                <Field
                  className="border-b border-b-[#60606C] outline-none bg-transparent text-[#484851] font-normal text-[14px] w-full px-5 py-3 "
                  name="title"
                  placeholder="Others, please specify"
                />
              </div> */}

              {/* <div className="space-y-3 my-5">
                <p className="font-medium text-[#303036]">Participant Level</p>
                <select
                  className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                  // value={values.proofOfPurchase.collectionId}
                  // onChange={(event) => handleNFTChange(event, setFieldValue)}
                >
                  <option value="">Beginner</option>
                  <option value="">Professional </option>
                  <option value="">Master</option>
                </select>
              </div> */}
              <div className="space-y-3 my-5">
                <p className="font-medium text-[#303036]">Nationality</p>
                <select
                  className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                  // value={values.proofOfPurchase.collectionId}
                  // onChange={(event) => handleNFTChange(event, setFieldValue)}
                >
                  <option value="">Nigerian</option>
                  <option value="">South African </option>
                  <option value="">Zambian</option>
                </select>
              </div>
              <div className="space-y-3 my-5">
                <p className="font-medium text-[#303036]">Age Range</p>
                <select
                  className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                  // value={values.proofOfPurchase.collectionId}
                  // onChange={(event) => handleNFTChange(event, setFieldValue)}
                >
                  <option value="">20 - 25</option>
                  <option value="">26 - 30 </option>
                  <option value="">31 - 35</option>
                </select>
              </div>
            </section>

            <div className="w-full">
              <Button
                name="Continue"
                href={"/dashboard/campaign/create_campaign?route=action"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Details;
