import Image from "next/image";

const DashboardCards = ({
  src,
  alt,
  headerText,
  number,
  borderColor,
  backgroundColor,
}) => {
  return (
    <section className="relative mb-7 w-[220px]">
      <div
        className="relative z-50 flex items-center flex-col rounded-lg p-6 border"
        style={{ borderColor: borderColor, backgroundColor: backgroundColor }}
      >
        <div className="relative flex items-center gap-3">
          <section className="relative ">
            <div
              className="relative rounded-lg border p-2 z-50"
              style={{
                borderColor: borderColor,
                backgroundColor: backgroundColor,
              }}
            >
              <Image src={src} height={30} width={30} alt={alt} />
            </div>
            <span
              className="rounded-lg border h-full w-full absolute left-[5px] top-[4px]"
              style={{ borderColor: borderColor }}
            ></span>
          </section>

          <p className="font-normal text-[12px] text-[#424242]">{headerText}</p>
        </div>
        <h2 className="font-semibold text-[48px] text-primary">{number}</h2>
      </div>
      <div
        className="rounded-lg border h-full w-full absolute left-[6px] top-[6px]"
        style={{ borderColor: borderColor }}
      ></div>
    </section>
  );
};

export default DashboardCards;
