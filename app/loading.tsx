import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Image src="/images/loading.svg" alt="loading" width={100} height={100} />
    </div>
  );
}
