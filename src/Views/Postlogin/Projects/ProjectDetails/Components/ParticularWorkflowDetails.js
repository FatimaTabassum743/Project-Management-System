import React from 'react';
import {
    Box,
    Button,
    ColumnLayout,
    Container,
    Grid,
    Header,
    SpaceBetween
} from '@cloudscape-design/components';

const ParticularWorkflowDetails = ({ workflow,back }) => {
    if (!workflow) {
        return null;
    }

    return (
       
      
        
           
      
         <Grid
      gridDefinition={[
        { colspan: { default: 5, xxs: 5 } },
        { colspan: { default: 7, xxs: 7 } }
      ]}
    >
                    <Box>
                    <SpaceBetween direction="horizontal" size="s">
                    <Button variant="normal" iconName='arrow-left' onClick={back}>Back To Template</Button>
                    <Header variant="h2">
                    {/* {workflow.title} */}
                    Development Workflow
                </Header>
                        {/* <h3>Description</h3> */}
                        <p>
                            {/* {workflow.description} */}
                            Application development workflow is 
                            a structured series of stages that guide
                             a project from conception to completion.
                              This process ensures the efficient and 
                              effective creation of software applications 
                              that meet user needs and business requirements.
                               Here's an overview 
                            of the typical application development workflow
                            </p>
                   
                         <Button variant="primary" iconName='add-plus'>Use this Workflow</Button>
                         
                      </SpaceBetween>
                    </Box>
                    <div style={{backgroundColor:"#D1D5DB",borderRadius:"16px", height:"600px", textAlign:"center", display:"flex", justifyContent:"center",alignItems:"center"}}>
                    <img src={workflow.imageUrl} alt={workflow.title} style={{ width: '400px', height: 'auto', borderRadius: '8px' }} />
                    </div>
                </Grid>
               
           
          
     
    );
}

export default ParticularWorkflowDetails;
