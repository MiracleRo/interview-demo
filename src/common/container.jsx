import { Routes, Route, Outlet } from "react-router-dom";

import Battery from "../page/Battery";

function Container() {
  return (
    <div className="container">
      <Routes>
        <Route element={<Outlet />}>
          <Route path="/battery" element={<Battery />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Container;
