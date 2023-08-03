import logo from './logo.svg';
import './App.css';
import TestPage, { TestMqttCon } from './components/TestPage';
import { TestGamepadConnect } from './components/TestPage';
import MqttCamera from './components/MqttCamera';
import MqttCameraTest from './components/MqttCameraTest';
import MqttPublisher from './components/MqttPublisher';
import MqttCameraTry from './components/MqttCameraTry';

function App() {
  return (
    <div className="App">
      <div>Welcome DOFBOT</div>
      <MqttCameraTry />
    </div>
  );
}

export default App;
