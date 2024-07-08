"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import Button from "../Button";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import CampaignPreview from "../modals/campaignPreview";
import { createProduct } from "@/store/slices/productSlice";
import { setSummary } from "@/store/slices/statesSlice";
import ProductModal from "@/components/modals/productModal";
import { FolderCloud } from "iconsax-react";
import axios from "axios";

// const handleProofOfPurchaseChange = (event, setFieldValue) => {
//   const { name, value } = event.target;
//   setFieldValue(`proofOfPurchase.${name}`, value);
// };

const Summary = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [userCollectionNFT, setUserCollectioNFT] = useState([]);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const userId = useSelector((state) => state.generalStates.userId);

  const fileInputRef = useRef(null);

  const handleFileUploadChange = async (event, setFieldValue) => {
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
      setFieldValue("productCollectionFile", results.url);
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  // const handleImageChange = (event, setFieldValue) => {
  //   const file = event.target.files[0];
  //   // console.log("file", file);
  //   setFieldValue("productCollectionFile", file);

  //   if (file) {
  //     const reader = new FileReader();
  //     // console.log("reader", reader);

  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //     };

  //     const data = reader.readAsDataURL(file);
  //     console.log(data);
  //   }
  // };

  const handleQuantityChange = (event, setFieldValue) => {
    const value = Math.max(0, event.target.value);
    setFieldValue("quantity", value);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCategoryChange = (event, setFieldValue) => {
    const category = event.target.value;
    setFieldValue("category", category);
  };

  const handleNFTChange = (event, setFieldValue) => {
    const selectedNFTId = parseInt(event.target.value);
    const selectedNFT = userCollectionNFT.find(
      (nft) => nft.id === selectedNFTId
    );

    if (selectedNFT) {
      setFieldValue("proofOfPurchase", {
        address: selectedNFT.mintAddress,
        name: selectedNFT.name,
        imageUrl: selectedNFT.image,
        collectionId: selectedNFT.id,
      });
    }
  };

  const getAllUserCollection = async () => {
    try {
      const url = `https://backend-verxio.vercel.app/api/v1/collection/nft/${userId}`;
      if (userId === undefined || !userId) {
        toast.info("Connect your wallet to get user collection");
      } else {
        const response = await axios.get(url);
        if (response.data.success === true) {
          setUserCollectioNFT(response.data.nfts);
        }
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getAllUserCollection();
  }, []);

  const type = useSelector(
    (state) => state.generalStates?.start?.selectedProduct
  );
  const title = useSelector((state) => state.generalStates?.details?.title);
  const description = useSelector(
    (state) => state.generalStates?.details?.description
  );
  const bannerImg = useSelector(
    (state) => state.generalStates?.details?.bannerImg
  );
  const allowPayAnyPrice = useSelector(
    (state) => state.generalStates?.details?.allowPayAnyPrice
  );
  const price = useSelector((state) => state.generalStates?.details?.price);
  const discount = useSelector(
    (state) => state.generalStates?.details?.discount
  );
  const customNFTAddress = useSelector(
    (state) => state.generalStates?.details?.customNFT?.address
  );
  const customNFTName = useSelector(
    (state) => state.generalStates?.details?.customNFT?.name
  );
  const customNFTImageUrl = useSelector(
    (state) => state.generalStates?.details?.customNFT?.imageUrl
  );
  const selectedNFTAddress = useSelector(
    (state) => state.generalStates?.details?.selectedNFT?.address
  );
  const selectedNFTName = useSelector(
    (state) => state.generalStates?.details?.selectedNFT?.name
  );
  const selectedNFTImageUrl = useSelector(
    (state) => state.generalStates?.details?.selectedNFT?.imageUrl
  );
  const isNFTDiscountEnabled = useSelector(
    (state) => state.generalStates?.details?.isNFTDiscountEnabled
  );
  const isCustomNFTEnabled = useSelector(
    (state) => state.generalStates?.details?.isCustomeNFTEnabled
  );

  const status = useSelector((state) => state.product.product.status);

  const initialValues = {
    category: "",
    quantity: "",
    proofOfPurchase: {
      address: "",
      name: "",
      imageUrl: "",
      collectionId: "",
    },
    productCollectionFile: "",
  };

  useEffect(() => {
    if (campaignModalOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [campaignModalOpen]);

  useEffect(() => {
    if (openModal) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [openModal]);

  const createNewProduct = async (values) => {
    try {
      const productData = {
        type: type,
        name: title,
        image: bannerImg,
        description: description,
        payAnyPrice: allowPayAnyPrice,
        price: parseInt(price),
        category: values.category,
        quantity: parseInt(values.quantity),
        unlimitedQuantity: values.quantity === 0 ? true : false,
        pop: {
          address: values.proofOfPurchase.address,
          name: values.proofOfPurchase.name,
          imageUrl: values.proofOfPurchase.imageUrl,
          collectionId: parseInt(values.proofOfPurchase.collectionId),
        },
        purchaseXP: 50,
        product: values.productCollectionFile,
      };

      // Conditionally add nftSelection, customNFT and discount amount if true
      if (isNFTDiscountEnabled) {
        productData.nftSelection = {
          address: selectedNFTAddress,
          name: selectedNFTName,
          imageUrl: selectedNFTImageUrl,
        };
        productData.discountAmount = parseInt(discount);
      } else if (isCustomNFTEnabled) {
        productData.nftSelection = {
          address: customNFTAddress,
          name: customNFTName,
          imageUrl: customNFTImageUrl,
        };
        productData.discountAmount = parseInt(discount);
      } else {
        productData.discountAmount = 0;
      }

      const response = await dispatch(
        createProduct({
          data: productData,
          userId: userId,
        })
      );

      console.log(response);
      if (response?.payload?.success === true) {
        toast.success(response?.payload?.message);
        console.log(response);
        setOpenModal(true);
      } else {
        toast.error(response?.payload?.message);
        console.log(response);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <section>
      <div className={`mt-10 w-[60%] text-[#484851] `}>
        <Formik onSubmit={() => {}} initialValues={initialValues}>
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-11">
              <div>
                <div className="mb-5">
                  <p className="font-semibold text-[24px] mb-5">
                    <span className="mr-3 text-">*</span>Select Category
                  </p>
                  <select
                    className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                    value={values.category}
                    onChange={(event) =>
                      handleCategoryChange(event, setFieldValue)
                    }
                  >
                    <option value="">Select product category</option>
                    <option value="business">Business</option>
                    <option value="collectibles">Collectibles</option>
                    <option value="Spirituality">Spirituality</option>
                    <option value="healthandfitness">Health and Fitness</option>
                    <option value="artsandentertainment">
                      Arts and Entertainment
                    </option>
                    <option value="relationshipandfamily">
                      Relationship and Family{" "}
                    </option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <div>
                  <p className="font-semibold text-[24px] mb-5">
                    <span className="mr-3 text-">*</span>Quantity
                  </p>
                  <Field
                    className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                    name="quantity"
                    type="number"
                    placeholder="Enter product quantity"
                    value={values.quantity}
                    onChange={(event) =>
                      handleQuantityChange(event, setFieldValue)
                    }
                  />
                </div>
                <div className="flex justify-between items-center text-[13px] mt-2">
                  <p>Set quantity to 0 for unlimited products.</p>
                </div>
              </div>
              <div className="relative z-40 -right-[1px]">
                <p className="font-semibold text-[24px] mb-5">
                  <span className="mr-3 text-">*</span>Select Proof of Purchase
                  (NFT)
                </p>
                <div className="mb-5">
                  <select
                    className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                    value={values.proofOfPurchase.collectionId}
                    onChange={(event) => handleNFTChange(event, setFieldValue)}
                  >
                    <option value="">
                      Choose an NFT from your Collection on Verxio
                    </option>
                    {userCollectionNFT.map((collection, index) => (
                      <option key={index} value={collection.id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <p className="font-semibold text-[24px] mb-5">
                  <span className="mr-3 text-">*</span>Purchase XP
                </p>
                <div className="flex justify-end text-end border rounded-lg border-primary px-16 py-5 text-[#484851] text-[16px] mt-4">
                  <p>
                    Reward Point:{" "}
                    <span className="text-[32px] font-bold">50</span> points
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-[24px] mb-5">
                  <span className="mr-3 text-">*</span>Upload File
                </p>
                <div className="w-[65%] ">
                  <div className=" rounded-lg border border-primary border-dashed bg-[#dde3ed]">
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
                          <FolderCloud color="#FF8A65" />
                          <button
                            className="text-[14px]"
                            onClick={handleUploadButtonClick}
                          >
                            Drag & Drop your product or Browse
                          </button>
                        </div>
                        <input
                          name="fileUpload"
                          type="file"
                          capture="environment"
                          className="hidden"
                          accept="*/*"
                          ref={fileInputRef}
                          onChange={(e) => {
                            handleFileUploadChange(e, setFieldValue);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-[13px] mt-2">
                    <p>
                      To upload multiple files or a bundle, simply compress all
                      the files into a .zip and not .rar file.
                    </p>
                    <p>Max 750MB</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-8">
                <Button
                  type="button"
                  name="preview"
                  className="font-medium text-[20px] bg-white"
                  outline
                  onClick={() => {
                    setCampaignModalOpen(true);
                    dispatch(setSummary(values));
                  }}
                />
                <Button
                  type="button"
                  name="publish"
                  className="border border-primary font-medium text-[20px]"
                  shade="border-primary"
                  isLoading={status === "loading"}
                  onClick={() => {
                    dispatch(setSummary(values));
                    createNewProduct(values);
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {openModal && (
        <ProductModal setOpenModal={setOpenModal} openModal={openModal} />
      )}

      {campaignModalOpen && (
        <div className="bg-[#000]/40 absolute w-screen h-screen top-0 left-0 z-50 p-10 text-[#484851">
          <CampaignPreview setCampaignModalOpen={setCampaignModalOpen} />
        </div>
      )}
    </section>
  );
};

export default Summary;
