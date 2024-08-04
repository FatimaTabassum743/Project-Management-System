import * as React from "react";
import { useState } from "react";
import {
  ContentLayout,
  Box,
  Wizard,
  FormField,
  Input,
  Button,
  Header,
  DateInput,
  Table,
  Container,
  SpaceBetween,
  ColumnLayout,
  Tabs,
  Textarea,
  Grid,
  DatePicker,
  BreadcrumbGroup
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../../Redux-Store/AddProjects/AddProject';
import ResourcePool from './Components/ResourcePool';
import edit from "../../../../assets/img/Group 1000004386.png";
import "../../../../assets/styles/cloudScapeCustom.css"

const AddProject = () => {
  const [membersRequired, setMembersRequired] = useState([]);

  const handleMembersRequiredUpdate = (members) => {
    setMembersRequired(members);
    // You can perform other actions with the updated members array here
    console.log('Updated Members Required:', members);
  };
  const [breadcrumbs, setBreadcrumbs] = useState([
    { text: "Dashboard" },
    { text: "Projects" },
    { text: "Create Project" },
  ]);

  const handleBreadcrumbClick = (breadcrumb) => {
    if (breadcrumb.text === "Projects") {
      setBreadcrumbs([
        { text: "Dashboard" },
        { text: "Projects" },
      ]);
     
      navigate("/app/projects");
    }
    else if(breadcrumb.text === "Dashboard"){
      setBreadcrumbs([
        { text: "Dashboard" },
        { text: "Projects" },
      ]);
     
      navigate("/app/dashboard");
    }
  };
  console.log(membersRequired,"array");


  const calculateTotalMembers = () => {
    return membersRequired.reduce((total, team) => total + team.members.length, 0);
  };


  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeTabId, setActiveTabId] = useState("tab-0");

  const [ProjectName, setProjectName] = useState('');
  const [ProjectDescription, setProjectDescription] = useState('');

  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (setter) => (event) => {
    if (event && typeof event === 'object') {
      if (event.detail && event.detail.selectedOption) {
        setter(event.detail.selectedOption);
      } else if (event.target && 'value' in event.target) {
        setter(event.target.value);
      } else if (event.detail && 'value' in event.detail) {
        setter(event.detail.value);
      } else {
        console.error('Unexpected event object:', event);
      }
    } else {
      console.error('Unexpected event object:', event);
    }
  };

  const handleConfirm = () => {
    const durationInMonths = calculateDurationInMonths(startDate, endDate);
    const newProject = {
      id: ProjectName,
      ProjectDescription,
      startDate,
      endDate,
      durationInMonths, // Include the calculated duration
      membersRequired // Add the membersRequired array
    };
    dispatch(addProject(newProject));
 
    navigate('/app/projects');
  };

  const handleCancel = () => {
    navigate('/app/projects');
  };

 
  const calculateDurationInMonths = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
    const monthsDifference = endDate.getMonth() - startDate.getMonth();
    return yearsDifference * 12 + monthsDifference;
  };

  const steps = [
    {
      id: 'details',
      title: 'Set Up Project',
      content: (
        <>
        <Container  className="SetUp-container" padding={{ vertical: 's', horizontal: 's' 
       
        }}
        header={
          <Header variant="h3">Step Up Project</Header>
        }>
         
          <FormField label="Project Name">
          <div style={{width:"57vw"}}>
            <Input placeholder="Project Name" value={ProjectName} onChange={handleChange(setProjectName)} />
            </div>
          </FormField>
          <FormField label="Description">
          <div style={{width:"57vw"}}>
            <Textarea  placeholder="Description" value={ProjectDescription} onChange={handleChange(setProjectDescription)} />
            </div>
          </FormField>
          <div style={{display:"flex",gap:"10px"}}>
          
          <FormField label="Start Date">
          <div style={{width:"27vw"}}>
          <DateInput placeholder="Start Date" value={startDate} onChange={handleChange(setstartDate)} />
          </div>
          </FormField>
       
          
          <FormField
      label="End Date" >
      <div style={{width:"29vw"}}>
      <DatePicker
        onChange={handleChange(setendDate)}
        value={endDate}
        openCalendarAriaLabel={selectedDate =>
          "Choose certificate expiry date" +
          (selectedDate
            ? `, selected date is ${selectedDate}`
            : "")
        }
        placeholder="End Date"
      />
      </div>
     
    
    </FormField>
    
    </div>
   
        </Container>
         <Box textAlign="center"  margin={{top:"xl",left:"s"}}>
       
          {activeStepIndex >= 1 && (
            <Button variant="link" onClick={() => setActiveStepIndex(activeStepIndex-1)} style={{ marginLeft: '1rem' }}>
              Back
            </Button>
          )}
            {activeStepIndex <= 1 &&(
          <Button variant="primary" onClick={() => setActiveStepIndex(activeStepIndex+1)} >Next</Button>
         )}
        </Box>
        </>
      ),

    },
    {
      id: 'resourcePool',
      title: 'Resource Pool',
      content: (
        <Box>
           <ResourcePool onMembersRequiredUpdate={handleMembersRequiredUpdate} />
          <Box textAlign="center" margin={{top:"xl",left:"s"}}>
         
            {activeStepIndex >= 1 && (
              <Button variant="link" onClick={() => setActiveStepIndex(activeStepIndex-1)} style={{ marginLeft: '1rem' }}>
                Back
              </Button>

            )}
              {activeStepIndex <= 1 &&(
            <Button variant="primary" onClick={() => setActiveStepIndex(activeStepIndex+1)} >Next</Button>
           )}
          </Box>
        </Box>
      ),
    },
    {
      id: 'review',
      title:"Review",
      
      content: (
        <SpaceBetween direction="vertical" size="s">
          <Container className="Review-Container">
            
            <Header variant="h3">Review</Header>
            <Grid
              disableGutters
              gridDefinition={[
                { colspan: 2 },
                { colspan: 10 },
              ]}
            >
              <Box>
                <img
                  src={edit}
                  style={{ width: "70px", height: "70px", cursor: "pointer" }}
                  alt="edit"
                  onClick={() => setActiveStepIndex(0)}
                />
              </Box>
              <div>
              <ColumnLayout columns={3} variant="text-grid">
                <div>
                  <strong>Project Name</strong>
                  <p>{ProjectName}</p>
                </div>
                <div>
                  <strong>Project Manager</strong>
                  <p>{}</p>
                </div>
                <div>
                  <strong>Project Duration</strong>
                  <p>
  {startDate} {isNaN(calculateDurationInMonths(startDate, endDate)) ? "0" : "to"} {endDate} 
  ({isNaN(calculateDurationInMonths(startDate, endDate)) 
    ? ""
    : calculateDurationInMonths(startDate, endDate)
  } months)
</p>


          </div>
              </ColumnLayout>
              <Box>
              <strong>Project Description</strong>
              <p>{ProjectDescription}</p>
            </Box>
              </div>
            </Grid>
           
          </Container>
          <Header variant="h3">Teams and Users ({calculateTotalMembers()})</Header>        
          <Tabs
          onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
          activeTabId={activeTabId}
          tabs={membersRequired.map((team, index) => ({
            label: team.teamName,
            id: `tab-${index}`,
            content: (
              <Table
               className="Members-table"
                header={<Header>{team.teamName}</Header>}
                columnDefinitions={[
                  {
                    header: 'Name',
                    cell: item => (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            marginRight: 8
                          }}
                        />
                        {item.name}
                      </div>
                    ),
                  },
                  {
                    header: 'Description',
                    cell: item => item.description
                  }
                ]}
                items={team.members}
                empty={
                  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
                    <b>No resources selected</b>
                  </Box>
                }
              />
            )
          }))}
        />

        
        </SpaceBetween>
      ),
    },
  ];

  return (
    <ContentLayout headerVariant="high-contrast" header={<Header variant="h3"
    actions={
      <Box textAlign="right">
         {activeStepIndex >= 2 && (
        <Button variant="link" onClick={() => setActiveStepIndex(activeStepIndex-1)} style={{ marginLeft: '1rem' }}>
          Back
        </Button>
      )}
    
        {activeStepIndex >= 2 && (
      <Button variant="primary" iconName="add-plus" onClick={handleConfirm}>Create Project</Button>
        )}
     
    </Box>
    }>Create Project</Header>}
    breadcrumbs={
      
      <BreadcrumbGroup
      items={breadcrumbs}
       
          onClick={({ detail }) => handleBreadcrumbClick(detail.item)}
        
      
      ariaLabel="Breadcrumbs"
    />

    }>
      
     
        <Wizard
        i18nStrings={{
          stepNumberLabel: stepNumber => `Step ${stepNumber}`,
          collapsedStepsLabel: (stepNumber, stepsCount) => `Step ${stepNumber} of ${stepsCount}`,
          previousButton: activeStepIndex === 2 ? '' : 'Back',
          nextButton: activeStepIndex === 2 ? '' : 'Next',
          submitButton: activeStepIndex === 2 ? '' : 'Submit',
          optional: 'optional',
        }}
        onNavigate={({ detail }) => setActiveStepIndex(detail.requestedStepIndex)}
        steps={steps}
        activeStepIndex={activeStepIndex}
        onCancel={handleCancel}
      />
       

  
     
    </ContentLayout>
    
  );
};

export default AddProject;
