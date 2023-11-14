import { useContext, useEffect, useRef } from "react";
import down from "../public/down.svg";
import Image from "next/image";
import gsap from "gsap";
import { ButtonContext } from "./ButtonContext";

export default function Info() {
  const infoRef = useRef();
  const { clicked } = useContext(ButtonContext);
  useEffect(() => {
    if (clicked) {
      gsap.to(infoRef.current, { opacity: 0, duration: 2 });
    }
  }, [clicked]);
  return (
    <div className=" mb-7 lg:mb-3" ref={infoRef}>
      <section className="flex flex-col justify-center items-center text-center mt-16 font-source-serif lg:text-[45px] text-[25px] mb-4">
        <p className=" bg-gradient-to-b from-[#FFFCFC] to-[#D4D4D4] text-transparent bg-clip-text">
          <span>
            Are your two favorite actors in the same film? <br></br>Find out
            below
          </span>
        </p>
        <Image src={down} alt="Arrow-down" className="pt-9" />
      </section>
    </div>
  );
}
