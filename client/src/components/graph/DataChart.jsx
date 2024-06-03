import { useCallback, useEffect, useMemo, useState } from "react";
import LineChart from "./LineChart";
import DataTable from "../DataTable/DataTable";
import {
  Card,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
  Typography,
  Box,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { getDashboard } from "../../services";

const initialOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      labels: {
        font: {
          size: 12,
        },
      },
      borderRadius: 10,
    },
    tooltip: {
      backgroundColor: "rgba(0,0,0,0.8)",
      borderColor: "#fff",
      borderWidth: 1,
      titleColor: "#fff",
      bodyColor: "#fff",
      bodySpacing: 10,
      displayColors: false,
      callbacks: {
        label: function (context) {
          return `Population ${context.parsed.y}`;
        },
      },
    },
    title: {
      display: true,
      text: "",
      font: {
        size: 16,
        family: "sans-serif",
        letterSpacing: 10,
      },
      padding: 20,
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: "rgba(54, 162, 235, 0.2)",
      },
      ticks: {
        font: {
          size: 14,
          family: "sans-serif",
        },
      },
      title: {
        display: true,
        text: "",
        color: "gray",
      },
    },
    y: {
      grid: {
        display: true,
        color: "rgba(54, 162, 235, 0.2)",
      },
      ticks: {
        font: {
          size: 14,
        },
      },
      title: {
        display: true,
        text: "Number",
        color: "gray",
      },
    },
  },
};

const DataChart = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [filters, setFilters] = useState({
    year: "2016",
    country: "none",
    others: "topic",
  });

  useEffect(() => {
    const dashboard = getDashboard();
    dashboard.then((response) => {
      setFetchedData(() => response);
    });
  }, []);

  const sortDataByYear = (arr) => {
    if (!arr.length) {
      return;
    }
    const sortedData = {};
    arr.forEach((item) => {
      const date = new Date(item.added);
      const year = date.getFullYear();

      if (sortedData[year]) {
        sortedData[year].push(item);
      } else {
        sortedData[year] = [item];
      }
    });
    Object.keys((year) => {
      sortedData[year].sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    });
    return sortedData;
  };

  const sortdata = useMemo(() => {
    return sortDataByYear(fetchedData);
  }, [fetchedData]);

  const getYears = useCallback(() => {
    if (sortdata) {
      return Object.keys(sortdata);
    }
  }, [sortdata]);

  useEffect(() => {
    if (getYears()) {
      console.log("getyears", getYears()[0]);
      setFilters({ ...filters, year: getYears()[0] });
    }
  }, [getYears, sortdata]); // initailly we will set dynamic year , that is why we have sortData dependancy

  useEffect(() => {
    console.log({ filters });
    if (sortdata) {
      setChartData(chartDataByFilters(filters, sortdata));
    }
  }, [filters, sortdata]);

  const aggregateData = (arr, value) => {
    const result = Object.values(
      arr.reduce((acc, item) => {
        const key = item[value];

        if (!acc[key]) {
          acc[key] = { ...item };
        } else {
          acc[key][value] += item[value];
        }
        return acc;
      }, {})
    );
    return result;
  };

  const chartDataByFilters = (filter, data) => {
    console.log("DATA", data);
    if (data) {
      let tempData;

      if (filter.year) {
        tempData = data[filter.year];
      }
      if (filter.country === "none") {
        tempData = data[filter.year];
      } else {
        tempData = tempData.filter((data) => data.country === filter.country);
      }
      console.log("data", tempData, filter);
      return tempData;
    }
  };

  const handleFilterChange = (key, value) => {
    const temp = { ...filters };
    temp[key] = value;
    setFilters(() => temp);
  };

  const labels = (data) => {
    if (data) {
      const labelArr = data.map((data) => data[filters.others]);
      if (data.length) {
        const sortedLabelArr = [...new Set(labelArr)];
        return sortedLabelArr;
      }
      return labelArr;
    }
  };

  const countries = useMemo(() => {
    return [...new Set(fetchedData.map((data) => data.country))];
  }, [fetchedData]);

  const data = useMemo(() => {
    return {
      labels: labels(chartData),
      datasets: [
        {
          label: "Intensity",
          data: aggregateData(chartData, "intensity").map(
            (value) => value.intensity
          ),
          borderColor: "green",
          pointRadius: 0,
        },
        {
          label: "Relevance",
          data: aggregateData(chartData, "relevance").map(
            (value) => value.relevance
          ),
          borderColor: "red",
          pointRadius: 0,
        },
        {
          label: "Likelihood",
          data: aggregateData(chartData, "likelihood").map(
            (value) => value.likelihood
          ),
          borderColor: "purple",
          pointRadius: 0,
        },
      ],
    };
  }, [chartData, filters]);

  return (
    <>
      <Card sx={{ padding: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {getYears()?.map((year, index) => (
              <Button
                variant={year === filters.year ? "contained" : "outlined"}
                onClick={() => handleFilterChange("year", year)}
                key={index}
                color={year === filters.year ? "success" : "primary"}
                sx={{ marginLeft: "5px" }}
              >
                {year}
              </Button>
            ))}
          </div>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Filter
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={filters.others}
              onChange={(e) => handleFilterChange("others", e.target.value)}
              row
            >
              <FormControlLabel
                value="topic"
                control={<Radio />}
                label="Topic"
              />
              <FormControlLabel
                value="sector"
                control={<Radio />}
                label="Sector"
              />
              <FormControlLabel
                value="region"
                control={<Radio />}
                label="Region"
              />
              <FormControlLabel
                value="pestle"
                control={<Radio />}
                label="Pestle"
              />
            </RadioGroup>
            <FormControl size="small">
              <InputLabel id="demo-select-small-label">Country</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filters.country}
                label="Age"
                onChange={(e) => handleFilterChange("country", e.target.value)}
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormControl>
        </div>
        <LineChart options={initialOptions} data={data} />
      </Card>
      <Box padding={2} textAlign="left">
        <Divider textAlign="left">
          <Typography variant="body2">Data Table</Typography>
        </Divider>
      </Box>
      <DataTable data={chartData} />
    </>
  );
};

export default DataChart;
