import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function ColourPreview() {
    const colours = useSelector((state: RootState) => state.coloursReducer.colours);
    return (
        <div>
            <Card>
                <CardHeader>
                    <h3 className="text-lg font-medium mb-4">Preview</h3>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {colours.map((colour) => (
                            <div
                                key={colour.id}
                                className="p-4 rounded shadow-sm flex flex-col items-center justify-center h-20"
                                style={{
                                    backgroundColor: `oklch(${colour.lightness} ${colour.chroma} ${colour.hue})`,
                                    color: colour.lightness > 0.6 ? '#000' : '#fff'
                                }}
                            >
                                <span className="font-medium">{colour.name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}