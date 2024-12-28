import { Game } from "./pages/Game";
import { Lobby } from "./pages/Lobby";
import { useGame } from "./store/useGame";

function App() {
  const hasStarted = useGame((state) => state.hasStarted);

  return (
    <>
      {
        hasStarted ? <Game /> : <Lobby />
      }
    </>
  );
}

export default App;
