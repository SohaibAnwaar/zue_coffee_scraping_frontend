import { QueryClient, QueryClientProvider } from "react-query";
import MapComponent from "./components/MapComponent";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MapComponent />
      </QueryClientProvider>
    </>
  );
}

export default App;
