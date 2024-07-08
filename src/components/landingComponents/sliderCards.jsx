const SliderCards = ({ headerText, description }) => {
  return (
    <div
      className="w-full md:w-auto group relative flex flex-col items-start gap-3 border-2 border-[#151751] rounded-lg p-12 
    transition-all ease-in duration-600 hover:scale-[1.02] active:scale-[0.95] hover:top-1 hover:left-1 cursor-pointer "
    >
      <div className="rounded-lg border-2 border-[#151751] h-full w-full absolute right-[4px] bottom-[3px]"></div>

      <h2 className="text-[#151751] font-medium text-2xl md:text-4xl">
        {headerText}
      </h2>
      <p className="text-[#151751] font-normal text-xl md:text-2xl">
        {description}
      </p>
    </div>
  );
};

export default SliderCards;
