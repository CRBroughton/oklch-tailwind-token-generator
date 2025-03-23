import { RootState } from "@/store";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { OKLCHProperties, updateColour } from "@/store/colours";

type ColourSliderProps = {
  id: number;
  property: OKLCHProperties;
  label: string;
  value: number;
  syncSetting?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export default function ColourSlider({
  id,
  property,
  label,
  value,
  syncSetting,
  min = 0,
  max = 1,
  step = 0.01
}: ColourSliderProps) {
  const isFirst = useSelector((state: RootState) => state.coloursReducer.colours[0]?.id === id);

  const dispatch = useDispatch();
  const handlePropertyChange = (property: OKLCHProperties, value: number[]) => {
    dispatch(updateColour({ id, property, value: value[0] }));
  };

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
        onValueChange={(value) => handlePropertyChange(property, value)}
        disabled={syncSetting && !isFirst}
      />
    </div>
  );
}