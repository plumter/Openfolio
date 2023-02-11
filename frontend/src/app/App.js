import Layout from "app/common/Layout";
import CustomizeProfile from "app/pages/customize-profile";
import Home from "app/pages/Home";
import ViewProfile from "app/pages/ViewProfile";
import { Navigate, Route, Routes } from "react-router-dom";

const App = _ => {

  return  <Layout>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/customize" element={<CustomizeProfile />} />
                  <Route path="/preview" element={<ViewProfile />} />
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </Layout>
}

export default App;
