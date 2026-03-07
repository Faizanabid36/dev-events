"use client";

import Image from "next/image";
import StarBorder from "./ui/StarBorder/StarBorder";

const ExploreButton = () => {
  return (
    <StarBorder type="button" className="mt-8 mx-auto">
      <a href="#/events">Explore Events</a>
      <Image
        src="/icons/arrow-down.svg"
        alt="Arrow Right"
        width={24}
        height={24}
      />
    </StarBorder>
  );
};

export default ExploreButton;
