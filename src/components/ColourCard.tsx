import { Card } from "./ui/card";

type ColourCardProps = {
    name: string;
    lightness: number;
    chroma: number;
    hue: number;
}

export default function ColourCard({ name, lightness, chroma, hue }: ColourCardProps) {
    const colourValue = `oklch(${lightness} ${chroma} ${hue})`
    const textColour = lightness > 0.6 ? '$#000000' : '#ffffff'

    return (
        <Card style={{
            backgroundColor: colourValue,
            color: textColour,
        }}>
            <h1>{name}</h1>
            <p>L: {lightness.toFixed(2)}</p>
            <p>C: {chroma.toFixed(2)}</p>
            <p>H: {Math.round(hue)}</p>
        </Card>
    )
}