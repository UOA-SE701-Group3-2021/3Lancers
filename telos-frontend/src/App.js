import './App.css';
import JournalText from './components/text/JournalText';
import Journal from './views/journal/Journal';

function App() {
  return (
    <div className="App" data-testid="test">
      <div className="Journal-view">
        <Journal />

        <div style={{width: '100px', height: '100px'}}>
        <JournalText />
      </div>
      </div>
    </div>
  );
}

export default App;
