// Buttons.js
import Link from "next/link";
import Logo from "./Logo";
import { motion } from "framer-motion";

export default function Nav() {

  return (
    <motion.nav
      className="justify-between mt-3 mx-2 lg:mx-14"
      initial={{ y: -20 }}
      animate={{ y: 5 }}
      transition={{ duration: 2 }}
    >
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
    </motion.nav>
  );
}
