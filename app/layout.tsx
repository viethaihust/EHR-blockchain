"use client";
import "./globals.scss";
import "@rainbow-me/rainbowkit/styles.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Provider from "./provider";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <AntdRegistry>
            <div className="flex min-h-screen flex-col">{children}</div>
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
