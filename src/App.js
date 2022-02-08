import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Pages from "./components/pages/Pages";
import Home from "./components/homes/Home";
import OneLevel from "./components/one-level-decom/OneLevel";
import TwoLevel from "./components/two-level-decom/TwoLevel";
import ThreeLevel from "./components/three-level-decom/ThreeLevel";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Pages />}>
          <Route path="/" element={<Home />} />
          <Route path="/one-level" element={<OneLevel />} />
          <Route path="/two-level" element={<TwoLevel />} />
          <Route path="/three-level" element={<ThreeLevel />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
