"use client";
import "./globals.scss";
import "@rainbow-me/rainbowkit/styles.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Provider from "./provider";
import Setup from "./setup";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <AntdRegistry>
            <Setup>
              <div className="flex min-h-screen flex-col">{children}</div>
            </Setup>
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
