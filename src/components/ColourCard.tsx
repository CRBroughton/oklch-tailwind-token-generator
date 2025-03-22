import { Card, CardContent, CardHeader } from "./ui/card";

type ColourCardProps = {
    id: number;
    name: string;
    lightness: number;
    chroma: number;
    hue: number;
}

export default function ColourCard({ id, name, lightness, chroma, hue }: ColourCardProps) {
    const backgroundColor = `oklch(${lightness} ${chroma} ${hue})`
    const color = lightness > 0.6 ? '$#000000' : '#ffffff'
    return (
        <Card>
            <CardHeader>
                <h1 className="text-2xl">{name}</h1>
            </CardHeader>
            <CardContent>,
                <div key={id}
                    style={{
                        backgroundColor,
                        color,
                    }}
                >
                    <span className="font-medium">{name}</span>
                    <span className="text-xs opacity-80 mt-1">
                        L: {lightness.toFixed(2)} • C: {chroma.toFixed(2)} • H: {Math.round(hue)}°
                    </span>
                </div>
            
            </CardContent>
        </Card>
    )
}