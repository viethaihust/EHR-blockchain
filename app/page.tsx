"use client";
import HomeBanner from "./components/HomeBanner";
import HomeHeader from "./components/HomeHeader";

export default function Home() {
  return (
    <div>
      <div className="p-4">
        <HomeHeader />
      </div>
      <div>
        <HomeBanner />
      </div>
    </div>
  );
}
