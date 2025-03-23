import { RootState } from "@/store";
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

export default function SyncController() {
  const dispatch = useDispatch();
  const syncSettings = useSelector((state: RootState) => state.coloursReducer.syncSettings);

  const handleClearStorage = () => {
    removeStateFromLocalStorage('coloursState');
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium">Sync Properties</h3>
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
          <Label htmlFor="alpha" className="flex items-center space-x-2 cursor-pointer">
            Sync Alpha
            <Checkbox
              id="lpga"
              checked={syncSettings.alpha}
              onCheckedChange={() => dispatch(toggleSync('alpha'))}
              className="h-4 w-4 cursor-pointer"
            />
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};