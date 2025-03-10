import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@/context/theme-provider";
import Layout from "@/components/layout";
import HomePage from "@/pages/home";
import { AuthProvider } from "@/context/auth-provider";
import ThesisOverviewPage from "@/pages/thesis-overview";
import GoogleCallback from "@/pages/google-auth";
import ThesisFormPage from "@/pages/thesis-create";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="thesis-forge-theme">
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/google-auth" element={<GoogleCallback />} />
            <Route path="/theses" element={<ThesisOverviewPage />} />
              <Route path="/thesis/new" element={<ThesisFormPage />} />
                {/* <Route path="/thesis/edit/:id" element={<ThesisFormPage />} /> */}
          </Routes>
        </Layout>
        {/* <Toaster /> */}
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
