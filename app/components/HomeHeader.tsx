import Link from "next/link";

export default function HomeHeader() {
  return (
    <div className="flex items-center justify-end gap-6 p-4">
      <div>
        <Link href="/patient">
          <button className="border border-gray-400 bg-gray-100 px-4 py-1 font-semibold text-black transition-colors duration-300 hover:bg-gray-200">
            Bệnh nhân
          </button>
        </Link>
      </div>
      <div>
        <Link href="/dashboard">
          <button className="border border-gray-400 bg-gray-100 px-4 py-1 font-semibold text-black transition-colors duration-300 hover:bg-gray-200">
            Bác sĩ
          </button>
        </Link>
      </div>
    </div>
  );
}
