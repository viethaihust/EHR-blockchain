import { Button } from "antd";
import React from "react";
export default function HomeBanner() {
  return (
    <div className="h-[60vh] bg-[url('/banner.jpg')] bg-center bg-cover flex flex-col justify-center pl-12">
      <h1 className="-mt-6 text-4xl font-bold text-white leading-snug">
        CHĂM SÓC SỨC <br /> KHỎE CỦA BẠN
      </h1>
      <span className="mt-6 text-2xl text-white">
        Lưu trữ thông tin bệnh án điện tử, <br /> dễ dàng truy cập mọi lúc mọi
        nơi
      </span>
      <Button
        type="primary"
        size="large"
        className="w-fit mt-6 ml-12 !font-bold"
      >
        Tìm hiểu thêm
      </Button>
    </div>
  );
}
