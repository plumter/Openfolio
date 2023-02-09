import Layout from "app/common/Layout";
import Home from "app/pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";

const App = _ => {

  return  <Layout>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </Layout>
}

export default App;
