import React from "react";
import useFooter from "../hooks/useFooter";

const Footer = () => {
  const { footerData } = useFooter();

  return (
    <footer className="bg-[#032541] w-full py-10 text-white flex justify-center font-sans">
      <div className="w-full max-w-[1200px] px-5 md:px-10 flex flex-wrap gap-10 md:gap-16 justify-between items-start">
        {/* Logo Section */}
        <div className="flex flex-col gap-6 min-w-[200px]">
          <div className="flex flex-col gap-2">
            <span className="text-[#01d277] text-[32px] font-bold tracking-[2px]">
              THE
            </span>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#01b4e4] rounded-full" />
              <span className="text-[#01d277] text-[32px] font-bold tracking-[2px]">
                MOVIE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-5 bg-[#01d277] rounded-full" />
              <span className="text-[#01d277] text-[32px] font-bold tracking-[2px]">
                DB
              </span>
            </div>
          </div>

          <div className="bg-white text-[#01b4e4] font-bold text-[16px] px-5 py-3 rounded-md w-fit shadow-md">
            Hi AmanSharma07!
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap gap-10 sm:gap-16 flex-1">
          <div>
            <h3 className="text-white font-bold text-[16px] mb-3 tracking-wide">
              THE BASICS
            </h3>
            <ul className="flex flex-col gap-2">
              {footerData.basics.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.path}
                    className="text-white text-[14px] hover:text-[#01b4e4] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-[16px] mb-3 tracking-wide">
              GET INVOLVED
            </h3>
            <ul className="flex flex-col gap-2">
              {footerData.getInvolved.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.path}
                    className="text-white text-[14px] hover:text-[#01b4e4] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-[16px] mb-3 tracking-wide">
              COMMUNITY
            </h3>
            <ul className="flex flex-col gap-2">
              {footerData.community.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.path}
                    className="text-white text-[14px] hover:text-[#01b4e4] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-[16px] mb-3 tracking-wide">
              LEGAL
            </h3>
            <ul className="flex flex-col gap-2">
              {footerData.legal.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.path}
                    className="text-white text-[14px] hover:text-[#01b4e4] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
