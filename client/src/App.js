import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/components/layout/main.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import SmartArmDashboard from './components/smart_arm/SmartArmDashboard';
import SmartFarmDashboard from './components/smart_farm/SmartFarmDashboard';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/smart_arm" element={<SmartArmDashboard />} />
                <Route path="/smart_farm" element={<SmartFarmDashboard />} />
                <Route path="/" element={<Navigate to="/smart_farm" />} />
            </Routes>
        </div>
    );
}

export default App;
