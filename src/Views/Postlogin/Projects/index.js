import { Box, BreadcrumbGroup, Button, ContentLayout, Header, SpaceBetween } from '@cloudscape-design/components';
import React, { useState } from 'react';
import AllProjects from './ProjectCompo/AllProjects';
import AddProject from './ProjectCompo/Addproject';
import { useNavigate, useLocation } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('allProjects');
  const [breadcrumbs, setBreadcrumbs] = useState([
    { text: "Dashboard", href: "/app/dashboard" },
    { text: "Projects", href: "/app/projects" },
  ]);
  const [heading, setHeading] = useState("Projects");

  const handleButtonClick = () => {
    setBreadcrumbs([
      { text: "Dashboard", href: "/app/dashboard" },
      { text: "Projects", href: "/app/projects" },
      { text: "Create Project", href: "/app/project/create-project" }
    ]);
    setHeading("Create Project");
    setView('createProject');
    navigate("/app/project/create-project");
  };

  const handleBreadcrumbClick = (breadcrumb) => {
    if (breadcrumb.text === "Projects") {
      setBreadcrumbs([
        { text: "Dashboard", href: "/app/dashboard" },
        { text: "Projects", href: "/app/projects" },
      ]);
      setHeading("Projects");
      setView('allProjects');
      navigate("/app/projects");
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
        <AllProjects onCreateProject={handleButtonClick} />
      )}
      {view === 'createProject' && (
        <AddProject />
      )}
    </ContentLayout>
  );
};

export default Projects;
