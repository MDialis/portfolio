import { TechIcon } from "@/lib/types";
import { TechIconItem } from "./TechIconItem";

interface TechIconListProps {
  icons?: TechIcon[];
}

export function TechIconList({ icons }: TechIconListProps) {
  if (!icons || icons.length === 0) {
    return <div />;
  }

  return (
    <div className="flex flex-wrap gap-4 p-2 bg-neutral/30 rounded-2xl self-center">
      {icons.map((icon) => (
        <TechIconItem key={icon.alt} icon={icon} />
      ))}
    </div>
  );
}