import { Lobby } from "./pages/Lobby";
import { useGame } from "./store/useGame";

function App() {
  const hasStarted = useGame((state) => state.hasStarted);

  return (
    <>
      {
        hasStarted ? (
          <h1>Game</h1>
        ) : <Lobby />
      }
    </>
  );
}

export default App;
