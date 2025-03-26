import { Card, CardContent, CardHeader } from "./ui/card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import ColourSlider from "./ColourSlider";
import useBoundState from "@/utils/useBoundState";
import { Input } from "./ui/input";
import { deleteColour, updateColourName } from "@/store/colours";
import { Button } from "./ui/button";

type ColourCardProps = {
  id: number;
  name: string;
  lightness: number;
  chroma: number;
  hue: number;
  alpha: number;
}

export default function ColourCard({ id, name, lightness, chroma, hue, alpha }: ColourCardProps) {
  const onlyOneColour = useSelector((state: RootState) => state.coloursReducer.colours).length === 1
  const syncSettings = useSelector((state: RootState) => state.coloursReducer.syncSettings);
  const previewColour = `oklch(${lightness} ${chroma} ${hue} / ${alpha}%)`;
  
  const [nameRef, nameValue] = useBoundState(name);
  const dispatch = useDispatch();
  const setColourName = (e: string) => {
    dispatch(updateColourName({ id, name: e }));
  };
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-4">
          <Input
            ref={nameRef}
            type="text"
            className="text-lg font-medium"
            style={{
              color: previewColour,
            }}
            placeholder="Enter colour name"
            value={nameValue}
            onInput={(event) => setColourName((event.target as HTMLInputElement).value)}
          />
          <Button
            variant={"destructive"}
            onClick={() => { dispatch(deleteColour(id)) }}
            disabled={onlyOneColour}
          >
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!syncSettings.lightness &&
          <ColourSlider
            id={id}
            label="Lightness"
            property="lightness"
            value={lightness}
            syncSetting={syncSettings.lightness}
          />}
          {!syncSettings.chroma &&
          <ColourSlider
            id={id}
            label="Chroma"
            property="chroma"
            value={chroma}
            syncSetting={syncSettings.chroma}
            max={0.37}
          />}
          {!syncSettings.hue &&
          <ColourSlider
            id={id}
            label="Hue"
            property="hue"
            value={hue}
            syncSetting={syncSettings.hue}
            max={360}
            step={1}
          />}
          {!syncSettings.alpha &&
          <ColourSlider
            id={id}
            label="Alpha"
            property="alpha"
            value={alpha}
            syncSetting={syncSettings.alpha}
            max={100}
            step={1}
          />}
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