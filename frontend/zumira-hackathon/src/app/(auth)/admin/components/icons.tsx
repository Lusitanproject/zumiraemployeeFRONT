import { Label } from "@/components/custom/label";
import { cn } from "@/lib/utils";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

export type IconFieldProps = {
  value: IconName | null;
  onChange: (value: IconName) => void;
  icons: IconName[];
};

export function IconField({ value, onChange, icons }: IconFieldProps) {
  return (
    <div className="pb-3">
      <Label>Ícone</Label>
      <div className="flex flex-wrap gap-2 border border-gray-300 rounded-xl p-2 w-full max-w-[202px]">
        {icons.map((icon) => (
          <button
            key={icon}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 border border-gray-100 cursor-pointer",
              {
                "bg-primary-25 border border-primary-50": value === icon,
              }
            )}
            onClick={() => onChange(icon)}
          >
            <DynamicIcon name={icon} className="size-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
