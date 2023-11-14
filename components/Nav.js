// Buttons.js
import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Nav() {
  const navRef = useRef();

  useEffect(() => {
    console.log(navRef);
    // TODO add gsap to animate the code below
    gsap.to(navRef.current, { y: 10, duration: 4, ease: "slow" });
  }, []);
  return (
    <nav className="justify-between mt-3 mx-2 lg:mx-14" ref={navRef}>
      <ul className="flex justify-between space-x-4">
        <Link href={"/h"} className="flex lg:space-x-2 space-x-1 ml-3">
          <Logo></Logo>
          <span className="lg:mt-1 font-bold text-[25px] lg:text-[23px] font-grotesque-bold text-white hidden lg:block">
            starsearrch
          </span>
        </Link>

        <li>
          <Link
            className=" hover:text-blue-800 text-[20px] lg:text-[23px] font-grotesque-regular text-white"
            href={"/guide"}
          >
            guide
          </Link>
        </li>
      </ul>
    </nav>
  );
}
