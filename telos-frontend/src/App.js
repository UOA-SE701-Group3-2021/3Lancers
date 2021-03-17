import './App.css';
import Journal from './views/journal/Journal';

function App() {
  return (
    <div className="App" data-testid="test">
      <div className="Journal-view">
        <Journal />
      </div>
    </div>
  );
}

export default App;
