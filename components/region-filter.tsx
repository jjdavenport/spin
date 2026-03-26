"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGIONS } from "@/lib/constants";

interface RegionFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

export default function RegionFilter({
  value,
  onChange,
  disabled,
}: RegionFilterProps) {
  return (
    <Select value={value ?? "All Regions"} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[140px] sm:w-[180px]">
        <SelectValue placeholder="Filter by region" />
      </SelectTrigger>
      <SelectContent>
        {REGIONS.map((region) => (
          <SelectItem key={region} value={region}>
            {region}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
