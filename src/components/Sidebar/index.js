import * as React from "react";
import {  useNavigate } from "react-router-dom"; // Import Link and useNavigate
import SideNavigation from "@cloudscape-design/components/side-navigation";
import { Box } from "@cloudscape-design/components";


const Sidebar = () => {
  const [activeHref, setActiveHref] = React.useState("/app/dashboard");
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleFollow = (event, href) => {
    if (!event.detail.external) {
      event.preventDefault();
      setActiveHref(href);
      navigate(href); // Navigate to the route programmatically
    }
  };

  return (
    



    <SideNavigation 
    
    
    className="shadow-2xl shadow-[#E9EBED66] "
      
      activeHref={activeHref}
      header={{ href: "#/", text: <Box variant="h4">PTR Technologies</Box> }}
      onFollow={event => handleFollow(event, event.detail.href)}
      items={[
        { type: "link", text: "Dashboard", href: "/app/dashboard" },
        { type: "link", text: "Projects", href: "/app/projects" },
        { type: "link", text: "Use Cases", href: "/app/" },
        { type: "link", text: "Reports", href: "/app/" },

     

        { type: "divider" },
        {
          type: "link",
          text: "Settings",
          href: "#/settings",
      
        },
       
      ]}
    />
  );
};

export default Sidebar;
