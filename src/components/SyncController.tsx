import { RootState, useAppSelector } from "@/store";
import { toggleSync } from "@/store/colours";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { removeStateFromLocalStorage } from "@/utils/localStorage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import ColourSlider from "./ColourSlider";

export default function SyncController() {
  const dispatch = useDispatch();
  const syncSettings = useSelector((state: RootState) => state.coloursReducer.syncSettings);
  const firstColour = useAppSelector(state => state.coloursReducer.colours[0]);

  const handleClearStorage = () => {
    removeStateFromLocalStorage('coloursState');
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium">Sync Controller</h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="cursor-pointer">
                Clear storage
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all colours and settings to their default values.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearStorage}>
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-6">
          <Label htmlFor="lightness" className="flex items-center space-x-2 cursor-pointer">
            Sync Lightness
            <Checkbox
              id="lightness"
              className="h-4 w-4 cursor-pointer"
              checked={syncSettings.lightness}
              onCheckedChange={() => dispatch(toggleSync('lightness'))}
            />
          </Label>
          <Label htmlFor="chroma" className="flex items-center space-x-2 cursor-pointer">
            Sync Chroma
            <Checkbox
              id="chroma"
              className="h-4 w-4 cursor-pointer"
              checked={syncSettings.chroma}
              onCheckedChange={() => dispatch(toggleSync('chroma'))}
            />
          </Label>
          <Label htmlFor="hue" className="flex items-center space-x-2 cursor-pointer">
            Sync Hue
            <Checkbox
              id="hue"
              className="h-4 w-4 cursor-pointer"
              checked={syncSettings.hue}
              onCheckedChange={() => dispatch(toggleSync('hue'))}
            />
          </Label>
          <Label htmlFor="alpha" className="flex items-center space-x-2 cursor-pointer">
            Sync Alpha
            <Checkbox
              id="alpha"
              className="h-4 w-4 cursor-pointer"
              checked={syncSettings.alpha}
              onCheckedChange={() => dispatch(toggleSync('alpha'))}
            />
          </Label>

        </div>
        {(syncSettings.lightness || syncSettings.chroma || syncSettings.hue || syncSettings.alpha) &&
          <div className="pt-8 space-y-4">
            {syncSettings.lightness &&
            <ColourSlider
              id={firstColour.id}
              label="Lightness"
              property="lightness"
              value={firstColour.lightness}
              syncSetting={syncSettings.lightness}
            />}
            {syncSettings.chroma &&
            <ColourSlider
              id={firstColour.id}
              label="Chroma"
              property="chroma"
              value={firstColour.chroma}
              syncSetting={syncSettings.chroma}
              max={0.37}
            />}
            {syncSettings.hue &&
            <ColourSlider
              id={firstColour.id}
              label="Hue"
              property="hue"
              value={firstColour.hue}
              syncSetting={syncSettings.hue}
              max={360}
              step={1}
            />}
            {syncSettings.alpha &&
            <ColourSlider
              id={firstColour.id}
              label="Alpha"
              property="alpha"
              value={firstColour.alpha}
              syncSetting={syncSettings.alpha}
              max={100}
              step={1}
            />}
          </div>
        }
      </CardContent>
    </Card>
  );
};