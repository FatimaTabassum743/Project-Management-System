import React from 'react';
import {
  Box,
  ColumnLayout,
  Popover,

} from '@cloudscape-design/components';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';

import DailyRevenue from './DashboardCards/DailyRevenue';
import AvrgEmailOpen from './DashboardCards/AvrgEmailOpen';
import Calendar from '@cloudscape-design/components/calendar';

const Dashboard = () => {
  const [isPopoverVisible, setPopoverVisible] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState(getCurrentMonthYear());
  const date = new Date();

  const month = date.toLocaleString('default', { month: 'long' });

  function getCurrentMonthYear(date = new Date()) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  const handleButtonClick = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  const handleCalendarChange = ({ detail }) => {
    const selectedDate = new Date(detail.value);
    setSelectedMonth(getCurrentMonthYear(selectedDate));
    setPopoverVisible(false); // Close the popover
  };

  return (
    <>
      <ContentLayout
        headerVariant="high-contrast"
        header={
          <Header
            actions={
              <SpaceBetween alignItems="center" direction="horizontal" size="xs">
                <div>
                  <Popover
                    triggerType="custom"
                    content={
                      <Calendar
                        onChange={handleCalendarChange}
                        value={null}
                         // Initially set to null
                           granularity="month"
                      />
                    }
                  >
                    <Button onClick={handleButtonClick} variant="primary">
                      {selectedMonth.startsWith(month) ? 'Calender' : selectedMonth}
                    </Button>
                  </Popover>
                </div>
              </SpaceBetween>
            }
            variant="h1"
          >
            Dashboard
          </Header>
        }
      >


      <SpaceBetween direction="vertical" size="s">
    <Container className='border-gray-100 shadow-md ml-0
    '>
      
    <ColumnLayout columns={4} variant='default' minColumnWidth={230}>
    <div>
      <Box variant="awsui-key-label">Total Projects</Box>
   <span style={{color:'#0958D9' , fontSize:40 ,fontWeight:'bolder', lineHeight:1.3}}>
    13
    </span>
    </div>
    <div >
      <Box variant="awsui-key-label">Complete Projects</Box>
       <span style={{color:'#5F6B7A' , fontSize:40 ,fontWeight:'bolder', lineHeight:1.3}}> 
        12 </span>
    </div>
  
    <div>
      <Box variant="awsui-key-label">Inprogress Project</Box>
      <span style={{color:'#29AD32' , fontSize:40 ,fontWeight:'bolder', lineHeight:1.3}}>
      5
      </span>
    </div>
  
    <div>
      <Box variant="awsui-key-label">Unassigned Projects</Box>
      <span style={{color:'#0958D9' , fontSize:40 ,fontWeight:'bolder', lineHeight:1.3}}>
      3
      </span>
    </div>
  </ColumnLayout>
  </Container>

 <Container>
      <AvrgEmailOpen/>
      </Container>
    
     <DailyRevenue/>
    
    </SpaceBetween>
     </ContentLayout>
  
  </>

  )
}

export default Dashboard