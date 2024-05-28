import { Button } from "antd";
import Image from "next/image";
import React from "react";

export default function HomeOffer() {
  return (
    <div className="m-auto grid max-w-[1400px] gap-4 px-4 py-16 lg:grid-cols-2">
      {/* Left Side */}
      <div className="grid h-[60vh] grid-cols-2 grid-rows-4">
        <div className="relative row-span-4 m-2">
          <Image
            src="/offer1.jpg"
            alt="Offer 1"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="relative row-span-2 m-2">
          <Image
            src="/offer2.jpg"
            alt="Offer 2"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="relative row-span-2 m-2">
          <Image
            src="/offer3.jpg"
            alt="Offer 3"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      {/* Right Side */}
      <div className="flex h-full flex-col justify-center">
        <h3 className="text-5xl font-bold md:text-6xl">
          Blockchain Medical System
        </h3>
        <p className="py-6 text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          nam?
        </p>
        <p className="pb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
          voluptates nostrum dolorum reprehenderit error! Doloribus est illo
          eius saepe? Molestias sapiente perspiciatis doloribus consectetur
          nihil facilis aliquid eaque vel quisquam.
        </p>
        <div>
          <Button
            style={{
              marginRight: "1rem",
              borderColor: "black",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            Learn More
          </Button>
          <Button
            style={{
              borderColor: "black",
              backgroundColor: "black",
              color: "white",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            Check Us Out
          </Button>
        </div>
      </div>
    </div>
  );
}
