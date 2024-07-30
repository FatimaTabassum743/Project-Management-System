import { Box, BreadcrumbGroup, Button, ContentLayout, Header, SpaceBetween } from '@cloudscape-design/components';
import React, { useState } from 'react';
import AllProjects from './Components/AllProjects';
import AddProject from './Addproject/index';
import { useNavigate, useLocation } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';

const Projects = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('allProjects');
  const [breadcrumbs, setBreadcrumbs] = useState([
    { text: "Dashboard" },
    { text: "Projects" },
  ]);
  const [heading, setHeading] = useState("Projects");

  const handleButtonClick = () => {
    setBreadcrumbs([
      { text: "Dashboard" },
      { text: "Projects", },
      { text: "Procurement",  }
    ]);
    setHeading("Procurement");
    setView('ProjectName');
  
  };

  const handleBreadcrumbClick = (breadcrumb) => {
    if (breadcrumb.text === "Projects") {
      setBreadcrumbs([
        { text: "Dashboard" },
        { text: "Projects" },
      ]);
      setHeading("Projects");
      setView('allProjects');
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
    <ContentLayout
      headerVariant="high-contrast"
      defaultPadding
      breadcrumbs={
        <BreadcrumbGroup
          items={breadcrumbs}
          ariaLabel="Breadcrumbs"
          onClick={({ detail }) => handleBreadcrumbClick(detail.item)}
        />
      }
      header={
        <Header variant="h1">
          {heading}
        </Header>
      }
    >
      {view === 'allProjects' && (
        <AllProjects specificProjectDetails={handleButtonClick} />
      )}
      {view === 'ProjectName' && (
        <ProjectDetails /> // we have to give param and routing here i will do it later
      )}
    </ContentLayout>
  );
};

export default Projects;
