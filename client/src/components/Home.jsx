import DataChart from "./graph/DataChart";
import { Box } from "@mui/material";
import Header from "./Header";

const HomePage = () => {
  return (
    <>
      <Header title="Dashboard" />
      <Box>
        <DataChart />
      </Box>
    </>
  );
};

export default HomePage;
