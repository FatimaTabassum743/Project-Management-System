import React, { useState } from 'react';
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
import suitcase from "../../../../../assets/img/Depth 6, Frame 0.png"
import "../../../../../assets/styles/addproject.css"
const ResourcePool = ({ onSelectTeam }) => {
  const [teams, setTeams] = useState([
    { name: 'UI Team', members: 0 },
    { name: 'Frontend', members: 0 },
    { name: 'Backend', members: 0 },
    { name: 'DevOps', members: 0 },
    { name: 'QA', members: 0 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [resourceSearchQuery, setResourceSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleCreateTeam = () => {
    if (newTeamName.trim()) {
      setTeams([...teams, { name: newTeamName.trim(), members: 0 }]);
      setNewTeamName('');
      setIsModalOpen(false);
    }
  };

  const handleDeleteTeam = (teamToDelete) => {
    setTeams(teams.filter(team => team.name !== teamToDelete.name));
    if (selectedTeam === teamToDelete.name) {
      setSelectedTeam(null);
      setSelectedItems([]);
    }
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(teamSearchQuery.toLowerCase())
  );

  const items = [
    { name: 'john', description: ' Project manager' },
    { name: 'Doe', description: 'frontend developer' },
    { name: 'fatima', description: 'backend developer' },
    { name: 'syed', description: 'devops engineer' },
    { name: 'Raj', description: 'Tester' },
    { name: 'abc', description: 'designer' },
  ];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(resourceSearchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(resourceSearchQuery.toLowerCase())
  );

  const handleTeamSelection = (team) => {
    setSelectedTeam(team.name);
    setSelectedItems([]);
    if (onSelectTeam) {
      onSelectTeam({ team, resources: selectedItems });
    }
  };

  return (
    <Container className='Resource-Container'>
    <Grid gridDefinition={[{ colspan: { default: 4, xxs: 4 } }, { colspan: { default: 8, xxs: 8 } }]}>
      <div style={{ backgroundColor: "#F8F8F8",borderRadius:"8px" }}>
        <div style={{display:"flex", justifyContent:"space-between", padding:"15px"}}>
          <Box  variant="strong">Default teams ({teams.length})</Box>
          <Button variant="inline-link" iconName="add-plus" onClick={() => setIsModalOpen(true)}>
            Create team
          </Button>
         
         </div>
        <div style={{width:"70%",padding:"15px"}}>
        <TextFilter
          filteringText={teamSearchQuery}
          onChange={e => setTeamSearchQuery(e.detail.filteringText)}
          filteringPlaceholder="Search teams"
        /></div>
        <Box padding={5} header={<Header variant="h2">Teams</Header>}>
          {filteredTeams.map((team, index) => (
            <>
            <div
              key={index}
              onClick={() => handleTeamSelection(team)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: "#F8F8F8",
                padding: "15px",
                border:"0.5px solid #D9D9D9"
                
              }}
            >
             <div style={{display:"flex", gap:"5px"}}>
             <img src={suitcase} alt='suit'></img>
             
              <div>
              <p>{team.name}</p>
              <small>{team.members} members</small>
              </div>
              </div>
              <div style={{cursor:"pointer"}}  onClick={() => handleDeleteTeam(team)} ><img src={del} alt='delet icon'></img></div>
             
              
            </div>
           {/* <hr style={{backgroundColor:""}}></hr> */}
           </>
            
          ))}
        </Box>
        <Modal
          onDismiss={() => setIsModalOpen(false)}
          visible={isModalOpen}
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
              <Button variant="link" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </SpaceBetween>
          </SpaceBetween>
        </Modal>
      </div>
      <Container variant='borderless' className='members-container'>
        {selectedTeam ? (
          <SpaceBetween direction='vertical' size='s'>
            <Box variant="p">Selected team: {selectedTeam} ({selectedItems.length} members)</Box>
            <TextFilter
              filteringText={resourceSearchQuery}
              onChange={e => setResourceSearchQuery(e.detail.filteringText)}
              filteringPlaceholder="Find resources"
              
            />
            <Cards
            
              onSelectionChange={({ detail }) =>
                setSelectedItems(detail?.selectedItems ?? [])
              }
              selectedItems={selectedItems}
              ariaLabels={{
                itemSelectionLabel: (e, i) => `select ${i.name}`,
                selectionGroupLabel: "Item selection"
              }}
              cardDefinition={{

                sections: [
                  {
                    id: "image",
                    content: () => (
                     <Box textAlign='center'display='block' > <img
                        style={{ width: "50px", height: "50px", borderRadius: "50%", textAlign:"center" }}
                        src={member}
                        alt="placeholder"
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
              cardsPerRow={[
                { cards: 3 },
                // { minWidth: 300, cards: 3 }
              ]}
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
