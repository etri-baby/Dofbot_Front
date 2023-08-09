import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/components/layout/main.css';

import { Routes, Route } from 'react-router-dom';

import SmartArmDashboard from './components/smart_arm/SmartArmDashboard';
import SmartFarmDashboard from './components/smart_farm/SmartFarmDashboard';
import SmartHomeDashboard from './components/smart_home/SmartHomeDashboard';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/smart_arm" element={<SmartArmDashboard />} />
                <Route path="/smart_farm" element={<SmartFarmDashboard />} />
                <Route path="/smart_home" element={<SmartHomeDashboard />} />
            </Routes>
        </div>
    );
}

export default App;
