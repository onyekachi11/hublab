"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Button } from "../../components";
import VerxioToken from "../../assets/verxioToken.svg";
import { useSelector, useDispatch } from "react-redux";
import { root } from "@/store/store";
import { setChoosePoint } from "@/store/slices/statesSlice";

const PointsModal = ({ setShowQuestions, value }) => {
  const [openPoints, setOpenPoints] = useState(false);
  const [points, setPoints] = useState(0);

  const point = useSelector((state)=> state.generalStates.choosePoint)
  const dispatch = useDispatch()

  // console.log(point)


  const openPointsModal = () => {
    setOpenPoints(true);
  };

  const modalRef = useRef(null);

  return (
    <section className="relative">
      <div>
        <button
          onClick={() => openPointsModal()}
          className="flex items-center p-2 border border-primary rounded-lg gap-2"
        >
          <Image
            src={"/images/verxioToken.svg"}
            height={20}
            width={20}
            alt="doddles"
          />
          <span className="medium text-[14px]">{points}</span>
          <Image
            src={"/images/verxioAdd.svg"}
            height={20}
            width={20}
            alt={"verxio token"}
          />
        </button>
      </div>

      {openPoints && (
        <div
          className={`w-[250px] absolute border right-[40px] bg-white rounded-lg z-[999] shadow-sm ${
            openPoints ? "block" : "hidden"
          }`}
        >
          <div
            ref={modalRef}
            className="w-full h-full flex flex-col items-center justify-center text-[#B2B0B0] font-normal"
          >
            <div className="w-full flex items-center justify-center gap-2 border-b border-gray-200 p-3">
              <div className="w-[40%] mr-1 border-r flex items-center justify-center">
                <Image
                  src={VerxioToken}
                  height={50}
                  width={50}
                  alt="verxio token"
                />
              </div>
              <input
                type="text"
                defaultValue={points || 0 }
                className="outline-none bg-[#DFDFF7] rounded-lg py-2 px-2 text-[#484851] w-[60%]"
                onChange={(e) => {
                  setPoints(e.target.value);
                  dispatch(setChoosePoint(e.target.value))
                }}
              />
            </div>
            <div className="w-full p-3">
              <Button
                outline
                name="Enter"
                className={"w-full bg-white rounded-xl"}
                shade="rounded-xl"
                onClick={() => {
                  setOpenPoints(false);
                  setShowQuestions((prevState) => ({
                    ...prevState,
                    [value]: {
                      ...prevState[value],
                      point: Number(point),
                    },
                  }));
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PointsModal;
