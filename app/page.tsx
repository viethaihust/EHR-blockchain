"use client";
import HomeBanner from "./components/HomeBanner";
import HomeHeader from "./components/HomeHeader";

export default function Home() {
  return (
    <div>
      <div>
        <HomeHeader />
        <HomeBanner />
      </div>
    </div>
  );
}
