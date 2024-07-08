import Link from "next/link";
import Image from "next/image";
import { Copyright } from "iconsax-react";

const Footer = () => {
  return (
    <footer className="relative w-full h-full max-w-[1920px] mx-auto px-[MIN(100px,8%)] flex flex-col gap-12 md:gap-24 bg-tertiary min-h-[568px] py-24">
      {/* <div className="absolute top-0 right-[-10p]">
        <Image
          src={"/images/footerDoddle.svg"}
          alt="footer doddle"
          width={220}
          height={220}s
        />
      </div> */}
      <div className="w-full flex flex-col items-start md:items-center md:flex-row md:justify-between justify-start gap-8 text-textColor">
        {/* Logo Container */}
        <div className="flex-2">
          <Link href="/">
            <Image
              src={"/images/AxiosFooterLogo.svg"}
              alt="Axios Logo"
              width={80}
              height={80}
            />
          </Link>
        </div>

        {/* Footer Links */}
        <section className="flex-4 flex flex-col items-start justify-start md:flex-row gap-4 md:gap-24">
          <div className="flex flex-col items-start justify-start">
            <h2 className="font-bold font-base mb-6">Quick Links:</h2>
            <blockquote className="flex flex-col gap-2">
              <Link href={"/"}>Explore</Link>
              <Link href={"/"}>Campaign</Link>
              <Link href={"/"}>Suggestion Box</Link>
            </blockquote>
          </div>
          <div className="flex flex-col items-start justify-start">
            <h2 className="font-bold font-base mb-6">Legal</h2>
            <blockquote className="flex flex-col gap-2">
              <Link href={"/"}>Terms of Use</Link>
              <Link href={"/"}>Privacy Policy</Link>
            </blockquote>
          </div>
          <div className="flex flex-col items-start justify-start">
            <h2 className="font-bold font-base mb-6">Contact Us</h2>
            <blockquote className="flex flex-col gap-2">
              <Link href={"/"}>Email: Support@Verxio.com</Link>
              <Link href={"/"}>Phone: +1 458 478 55666</Link>
            </blockquote>
          </div>

          <div className="flex flex-col items-start justify-start">
            <h2 className="font-bold font-base mb-6">Connect With Us</h2>
            <blockquote className="flex justify-center items-center gap-3">
              <Link href={"/"}>
                <Image
                  width={20}
                  height={20}
                  alt="footer Logo"
                  src={"/images/footerInsta.svg"}
                />
              </Link>
              <Link href={"/"}>
                <Image
                  width={20}
                  height={20}
                  alt="footer Logo"
                  src={"/images/footerLinkedIn.svg"}
                />
              </Link>
              <Link href={"/"}>
                <Image
                  width={20}
                  height={20}
                  alt="footer Logo"
                  src={"/images/footerGithub.svg"}
                />{" "}
              </Link>
              <Link href={"https://x.com/verxioprotocol"}>
                <Image
                  width={18}
                  height={18}
                  alt="footer Logo"
                  src={"/images/footerX.svg"}
                />{" "}
              </Link>
            </blockquote>
          </div>
        </section>
      </div>

      {/* News letter */}
      <div className="w-full flex flex-col items-start md:items-center justify-center text-center max-w-2xl mx-auto">
        <div className="w-full flex flex-col gap-3 items-start">
          <h2 className="text-base font-bold text-textColor">
            Join Our Newsletter
          </h2>
          <div className="w-full flex flex-col md:flex-row justify-start items-start gap-3">
            <input
              type="text"
              placeholder="Email Address"
              className="w-full bg-transparent text-textColor border border-[#DFDFF7] rounded-lg py-[0.7rem] px-3 outline-none placeholder:text-inherit"
            />
            <button className="bg-lightBlue w-full md:w-auto py-3 px-8 rounded-lg text-white font-normal text-base">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copy Right Text */}
      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full hidden md:block bg-[#B6B8EC] h-[1px]"></div>

        <p className="flex gap-3 items-center text-textColor font-normal font-base">
          <Copyright className="text-sm" />
          <span>
            {`${new Date().getFullYear()}`} Verxio. All rights reserved
          </span>
        </p>

        <div className="w-full hidden md:block bg-[#B6B8EC] h-[1px]"></div>
      </div>
    </footer>
  );
};

export default Footer;
