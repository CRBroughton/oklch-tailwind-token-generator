import './App.css'
import ColourCard from './components/ColourCard'

function App() {
  return (
    <>
      <div>OKLCH Colour Token Generator</div>
      <div>
        <ColourCard
          name='Primary'
          lightness={0.55}
          chroma={0.2}
          hue={250}
        />
        <ColourCard
          name='Primary'
          lightness={0.55}
          chroma={0.2}
          hue={250}
        />
        <ColourCard
          name='Primary'
          lightness={0.55}
          chroma={0.2}
          hue={250}
        />
      </div>
    </>
  )
}

export default App
