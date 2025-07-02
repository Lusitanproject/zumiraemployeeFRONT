import { ChangeEventHandler } from "react";

import { Label } from "@/components/custom/label";
import { Textarea } from "@/components/ui/textarea";

type DescriptionProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export function Description({ value, onChange }: DescriptionProps) {
  return (
    <div className=" w-full flex flex-col gap-y-2">
      <Label htmlFor="description" className="text-text-700">
        Descrição
      </Label>
      <Textarea id="description" value={value} onChange={onChange} className="text-text-700" />
    </div>
  );
}
