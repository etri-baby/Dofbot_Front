import logo from './logo.svg';
import './App.css';
import TestPage, { TestMqttCon } from './components/TestPage';
import { TestGamepadConnect } from './components/TestPage';
import MqttCamera from './components/MqttCamera';

function App() {
  return (
    <div className="App">
      <div>Welcome DOFBOT</div>
      <MqttCamera></MqttCamera>
    </div>
  );
}

export default App;
