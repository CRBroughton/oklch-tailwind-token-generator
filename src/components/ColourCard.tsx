import { Card, CardContent, CardHeader } from "./ui/card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import ColourSlider from "./ColourSlider";
import useBoundState from "@/utils/useBoundState";
import { Input } from "./ui/input";
import { updateColourName } from "@/store/colours";

type ColourCardProps = {
  id: number;
  name: string;
  lightness: number;
  chroma: number;
  hue: number;
  alpha: number;
}

export default function ColourCard({ id, name, lightness, chroma, hue, alpha }: ColourCardProps) {
  const syncSettings = useSelector((state: RootState) => state.coloursReducer.syncSettings);
  const previewColour = `oklch(${lightness} ${chroma} ${hue} / ${alpha}%)`;

  const [nameRef] = useBoundState(name);
  const dispatch = useDispatch();
  const setColourName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateColourName({ id, name: e.target.value }));
  };  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Input
            ref={nameRef}
            type="text"
            className="text-lg font-medium"
            style={{
              color: previewColour,
            }}
            placeholder="Enter colour name"
            onChange={(event) => setColourName(event)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ColourSlider
            id={id}
            label="Lightness"
            property="lightness"
            value={lightness}
            syncSetting={syncSettings.lightness}
          />
          <ColourSlider
            id={id}
            label="Chroma"
            property="chroma"
            value={chroma}
            syncSetting={syncSettings.chroma}
            max={0.37}
          />
          <ColourSlider
            id={id}
            label="Hue"
            property="hue"
            value={hue}
            syncSetting={syncSettings.hue}
            max={360}
            step={1}
          />
          <ColourSlider
            id={id}
            label="Alpha"
            property="alpha"
            value={alpha}
            syncSetting={syncSettings.alpha}
            max={100}
            step={1}
          />
        </div>

        <div className="mt-4 p-2 bg-gray-800 rounded-md">
          <code className="text-xs">
            --{name}: oklch({lightness.toFixed(2)} {chroma.toFixed(2)} {Math.round(hue)} / {alpha}%);
          </code>
        </div>
      </CardContent>
    </Card>
  );
}