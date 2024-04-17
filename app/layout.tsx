import "./globals.scss";
import "@rainbow-me/rainbowkit/styles.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Provider from "./provider";
import HomeHeader from "./components/HomeHeader";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <AntdRegistry>
            <div className="h-screen flex flex-col">
              <HomeHeader />
              {children}
            </div>
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
