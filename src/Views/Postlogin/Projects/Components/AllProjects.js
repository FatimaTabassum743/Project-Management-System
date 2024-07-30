import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Header,
  Cards,
  Button,
  TextFilter,
  Pagination,
  SpaceBetween,
  Table,
  Grid,
  ButtonDropdown,
} from '@cloudscape-design/components';

const AllProjects = ({ specificProjectDetails }) => {
  const navigate = useNavigate();

  const onCreateProject = () => {
    navigate("/app/project/create-project");
  };

  // State to manage the current page index for pagination
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  // State to manage the text used for filtering projects
  const [filteringText, setFilteringText] = useState('');

  // State to toggle between card and table views
  const [view, setView] = useState('cards');

  // Access the Redux state to get the list of projects
  const AddProject = useSelector(state => state.AddProject);

  // Filter projects based on the filtering text
  const filteredItems = AddProject.filter(item =>
    item.id.toLowerCase().includes(filteringText.toLowerCase()) ||
    item.ProjectDescription.toLowerCase().includes(filteringText.toLowerCase()) ||
    item.ProjectName.toLowerCase().includes(filteringText.toLowerCase())
  );

  // Constants for pagination
  const itemsPerPage = 6;
  const startIndex = (currentPageIndex - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // State to manage the selected items in the table
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <Box margin={{ top: "xxxl" }}>
      {filteredItems.length === 0 ? (
        // Display when there are no active projects
        <Box>
          <SpaceBetween direction='vertical' size='s'>
            <h3 style={{ marginTop: "10px" }}>No Active Projects</h3>
            <p>Think of each project as the parent for goal-oriented work. Projects are where Jobs, Cycles,
              and Modules live and, along with your colleagues, help you achieve that goal. Create a new project or
              filter for archived projects.</p>
            <Box textAlign='center'>
              <Button 
                iconName="add-plus"
                variant="primary"
                onClick={onCreateProject}
              >
                Create Your First Project
              </Button>
            </Box>
          </SpaceBetween> 
        </Box>
      ) : (
        // Display when there are projects available
        <SpaceBetween direction='vertical' size='s'>
          <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: "8px" }}>
                {/* Buttons to toggle between card and table views */}
                <Button iconName='multiscreen' variant='primary' onClick={() => setView('cards')}></Button>
                <Button variant='link' iconName='menu' onClick={() => setView('table')}></Button>
                <div style={{ width: '60%' }}>
                  {/* TextFilter component for searching projects */}
                  <TextFilter
                    filteringPlaceholder="Search"
                    filteringText={filteringText}
                    onChange={e => setFilteringText(e.detail.filteringText)}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: "8px" }}>
                {/* ButtonDropdown components for additional actions */}
                <ButtonDropdown
                  items={[
                    { text: "Delete", id: "rm", disabled: false },
                    { text: "Move", id: "mv", disabled: false },
                    { text: "Rename", id: "rn", disabled: true },
                    {
                      id: "view",
                      text: "View metrics",
                      href: "https://example.com",
                      external: true,
                      externalIconAriaLabel: "(opens in new tab)"
                    }
                  ]}
                >
                  All Project
                </ButtonDropdown>
                <ButtonDropdown
                  items={[
                    { text: "Delete", id: "rm", disabled: false },
                    { text: "Move", id: "mv", disabled: false },
                    { text: "Rename", id: "rn", disabled: true },
                    {
                      id: "view",
                      text: "View metrics",
                      href: "https://example.com",
                      external: true,
                      externalIconAriaLabel: "(opens in new tab)"
                    }
                  ]}
                >
                  UI Team
                </ButtonDropdown>
                <Button
                  iconName="add-plus"
                  variant="primary"
                  onClick={onCreateProject}
                >
                  Create Project
                </Button>
              </div>
            </div>
          </Container>

          <Box
            header={<Header variant="h3">PROJECTS</Header>}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', border: 'none' }}
          >
            <SpaceBetween size="xxl">
              <Box>
                {view === 'cards' ? (
                  // Display projects as cards
                  <Grid
                    gridDefinition={[
                      { colspan: { default: 12, xxs: 4 } },
                      { colspan: { default: 12, xxs: 4 } },
                      { colspan: { default: 12, xxs: 4 } }
                    ]}
                  >
                    {paginatedItems.map(item => (
                      <Cards
                        key={item.id}
                        ariaLabels={{
                          itemSelectionLabel: (e, i) => `select ${i.ProjectName}`,
                          selectionGroupLabel: "Item selection"
                        }}
                        cardDefinition={{
                          sections: [
                            {
                              id: "details",
                              content: item => (
                                <div  onClick={specificProjectDetails} 
                                style={{ color: item.status === 'Active' ? 'inherit' : '#414D5C', padding: "5px" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
                                    <div style={{ display: "flex", gap: "2px", justifyItems: "center", textAlign: "center" }}>
                                      <div style={{
                                        height: '34px',
                                        width: '40px',
                                        background: '#7E57C2',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        color: 'white'
                                      }}>
                                        {item.id.charAt(0).toUpperCase()}
                                      </div>
                                      <p>{item.id}</p>
                                    </div>
                                    <Button href="#" iconName='calendar' variant="inline-link">
                                      02 June
                                    </Button>
                                  </div>
                                  <p>{item.ProjectDescription}</p>
                                  <div style={{ display: 'flex', justifyContent: "space-between", marginTop:"10px" }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      {item.membersRequired.slice(0, 4).map((member, index) => (
                                        <img
                                          key={index}
                                          src={member.imageUrl}
                                          alt={`Member ${index}`}
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            marginLeft: index ? '-10px' : '0',
                                            zIndex: 4 - index,
                                          }}
                                        />
                                      ))}
                                      {item.membersRequired.length > 4 && (
                                        <div
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            backgroundColor: '#ccc',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: '-10px',
                                            zIndex: 0,
                                            fontSize: '12px',
                                            color: '#fff',
                                          }}
                                        >
                                          +{item.membersRequired.length - 4}
                                        </div>
                                      )}
                                    </div>
                                    <Button href="#" variant="inline-link">
                                      Use Cases: 10
                                    </Button>
                                  </div>
                                </div>
                              )
                            }
                          ]
                        }}
                        cardsPerRow={[{ cards: 1 }]}
                        items={[item]}
                        loadingText="Loading resources"
                        variant="full-page"
                        empty={
                          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                            <Box margin={{ bottom: "m" }}>
                              <b>No Stores</b>
                            </Box>
                          </Box>
                        }
                      />
                    ))}
                  </Grid>
                ) : (
                  // Display projects as a table
                  <Table
                    renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
                      `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
                    }
                    onSelectionChange={({ detail }) =>
                      setSelectedItems(detail.selectedItems)
                    }
                    selectedItems={selectedItems}
                    ariaLabels={{
                      selectionGroupLabel: "Items selection",
                      allItemsSelectionLabel: ({ selectedItems }) =>
                        `${selectedItems.length} ${selectedItems.length === 1 ? "item" : "items"} selected`,
                      itemSelectionLabel: ({ selectedItems }, item) => {
                        const isItemSelected = selectedItems.filter(
                          i => i.name === item.name
                        ).length;
                        return `${item.name} is ${
                          isItemSelected ? "" : "not"
                        } selected`;
                      }
                    }}
                    columnDefinitions={[
                      {
                        id: "projectName",
                        header: "Project Name",
                        cell: e => e.id,
                        sortingField: "projectName"
                      },
                      {
                        id: "description",
                        header: "Description",
                        cell: e => e.ProjectDescription,
                        sortingField: "description"
                      },
                      {
                        id: "status",
                        header: "Status",
                        cell: e => e.status,
                        sortingField: "status"
                      },
                      {
                        id: "teamSize",
                        header: "Team Size",
                        cell: e => e.membersRequired.length,
                        sortingField: "teamSize"
                      }
                    ]}
                    items={paginatedItems}
                    pagination={
                      <Pagination
                        currentPageIndex={currentPageIndex}
                        pagesCount={Math.ceil(filteredItems.length / itemsPerPage)}
                        onChange={({ detail }) =>
                          setCurrentPageIndex(detail.currentPageIndex)
                        }
                      />
                    }
                    filter={
                      <TextFilter
                        filteringPlaceholder="Find resources"
                        filteringText={filteringText}
                        onChange={e => setFilteringText(e.detail.filteringText)}
                      />
                    }
                    header={
                      <Header
                        counter={`(${filteredItems.length})`}
                      >
                        Projects
                      </Header>
                    }
                  />
                )}
              </Box>
            </SpaceBetween>
          </Box>
        </SpaceBetween>
      )}
    </Box>
  );
};

export default AllProjects;
