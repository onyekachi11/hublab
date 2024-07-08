"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Edit from "../../assets/edit.svg";
import XLogo from "../../assets/X-logo.svg";
import linkedIn from "../../assets/linkedin-logo.svg";
import Discord from "../../assets/discord-logo.svg";
import Github from "../../assets/github-logo.svg";
import Website from "../../assets/website-logo.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import Socials from "../socials";
import { createProfile } from "@/store/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Error from "../../components/formikerror";
import Button from "../Button";
import { generateAvatarUrl } from "@/utils/verxioAvatar";
import { useAccount } from "@particle-network/connect-react-ui";
import { root } from "@/store/store";

const EditProfile = ({ setEdit, getUserProfile }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const account = useAccount();
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.generalStates.userProfile);
  const edit = useSelector((state) => state.generalStates.edit);
  const userId = useSelector((state) => state.generalStates.userId);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const initialValue = {
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    email: userProfile?.email || "",
    bio: userProfile?.bio || "",
    interests: [],
    socials: {
      twitter: userProfile?.socials?.twitter || "",
      linkedIn: "",
      discord: "",
      gitHub: "",
      instagram: "",
      website: "",
    },
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    bio: Yup.string().required("Bio is required"),
    interests: Yup.array().min(1, "At least one interest is required"),
    socials: Yup.object()
      .shape({
        twitter: Yup.string(),
        linkedIn: Yup.string(),
        discord: Yup.string(),
        gitHub: Yup.string(),
        instagram: Yup.string(),
        website: Yup.string(),
        // Add more social media validation rules as needed
      })
      .test(
        "at-least-one-social",
        "At least one social media is required",
        (value) => {
          return Object.values(value).some((social) => social !== "");
        }
      ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const options = [
    { value: "development", label: "Development" },
    { value: "content", label: "Content" },
    { value: "blockchain", label: "Blockchain" },
    { value: "trading", label: "Trading" },
    { value: "bounty", label: "Bounty" },
  ];

  const backendSelectedOptions = userProfile?.interests?.map((item) => ({
    value: item.toLowerCase(),
    label: item,
  }));

  console.log(backendSelectedOptions);

  const createNewProfile = async (values) => {
    try {
      const response = await dispatch(
        createProfile({
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            bio: values.bio,
            interests: values.interests,
            socials: values.socials,
          },
          id: userId,
        })
      );
      if (response.payload.success === true) {
        getUserProfile();
        toast.success(response.payload.message);
        dispatch(setEdit(false));
        console.log(response);
      } else {
        toast.error(response.payload.message);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addStatus = useSelector((state) => state.profile.profile.status);

  return (
    <div>
      <div>
        <div className="w-[115px] h-[115px] relative rounded-full">
          <img
            src={
              selectedImage === "" ? generateAvatarUrl(userId) : selectedImage
            }
            alt="profile picture"
            // width={200}
            // height={200}
            className="w-full h-full rounded-full bg-cover"
          />
          {/* )} */}
          <div
            className="bg-white p-[10px] rounded-full z-20 absolute -right-3 shadow-md top-[70px] cursor-pointer "
            onClick={handleUploadButtonClick}
          >
            <Image src={Edit} alt="Edit image" className=" w-5" />
          </div>
        </div>
        <input
          name="profileImageDoc"
          type="file"
          capture="environment"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>
      <Formik
        initialValues={initialValue}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        {({ isValid, handleSubmit, values, dirty, setFieldValue }) => (
          <Form className="mt-10 text-[#0D0E32] font-medium text-[16px] flex flex-col gap-5">
            <div>
              <p className="">First Name</p>
              <Field
                name="firstName"
                placeholder="first name"
                className="border rounded-lg w-full bg-transparent px-[10px] sm:px-[20px] py-[10px] mt-2 text-[14px] font-normal outline-1 outline-blue-400 border-[#222482]"
              />
              <ErrorMessage name="firstName" component={Error} />
            </div>
            <div>
              <p>Last Name</p>
              <Field
                name="lastName"
                placeholder="last name"
                className="border rounded-lg w-full bg-transparent px-[10px] sm:px-[20px] py-[10px] mt-2 text-[14px] outline-1 outline-blue-400 font-normal border-[#222482]"
              />
              <ErrorMessage name="lastName" component={Error} />
            </div>
            <div>
              <p>Email Address</p>
              <Field
                name="email"
                placeholder="name@email.com"
                className="border rounded-lg w-full bg-transparent px-[10px] sm:px-[20px] py-[10px] mt-2 text-[14px] outline-1 outline-blue-400 font-normal border-[#222482]"
              />
              <ErrorMessage name="email" component={Error} />
            </div>
            <div>
              <p>Bio</p>
              <Field
                name="bio"
                placeholder="description about yourself"
                as="textarea"
                className="border rounded-lg w-full bg-transparent px-[10px] sm:px-[20px] py-[10px] mt-2 text-[14px] outline-1 outline-blue-400 font-normal border-[#222482]"
              />
              <ErrorMessage name="bio" component={Error} />
            </div>
            <div>
              <p className="mb-2">Interests</p>
              <Select
                defaultValue={backendSelectedOptions}
                onChange={(selectedOptions) => {
                  setSelectedOption(selectedOptions);
                  setFieldValue(
                    "interests",
                    selectedOptions.map((option) => option.label)
                  );
                }}
                options={options}
                isMulti
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused
                      ? "none"
                      : state.onKeyDown
                      ? "none"
                      : "#222482",
                    outlineColor: "none",
                    outlineWidth: 0,
                    paddingLeft: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: "transparent",
                    borderRadius: 8,
                    fontSize: 14,
                    "&:hover": {
                      // Remove border color change on hover
                      borderColor: "none",
                    },
                  }),
                }}
              />
              <ErrorMessage name="interests" component={Error} />
              {/* <ErrorMessage name="interests">
                {({ message }) => (
                  <div className="text-red-500 text-sm">{message}</div>
                )}
              </ErrorMessage> */}
            </div>
            <div>
              <p className="mb-2">Socials</p>
              <div className="font-normal">
                <Socials
                  name="twitter"
                  value="socials.twitter"
                  userProfile={userProfile}
                  logo={XLogo}
                  setFieldValue={setFieldValue}
                  values={values}
                />
                <Socials
                  name="linkedIn"
                  value="socials.linkedIn"
                  userProfile={userProfile}
                  logo={linkedIn}
                  setFieldValue={setFieldValue}
                />
                <Socials
                  name="discord"
                  value="socials.discord"
                  userProfile={userProfile}
                  logo={Discord}
                  setFieldValue={setFieldValue}
                />
                <Socials
                  name="gitHub"
                  value="socials.gitHub"
                  userProfile={userProfile}
                  logo={Github}
                  setFieldValue={setFieldValue}
                />
                <Socials
                  name="instagram"
                  value="socials.instagram"
                  userProfile={userProfile}
                  logo={XLogo}
                  setFieldValue={setFieldValue}
                />
                <Socials
                  name="website"
                  value="socials.website"
                  userProfile={userProfile}
                  logo={Website}
                  setFieldValue={setFieldValue}
                />
                <ErrorMessage name="socials" component={Error} />
              </div>
            </div>
            <Button
              name="Save Profile"
              outline
              isLoading={addStatus === "loading"}
              // onClick={() => setEdit(false)}
              onClick={() => {
                console.log(values);
                if (isValid && dirty) {
                  createNewProfile(values);
                }
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
