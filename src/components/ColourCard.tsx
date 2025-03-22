import { Card, CardContent, CardHeader } from "./ui/card";
import { useDispatch, useSelector } from "react-redux";
import { updateColour } from "../store/colours";
import { RootState } from "../store";
import ColourSlider from "./ColourSlider";

type ColourCardProps = {
    id: number;
    name: string;
    lightness: number;
    chroma: number;
    hue: number;
}

export default function ColourCard({ id, name, lightness, chroma, hue }: ColourCardProps) {
    const dispatch = useDispatch();
    const syncSettings = useSelector((state: RootState) => state.coloursReducer.syncSettings);

    const backgroundColor = `oklch(${lightness} ${chroma} ${hue})`;
    const textColor = lightness > 0.6 ? '#000000' : '#ffffff';

    const handleLightnessChange = (value: number[]) => {
        dispatch(updateColour({ id, property: 'lightness', value: value[0] }));
    };

    const handleChromaChange = (value: number[]) => {
        dispatch(updateColour({ id, property: 'chroma', value: value[0] }));
    };

    const handleHueChange = (value: number[]) => {
        dispatch(updateColour({ id, property: 'hue', value: value[0] }));
    };

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{name}</h3>
                </div>
            </CardHeader>
            <CardContent>
                <div
                    className="w-full h-20 mb-4 rounded flex items-center justify-center"
                    style={{
                        backgroundColor,
                        color: textColor,
                    }}
                >
                    <span className="font-medium">
                        {name}
                    </span>
                </div>

                <div className="space-y-4">
                    <ColourSlider
                        id={id}
                        label="Lightness"
                        value={lightness}
                        syncSetting={syncSettings.lightness}
                        handler={handleLightnessChange}
                    />

                    <ColourSlider
                        id={id}
                        label="Chroma"
                        value={chroma}
                        syncSetting={syncSettings.chroma}
                        handler={handleChromaChange}
                        max={0.37}
                    />

                    <ColourSlider
                        id={id}
                        label="Hue"
                        value={hue}
                        syncSetting={syncSettings.hue}
                        handler={handleHueChange}
                        max={360}
                        step={1}
                    />
                </div>

                <div className="mt-4 p-2 bg-slate-100 rounded-md">
                    <code className="text-xs">
                        --{name}: oklch({lightness.toFixed(2)} {chroma.toFixed(2)} {Math.round(hue)});
                    </code>
                </div>
            </CardContent>
        </Card>
    );
}