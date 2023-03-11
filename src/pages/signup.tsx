import type { NextPage } from "next";

const Signup: NextPage = () => {
  return (
    <div>
      <h1 className="color-[#333333] pt-[20px] pb-[30px] text-center text-[42px] leading-[42px] tracking-[-2px]">
        Sign up
      </h1>
      <div className="flex justify-center">
        <form className="max-w-[555px] grow">
          {[
            ["Name", "text"],
            ["Email", "email"],
            ["Password", "password"],
            ["Confirmation", "password"],
          ].map(([label, type], index) => {
            return (
              <div key={index}>
                <div className="pb-[5px]">
                  <label
                    htmlFor={label}
                    className="color-[#333333] h-5 text-[14px] font-bold leading-5"
                  >
                    {label}
                  </label>
                </div>
                <div className="pb-[15px]">
                  <input
                    id={label}
                    type={type}
                    className="bordor-[#cccccc] w-full rounded border py-[6px] px-3 text-[14px]"
                  />
                </div>
              </div>
            );
          })}
          <button className="w-full rounded border border-[#2e6da4] bg-[#337ab7] py-[6px] px-3 text-[14px] text-white">
            Create my acount
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
