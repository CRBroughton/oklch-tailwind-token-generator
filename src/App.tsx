import { PlusCircle } from 'lucide-react';
import './App.css'
import ColourCard from './components/ColourCard'
import { Button } from './components/ui/button';
import { useAppDispatch, useAppSelector } from './store';
import { addColour } from './store/colours';
import SyncController from './components/SyncController';

function App() {
  const dispatch = useAppDispatch();
  const colours = useAppSelector(state => state.coloursReducer.colours);

  const handleAddColour = () => {
    dispatch(addColour())
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">OKLCH Color Token Generator</h1>
      <SyncController />
      <div className='grid gap-8'>
        {colours.map(colour => (
          <ColourCard
            key={colour.id}
            id={colour.id}
            name={colour.name}
            lightness={colour.lightness}
            chroma={colour.chroma}
            hue={colour.hue}
          />
        ))}
      </div>
      <Button
        variant="outline"
        onClick={handleAddColour}
        className="w-full border-dashed"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Color
      </Button>
    </>
  )
}

export default App
