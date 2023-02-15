import Layout from "app/common/Layout";
import CustomizeProfile from "app/pages/customize-profile";
import Home from "app/pages/Home";
import ViewProfile from "app/pages/ViewProfile";
import { queryClient } from "app/Queries";
import { QueryClientProvider } from "react-query";
import { Navigate, Route, Routes } from "react-router-dom";

const App = _ => {

  return  <QueryClientProvider client={queryClient}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/profile" element={<CustomizeProfile />} />
                    <Route path="/:id" element={<ViewProfile />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
          </QueryClientProvider>
}

export default App;
