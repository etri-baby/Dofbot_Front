import logo from './logo.svg';
import './App.css';
import TestPage from './components/TestPage';
import { TestGamepadConnect } from './components/TestPage';

function App() {
  return (
    <div className="App">
      <div>Welcome DOFBOT</div>
      <TestPage></TestPage>
      <TestGamepadConnect></TestGamepadConnect>
    </div>
  );
}

export default App;
