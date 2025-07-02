import { Dimension } from "@/app/(auth)/admin/dimensoes/definitions";
import { Label } from "@/components/custom/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type DimensionProps = {
  value: string;
  onChange: (value: string) => void;
  options: Dimension[];
};

export function DimensionField({ value, onChange, options }: DimensionProps) {
  return (
    <div className="pb-3">
      <Label htmlFor="psychologicalDimensionId" className="text-text-700">
        Dimensão psicológica
      </Label>
      <Select defaultValue={value} name="psychologicalDimensionId" onValueChange={onChange}>
        <SelectTrigger className="w-[180px] text-text-700">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options?.map((item) => (
            <SelectItem key={item.id} value={item.id} className="text-text-700">
              {item.acronym} - {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
