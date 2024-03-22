import { Skeleton } from "@/components/ui/skeleton";

type LoaderProps = {
  type: "SmallCard" | "JobCard" | "LargeJobCard";
  amount?: number;
  addedDelay?: number;
};
export default function Loader({ type, amount, addedDelay }: LoaderProps) {
  switch (type) {
    case "SmallCard":
      return (
        <div className="mt-6 flex flex-col gap-8">
          {[...Array(amount ?? 1)].map((_, i) => (
            <Skeleton key={i} className="h-[9.3rem] w-[27rem]" />
          ))}
        </div>
      );
    case "JobCard":
      return (
        <div className="mt-6 flex flex-col gap-8">
          {[...Array(amount ?? 1)].map((_, i) => (
            <Skeleton key={i} className="h-[26.375rem] w-[25rem]" />
          ))}
        </div>
      );
    case "LargeJobCard":
      return (
        <div className="mt-6 flex flex-col gap-8">
          {[...Array(amount ?? 1)].map((_, i) => (
            <Skeleton key={i} className="h-[17.75rem] w-[59.375rem]" />
          ))}
        </div>
      );
    default:
      return null;
  }
}
