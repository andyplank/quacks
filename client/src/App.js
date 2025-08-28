import './App.css';
import QuacksClient from './Game/Game';
import { Lobby } from 'boardgame.io/react';

import QuacksGame from './Game/QuacksGame';

function App() {
  return (
    <div className="App">
      <Lobby
        gameServer={`http://localhost:8000`}
        lobbyServer={`http://localhost:8000`}
        gameComponents={[
          { game: QuacksGame, board: QuacksClient }
        ]}
      />;
    </div>
  );
}

export default App;
