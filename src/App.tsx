import './App.css'
import ColourCard from './components/ColourCard'
import { Button } from './components/ui/button';
import { useAppDispatch, useAppSelector } from './store';
import { addColour } from './store/colours';

function App() {
  const dispatch = useAppDispatch();
  const colours = useAppSelector(state => state.coloursReducer.colours);

  const handleAddColour = () => {
    dispatch(addColour())
  }
  return (
    <>
      <div>OKLCH Colour Token Generator</div>
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
        className="w-full"
      >
        Add Color
      </Button>
    </>
  )
}

export default App
