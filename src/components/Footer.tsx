import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[#333333] text-[12px] md:text-[16px] text-white px-4 py-8 md:pt-10 pb-[1.5rem] md:pb-[1.5rem]">
      <div className=" md:max-w-[1000px] mx-auto">
        <div className=" border-b pb-[1rem] md:pb-[2.2rem]  border-[#515151] flex flex-col md:flex-row gap-7">
          <div className="md:w-1/2">
            <h6 className="text-[18px] md:text-[20px] font-bold">Contact Us</h6>
            <div className="mt-2 ">
              <p>Have questions about the method?</p>
              <p>Email: support@quitsmart.com</p>
            </div>
          </div>
          <div className="md:w-1/2">
            <h6 className="text-[18px] md:text-[20px] font-bold">
              Important Notice
            </h6>
            <div className="mt-2">
              <p>
                This method is based on personal experience and psychological
                principles. Results may vary. Consult your healthcare provider
                before starting any smoking cessation program.
              </p>
            </div>
          </div>
        </div>
        <p className="text-center mt-[1rem] md:mt-[1rem]  text-[12px] md:text-[16px]">
          © {new Date().getFullYear()} QuitSmart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
