import { RootState } from "@/store";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";

type ColourSliderProps = {
  id: number;
  label: string;
  value: number;
  syncSetting: boolean;
  handler: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function ColourSlider({
  id,
  label,
  value,
  syncSetting,
  handler,
  min = 0,
  max = 1,
  step = 0.01
}: ColourSliderProps) {
  const isFirst = useSelector((state: RootState) => state.coloursReducer.colours[0]?.id === id);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>
          {label}: {value.toFixed(2)}
        </Label>
        {syncSetting && !isFirst && (
          <Badge variant="secondary" className="text-xs">Synced</Badge>
        )}
      </div>
      <Slider
        defaultValue={[value]}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={handler}
        disabled={syncSetting && !isFirst}
      />
    </div>
  );
}