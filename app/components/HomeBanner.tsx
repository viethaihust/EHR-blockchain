import { Button } from "antd";
import React from "react";

export default function HomeBanner() {
  return (
    <div className="flex h-[60vh] flex-col justify-center bg-[url('/banner.jpg')] bg-cover bg-center pl-12">
      <h1 className="-mt-6 text-4xl font-bold leading-snug text-white">
        CHĂM SÓC SỨC <br /> KHỎE CỦA BẠN
      </h1>
      <span className="mt-6 text-2xl text-white">
        Lưu trữ thông tin bệnh án điện tử, <br /> dễ dàng truy cập mọi lúc mọi
        nơi
      </span>
      <Button
        type="primary"
        size="large"
        className="ml-12 mt-6 w-fit !font-bold"
      >
        Tìm hiểu thêm
      </Button>
    </div>
  );
}
