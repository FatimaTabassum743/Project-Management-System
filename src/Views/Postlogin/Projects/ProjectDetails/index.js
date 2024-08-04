import { Box, BreadcrumbGroup,Button, ColumnLayout, Container, ContentLayout, Grid, Header, Modal, SegmentedControl, SpaceBetween } from '@cloudscape-design/components';

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import edit from "../../../../assets/img/Group 1000004386.png";
import { useSelector } from 'react-redux';
import AddWorkflow from './Components/AddWorkflow';
import "../../../../assets/styles/cloudScapeCustom.css"

const ProjectDetails = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const onCreateWorkflow = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };
  const navigate =useNavigate()
  const [selectedId, setSelectedId] = React.useState(
    "seg-1"
  );
  const ProjectDetails = useSelector(state => state.AddProject);
  const [breadcrumbs, setBreadcrumbs] = useState([
    { text: "Dashboard" },
    { text: "Projects" },
    { text: ProjectDetails[0]?.id||"new" },
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
  return (
             
    <ContentLayout headerVariant="high-contrast" header={<Header variant="h3">{ProjectDetails[0]?.id||"New"}</Header>}
      breadcrumbs={
        
        <BreadcrumbGroup
        items={breadcrumbs}
         
            onClick={({ detail }) => handleBreadcrumbClick(detail.item)}
          
        
        ariaLabel="Breadcrumbs"
      />
  
      }>
    <Box>
      <SpaceBetween direction='vertical' size='s'>
         <Container className='Project-Details'>
            
           
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
                  // onClick={() => setActiveStepIndex(0)}
                />
              </Box>
              <div>
              <ColumnLayout columns={3} variant="text-grid">
                <div>
                  <strong>Project Name</strong>
                  <h3>{ProjectDetails[0].id}</h3>
                </div>
                <div>
                  <strong>Project Manager</strong>
                  <span style={{ display:"flex" , gap:"10px" , alignItems:"center"}}>
                  {/* <img src={ProjectDetails[0].membersRequired[0]?.imageUrl} alt='manager ' height={20} width={20}></img>
                  <h3>{ProjectDetails[0].membersRequired[0]?.name}</h3> */}
                    
                  </span>
                </div>
                <div>
                  <strong>Project Duration</strong>
  
<h3>{ProjectDetails[0]?.startDate}to{ProjectDetails[0]?.endDate}({ProjectDetails[0].durationInMonths} Months)</h3>


          </div>
              </ColumnLayout>
              <Box variant="p">
              <strong>Project Description</strong>
              <p>{ProjectDetails[0]?.ProjectDescription}</p>
            </Box>
              </div>
            </Grid>
            
           
           
          </Container>
        
          <SegmentedControl
      selectedId={selectedId}
      onChange={({ detail }) =>
        setSelectedId(detail.selectedId)
      }
      label="Segmented control with icons"
      options={[
        {
          text: "Workflows",
          iconName: "view-full",
          id: "seg-1"
        },
        {
          text: "Teams",
          iconName: "view-horizontal",
          id: "seg-2"
        },
        {
          text: "UseCases",
          iconName: "view-vertical",
          id: "seg-3"
        }
      ]}
    />
    
      

        <Container className='Add-Workflow'>
          <SpaceBetween direction='vertical' size='s'>
            
            <p>You currently have no workflows in your project.
               It's like trying to bake a cake without a recipe! To
               streamline your process, please add a workflow.</p>
            <Box textAlign='center'>
              <Button 
                iconName="add-plus"
                variant="primary"
                onClick={onCreateWorkflow}
              >
                Add Workflow
              </Button>
              
              <Modal
              size='max'
        onDismiss={onCloseModal}
        visible={isModalVisible}
        // header="Add Workflow"
    
       
      >
        <AddWorkflow/> {/* Render your component inside the modal */}
      </Modal>
              
              
            </Box>
          </SpaceBetween>
           
        </Container>
 
    </SpaceBetween>

          </Box>
          </ContentLayout>
  )
}

export default ProjectDetails
