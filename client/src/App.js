import Container from "@mui/material/Container";
import Navbar from "./components/navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

export default function App() {
  

  return (
    <StyledEngineProvider injectFirst>
      <Container max-width="xl">
        <Navbar />
        <Outlet />
      </Container>
    </StyledEngineProvider>
  );
}
