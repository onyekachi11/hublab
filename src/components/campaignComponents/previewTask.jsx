import React, { useState } from "react";
import VerxioGold from "../../assets/VerxioCoin.svg";
import Image from "next/image";
import SocialTask from "./socialTask";
import { Button } from "..";

const PreviewTask = ({ question, setTotalPointArray, addValueToArray }) => {
  const { pickAnswer, submitUrl, performAction } = question;

  const [performActionTaskDoneArray, setPerformActionTaskDoneArray] = useState(
    new Array(performAction?.value?.length).fill(false)
  );
  const [submitUrlTaskDoneArray, setSubmitUrlTaskDoneArray] = useState(
    new Array(submitUrl?.value?.length).fill(false)
  );
  const [pickAnswerTaskDoneArray, setPickAnswerTaskDoneArray] = useState(
    new Array(pickAnswer?.value?.length).fill(false)
  );
  const [urlAnswer, setUrlAnswer] = useState("");

  console.log(pickAnswerTaskDoneArray);

  const handleUrlAnswer = (event) => {
    setUrlAnswer(event.target.value);
  };

  //   console.log(urlAnswer)

  const handlePerfActionTaskDone = (index, point) => {
    const updatedTaskDoneArray = [...performActionTaskDoneArray];
    updatedTaskDoneArray[index] = true;
    setPerformActionTaskDoneArray(updatedTaskDoneArray);
    if (performActionTaskDoneArray[index] === false) {
      addValueToArray(point);
    }
  };

  const handleSubmitUrlTaskDone = (index, point) => {
    const updatedTaskDoneArray = [...submitUrlTaskDoneArray];
    updatedTaskDoneArray[index] = true;
    setSubmitUrlTaskDoneArray(updatedTaskDoneArray);
    if (submitUrlTaskDoneArray[index] === false) {
      addValueToArray(point);
    }
  };
  const handlePickanswerTaskDone = (index, point) => {
    const updatedTaskDoneArray = [...pickAnswerTaskDoneArray];
    updatedTaskDoneArray[index] = true;
    setPickAnswerTaskDoneArray(updatedTaskDoneArray);

    if (pickAnswerTaskDoneArray[index] === false) {
      addValueToArray(point);
    }
  };

  return (
    <div className="flex flex-col gap-20 w-[98%]">
      {pickAnswer && (
        <div className="flex flex-col gap-5">
          {pickAnswer?.value?.map((item, index) => (
            <div key={index}>
              <SocialTask
                question={item.question}
                point={item.points}
                taskDone={pickAnswerTaskDoneArray[index]}
              />
              <ol className="list-[upper-alpha] list-inside flex flex-col sm:flex-row gap-3 flex-wrap justify-between mt-5">
                <li
                  className="border px-3 py-1 rounded-md border-primary hover:scale-105 cursor-pointer"
                  onClick={() => {
                    if (item.answer === "a") {
                      handlePickanswerTaskDone(index, item.points);
                    }
                  }}
                >
                  {item?.options?.a}
                </li>
                <li
                  className="border px-3 py-1 rounded-md border-primary hover:scale-105 cursor-pointer"
                  onClick={() => {
                    if (item.answer === "b") {
                      handlePickanswerTaskDone(index, item.points);
                    }
                  }}
                >
                  {item?.options?.b}
                </li>
                <li
                  className="border px-3 py-1 rounded-md border-primary hover:scale-105 cursor-pointer"
                  onClick={() => {
                    if (item.answer === "c") {
                      handlePickanswerTaskDone(index, item.points);
                    }
                  }}
                >
                  {item?.options?.c}
                </li>
                <li
                  className="border px-3 py-1 rounded-md border-primary hover:scale-105 cursor-pointer"
                  onClick={() => {
                    if (item.answer === "d") {
                      handlePickanswerTaskDone(index, item.points);
                    }
                  }}
                >
                  {item?.options?.d}
                </li>
              </ol>
            </div>
          ))}
        </div>
      )}

      {submitUrl && (
        <div className="flex flex-col gap-6">
          {submitUrl?.value?.map((item, index) => (
            <div key={index}>
              <SocialTask
                question={item.question}
                point={item.points}
                taskDone={submitUrlTaskDoneArray[index]}
              />
              <div className="flex justify-between items-center">
                {/* <div></div> */}
                {/* <label htmlFor="url">Url</label> */}
                <input
                  type="text"
                  className="border outline-none px-3 py-2 rounded-md border-primary w-[50%] bg-transparent"
                  placeholder="https://"
                  onChange={handleUrlAnswer}
                />
                <Button
                  name="submit"
                  className="bg-white text-[#484851] border border-primary"
                  shade="bg-[#484851] border-0"
                  onClick={() => {
                    if (urlAnswer !== "") {
                      handleSubmitUrlTaskDone(index, item.points);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {performAction && (
        <div className="flex flex-col gap-2">
          {performAction?.value?.map((item, index) => (
            <SocialTask
              key={index}
              question={item.question}
              point={item.points}
              href={item.url}
              taskDone={performActionTaskDoneArray[index]}
              onClick={() => {
                handlePerfActionTaskDone(index, item.points);
                console.log(item.points);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviewTask;
