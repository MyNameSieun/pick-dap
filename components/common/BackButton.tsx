"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({ label }: { label: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="text-icon-default mb-7">
      <div
        className="inline-flex cursor-pointer items-center gap-2"
        onClick={() => router.back()}
      >
        <ChevronLeft /> {label}
      </div>
    </div>
  );
};

export default BackButton;
