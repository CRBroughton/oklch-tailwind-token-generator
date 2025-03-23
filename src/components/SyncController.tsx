import { RootState } from "@/store";
import { toggleSync } from "@/store/colours";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function SyncController() {
    const dispatch = useDispatch();
    const syncSettings = useSelector((state: RootState) => state.coloursReducer.syncSettings);

    return (
        <Card>
            <CardHeader>
                <h3 className="text-base font-medium">Sync Properties</h3>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-6">
                    <Label htmlFor="lightness" className="flex items-center space-x-2 cursor-pointer">
                        Sync Lightness
                        <Checkbox
                            id="lightness"
                            checked={syncSettings.lightness}
                            onCheckedChange={() => dispatch(toggleSync('lightness'))}
                            className="h-4 w-4 cursor-pointer"
                        />

                    </Label>
                    <Label htmlFor="chroma" className="flex items-center space-x-2 cursor-pointer">
                        Sync Chroma
                        <Checkbox
                            id="chroma"
                            checked={syncSettings.chroma}
                            onCheckedChange={() => dispatch(toggleSync('chroma'))}
                            className="h-4 w-4 cursor-pointer"
                        />
                    </Label>
                    <Label htmlFor="hue" className="flex items-center space-x-2 cursor-pointer">
                        Sync Hue
                        <Checkbox
                            id="hue"
                            checked={syncSettings.hue}
                            onCheckedChange={() => dispatch(toggleSync('hue'))}
                            className="h-4 w-4 cursor-pointer"
                        />
                    </Label>
                </div>
            </CardContent>
        </Card>
    );
};