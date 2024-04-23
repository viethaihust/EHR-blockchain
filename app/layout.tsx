"use client";
import "./globals.scss";
import "@rainbow-me/rainbowkit/styles.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Provider from "./provider";
import HomeHeader from "./components/HomeHeader";
import { usePathname } from "next/navigation";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  const showHeader =
    pathname !== "/dashboard/hospital" &&
    pathname !== "/dashboard/doctor" &&
    pathname !== "/dashboard/patient" &&
    pathname !== "/dashboard/record" &&
    pathname !== "/login" &&
    pathname !== "/connect-wallet";
  return (
    <html lang="en">
      <body>
        <Provider>
          <AntdRegistry>
            <div className="flex min-h-screen flex-col">
              {showHeader && <HomeHeader />}
              {children}
            </div>
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
