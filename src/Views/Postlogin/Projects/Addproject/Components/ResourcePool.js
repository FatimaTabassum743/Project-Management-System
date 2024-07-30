import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Header,
  Input,
  Modal,
  SpaceBetween,
  TextFilter,
  Cards,
} from '@cloudscape-design/components';
import del from "../../../../../assets/img/icons/Icon.png";
import member from '../../../../../assets/img/profile-img.jpg';
import suitcase from "../../../../../assets/img/Depth 6, Frame 0.png";
import "../../../../../assets/styles/addproject.css";

const ResourcePool = ({ onSelectTeam, onMembersRequiredUpdate }) => {
  const [teams, setTeams] = useState([
    { name: 'UI Team', members: 0 },
    { name: 'Frontend', members: 0 },
    { name: 'Backend', members: 0 },
    { name: 'DevOps', members: 0 },
    { name: 'QA', members: 0 },
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [resourceSearchQuery, setResourceSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [membersRequired, setMembersRequired] = useState([]);

  // Different datasets for each team
  const teamData = {
    'UI Team': [
      { name: 'Alice', description: 'UI Designer', imageUrl: member },
      { name: 'Bob', description: 'UX Specialist', imageUrl: member },
    ],
    'Frontend': [
      { name: 'Charlie', description: 'React Developer', imageUrl: member },
      { name: 'David', description: 'Angular Developer', imageUrl: member },
    ],
    'Backend': [
      { name: 'Eve', description: 'Node.js Developer', imageUrl: member },
      { name: 'Frank', description: 'Python Developer', imageUrl: member },
    ],
    'DevOps': [
      { name: 'Grace', description: 'DevOps Engineer', imageUrl: member },
      { name: 'Heidi', description: 'Cloud Specialist', imageUrl: member },
    ],
    'QA': [
      { name: 'Ivan', description: 'QA Tester', imageUrl: member },
      { name: 'Judy', description: 'Automation Engineer', imageUrl: member },
    ]
  };

  const handleCreateTeam = () => {
    if (newTeamName.trim()) {
      setTeams([...teams, { name: newTeamName.trim(), members: 0 }]);
      setNewTeamName('');
      setIsCreateModalOpen(false);
    }
  };
 
  const handleDeleteTeam = () => {
    setTeams(teams.filter(team => team.name !== teamToDelete.name));
    if (selectedTeam === teamToDelete.name) {
      setSelectedTeam(null);
      setSelectedItems([]); // Clear selected items if the deleted team is selected
      setMembersRequired([]); // Clear selected members
      if (onMembersRequiredUpdate) {
        onMembersRequiredUpdate([]); // Notify parent of cleared members
      }
    }
    setIsDeleteModalOpen(false);
    setTeamToDelete(null);
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(teamSearchQuery.toLowerCase())
  );

  const filteredItems = (teamData[selectedTeam] || []).filter(item =>
    item.name.toLowerCase().includes(resourceSearchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(resourceSearchQuery.toLowerCase())
  );

  const handleTeamSelection = (team) => {
    setSelectedTeam(team.name);

    if (onSelectTeam) {
      onSelectTeam({ team, resources: selectedItems });
    }
  };

  const handleSelectionChange = ({ detail }) => {
    const selected = detail.selectedItems;
    setSelectedItems(selected);

    // Update MembersRequired with image URLs
    const updatedMembers = selected.map(item => ({
      ...item,
      imageUrl: item.imageUrl // Ensure imageUrl is included
    }));
    setMembersRequired(updatedMembers);

    // Notify parent of updated members
    if (onMembersRequiredUpdate) {
      onMembersRequiredUpdate(updatedMembers);
    }

    // Update team member count
    const updatedTeams = teams.map(team =>
      team.name === selectedTeam
        ? { ...team, members: selected.length }
        : team
    );
    setTeams(updatedTeams);
  };

  const openDeleteModal = (team) => {
    setTeamToDelete(team);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    if (selectedTeam) {
      const team = teams.find(t => t.name === selectedTeam);
      if (team) {
        // Update the member count for the selected team
        setTeams(teams.map(t =>
          t.name === selectedTeam
            ? { ...t, members: membersRequired.length }
            : t
        ));
      }
    }
  }, [membersRequired, selectedTeam,teams]);

  return (
    <Container className='Resource-Container'>
      <Grid gridDefinition={[{ colspan: { default: 4, xxs: 4 } }, { colspan: { default: 8, xxs: 8 } }]}>
        <div style={{ backgroundColor: "#F8F8F8", borderRadius: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "15px" }}>
            <Box variant="strong">Default teams ({teams.length})</Box>
            <Button variant="inline-link" iconName="add-plus" onClick={() => setIsCreateModalOpen(true)}>
              Create team
            </Button>
          </div>
          <div style={{ width: "70%", padding: "15px" }}>
            <TextFilter
              filteringText={teamSearchQuery}
              onChange={e => setTeamSearchQuery(e.detail.filteringText)}
              filteringPlaceholder="Search teams"
            />
          </div>
          <Box padding={5} header={<Header variant="h2">Teams</Header>}>
            {filteredTeams.map((team, index) => (
              <div key={index}>
                <div
                  onClick={() => handleTeamSelection(team)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: "#F8F8F8",
                    padding: "15px",
                    border: "0.5px solid #D9D9D9"
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    <img src={suitcase} alt='suitcase icon' />
                    <div>
                      <p>{team.name}</p>
                      {/* <small>{team.members} members</small> */}
                      <small>0 members</small>
                    </div>
                  </div>
                  <div style={{ cursor: "pointer" }} onClick={() => openDeleteModal(team)}>
                    <img src={del} alt='delete icon' />
                  </div>
                </div>
              </div>
            ))}
          </Box>
          <Modal
            onDismiss={() => setIsCreateModalOpen(false)}
            visible={isCreateModalOpen}
            closeAriaLabel="Close modal"
            header="Create new team"
          >
            <SpaceBetween direction="vertical" size="l">
              <Input
                placeholder="Enter team name"
                value={newTeamName}
                onChange={e => setNewTeamName(e.detail.value)}
              />
              <SpaceBetween direction="horizontal" size="s">
                <Button variant="primary" onClick={handleCreateTeam}>Create</Button>
                <Button variant="link" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
              </SpaceBetween>
            </SpaceBetween>
          </Modal>
          <Modal
            size='small'
            onDismiss={() => setIsDeleteModalOpen(false)}
            visible={isDeleteModalOpen}
            closeAriaLabel="Close modal"
            header="Confirm delete team"
          >
            <SpaceBetween direction="vertical" size="l">
              <Box>Are you sure you want to delete the team "{teamToDelete?.name}"?</Box>
              <SpaceBetween direction="horizontal" size="s">
                <Button variant="primary" onClick={handleDeleteTeam}>Delete</Button>
                <Button variant="link" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
              </SpaceBetween>
            </SpaceBetween>
          </Modal>
        </div>
        <Container variant='borderless' className='members-container'>
          {selectedTeam ? (
            <SpaceBetween direction='vertical' size='s'>
              <Box variant="p">Selected team: {selectedTeam} Total ({membersRequired.length}) members Required For this Project</Box>
              <TextFilter
                filteringText={resourceSearchQuery}
                onChange={e => setResourceSearchQuery(e.detail.filteringText)}
                filteringPlaceholder="Find resources"
              />
              <Cards
                onSelectionChange={handleSelectionChange}
                selectedItems={selectedItems}
                ariaLabels={{
                  itemSelectionLabel: (e, i) => `select ${i.name}`,
                  selectionGroupLabel: "Item selection"
                }}
                cardDefinition={{
                  sections: [
                    {
                      id: "image",
                      content: item => (
                        <Box textAlign='center' display='block'>
                          <img
                            style={{ width: "50px", height: "50px", borderRadius: "50%", textAlign: "center" }}
                            src={item.imageUrl || member}
                            alt="profile"
                          />
                        </Box>
                      )
                    },
                    {
                      id: "name",
                      content: item => <Box textAlign='center' variant='h3'>{item.name}</Box>
                    },
                    {
                      id: "description",
                      content: item => <Box textAlign='center'>{item.description}</Box>
                    },
                  ]
                }}
                cardsPerRow={[{ cards: 3 }]}
                entireCardClickable
                items={filteredItems}
                loadingText="Loading resources"
                selectionType="multi"
                stickyHeader
                trackBy="name"
                visibleSections={[
                  "image",
                  "name",
                  "description",
                ]}
              />
            </SpaceBetween>
          ) : (
            <Box variant="p">Please click on a team to see its resources.</Box>
          )}
        </Container>
      </Grid>
    </Container>
  );
};

export default ResourcePool;
