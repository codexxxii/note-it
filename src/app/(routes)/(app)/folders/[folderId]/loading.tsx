export default function Loading() {
  return (
    <div className="py-5">
      <div className="w-full h-32 flex justify-between items-center">
        <div className="w-1/2 h-2 bg-[#282828]/5 animate-pulse" />
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#28282b]/5 animate-pulse" />
          <div className="w-7 h-7 bg-[#28282b]/5 animate-pulse" />
        </div>
      </div>
      <div className="w-full h-12 flex border-b border-b-gray-200">
        <div className="w-2/5 flex justify-start items-center">
          <div className="w-1/2 h-2 bg-[#28282b]/5 animate-pulse" />
        </div>
        <div className="w-1/5 grid place-items-center">
          <div className="w-1/2 h-2 bg-[#28282b]/5 animate-pulse" />
        </div>
        <div className="w-1/5 grid place-items-center">
          <div className="w-1/2 h-2 bg-[#28282b]/5 animate-pulse" />
        </div>
        <div className="w-1/5 flex justify-end items-center">
          <div className="w-1/2 h-2 bg-[#28282b]/5 animate-pulse" />
        </div>
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className="w-full h-12 flex border-b border-b-gray-200"
          key={index}
        >
          <div className="w-2/5 flex justify-start items-center">
            <div className="w-1/2 flex justify-end items-center" />
          </div>
          <div className="w-1/5 grid place-items-center">
            <div className="w-1/5 flex justify-end items-center" />
          </div>
          <div className="w-1/5 grid place-items-center">
            <div className="w-1/5 flex justify-end items-center"></div>
          </div>
          <div className="w-1/5 flex justify-end items-center">
            <div className="w-7 h-7 bg-[#28282b]/5 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
