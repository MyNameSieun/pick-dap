import Image from "next/image";

const InfoAuthor = () => {
  return (
    <>
      <div className="flex h-fit w-fit items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            className="object-cover"
            alt="작성자 프로필"
            src="/profile.jpg"
            fill
            priority
          />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-sm font-semibold text-black">j_gun2</p>
          <p className="c2 text-gray-700">2026.01.02</p>
        </div>
      </div>
    </>
  );
};
export default InfoAuthor;
