import React, { useEffect } from 'react';
import * as Font from 'expo-font';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigator from "./src/navigation/Navigation";

// import ClashDisplayBold from 'src/assets/fonts/ClashDisplay-Bold.otf';


const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        // 'ClashDisplay-Bold': ClashDisplayBold,
      });
    }

    loadFonts();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
};

export default App;
