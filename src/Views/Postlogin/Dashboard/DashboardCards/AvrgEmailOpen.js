import React from 'react';
import BarChart from "@cloudscape-design/components/bar-chart";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import { Container, Header } from '@cloudscape-design/components';

const AvrgEmailOpen = () => {




  return (
    <Container variant="borderless"
      header={
        <Header>
          <>
            <h4 className='font-extrabold text-sm'>Top Project Resources</h4>
           
</>
        </Header>
      }
      className="shadow-md rounded-xl border-[1px] border-[#E4E4E4] h-full"
    >
          <BarChart
      series={[
        {
          title: "Severe",
          type: "bar",
          data: [
            { x: new Date(1601058600000), y: 12 },
            { x: new Date(1601065800000), y: 18 },
            { x: new Date(1601073000000), y: 15 },
            { x: new Date(1601080200000), y: 9 },
            { x: new Date(1601087400000), y: 18 }
          ]
        },
        {
          title: "Moderate",
          type: "bar",
          data: [
            { x: new Date(1601058600000), y: 8 },
            { x: new Date(1601065800000), y: 11 },
            { x: new Date(1601073000000), y: 12 },
            { x: new Date(1601080200000), y: 11 },
            { x: new Date(1601087400000), y: 13 }
          ]
        },
        {
          title: "Low",
          type: "bar",
          data: [
            { x: new Date(1601058600000), y: 7 },
            { x: new Date(1601065800000), y: 9 },
            { x: new Date(1601073000000), y: 8 },
            { x: new Date(1601080200000), y: 7 },
            { x: new Date(1601087400000), y: 5 }
          ]
        },
        {
          title: "Unclassified",
          type: "bar",
          data: [
            { x: new Date(1601058600000), y: 14 },
            { x: new Date(1601065800000), y: 8 },
            { x: new Date(1601073000000), y: 6 },
            { x: new Date(1601080200000), y: 4 },
            { x: new Date(1601087400000), y: 6 }
          ]
        }
      ]}
      xDomain={[
        new Date(1601058600000),
        new Date(1601065800000),
        new Date(1601073000000),
        new Date(1601080200000),
        new Date(1601087400000)
      ]}
      yDomain={[0, 50]}
      i18nStrings={{
        xTickFormatter: e =>
          e
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: !1
            })
            .split(",")
            .join("\n")
      }}
      ariaLabel="Stacked bar chart"
      height={300}
      stackedBars
      xTitle="Time (UTC)"
      yTitle="Error count"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no data available
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no matching data to display
          </Box>
          <Button>Clear filter</Button>
        </Box>
      }
    />

    </Container>
  );
}

export default AvrgEmailOpen;
