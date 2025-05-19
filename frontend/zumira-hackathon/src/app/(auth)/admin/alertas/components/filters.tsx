import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Assessment, Company, Filters as FiltersType } from "../definitions";
import { useRef } from "react";
import { Label } from "@/components/custom/label";

interface FiltersProps {
  assessments: Assessment[];
  companies: Company[];
  onChangeFilters?: (data: FiltersType) => void;
}

export function Filters({ assessments, companies, onChangeFilters }: FiltersProps) {
  const assessmentId = useRef<string>("");
  const companyId = useRef<string>("");

  return (
    <div className="flex flex-row gap-2 items-center">
      <div>
        <Label htmlFor="company">Empresa</Label>
        <Select
          name="company"
          onValueChange={(value) => {
            companyId.current = value;
            onChangeFilters?.({ assessmentId: assessmentId.current, companyId: value });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {companies?.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="assessment">Teste</Label>
        <Select
          name="assessment"
          onValueChange={(value) => {
            assessmentId.current = value;
            onChangeFilters?.({ assessmentId: value, companyId: companyId.current });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {assessments?.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
