import logo from './logo.svg';
import './App.css';
import TestPage, { TestMqttCon } from './components/TestPage';
import { TestGamepadConnect } from './components/TestPage';
import MqttCameraTry from './components/MqttCameraTry';

function App() {
  return (
    <div className="App">
      <div>Welcome DOFBOT</div>
      <TestGamepadConnect />
      <MqttCameraTry />
    </div>
  );
}

export default App;
