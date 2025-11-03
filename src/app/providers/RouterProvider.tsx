import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShipsListPage } from '../../pages/ships-list/ui/ShipsListPage';
import { ShipDetailsPage } from '../../pages/ship-details/ui/ShipDetailsPage';

export const RouterProviderApp = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<ShipsListPage />} />
      <Route path="/ship/:techName" element={<ShipDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </HashRouter>
);
