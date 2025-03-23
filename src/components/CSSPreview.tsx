import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

export default function CSSPreview() {
  const colours = useSelector((state: RootState) => state.coloursReducer.colours);

  const generateCSS = () => {
    let css = ':root {\n';
    colours.forEach(colour => {
      css += `  --${colour.name}: oklch(${colour.lightness.toFixed(2)} ${colour.chroma.toFixed(2)} ${Math.round(colour.hue)} / ${colour.alpha}%);\n`;
    });
    css += '}';
    return css;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS())
      .then(() => {
        alert('CSS copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium">Generated CSS</h3>
          <Button
            onClick={copyToClipboard}
            className="cursor-pointer"
          >
            Copy
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm">
          {generateCSS()}
        </pre>
      </CardContent>
    </Card>
  );
};