import React, { useState } from 'react';
import {
    AppLayout,
    Box,
    BreadcrumbGroup,
    Container,
    ContentLayout,
    Flashbar,
    Header,
    HelpPanel,
    Link,
    SideNavigation,
    SplitPanel,
    TextFilter,
    Button,
    ColumnLayout,
    SpaceBetween,
    Cards,
    Modal
} from '@cloudscape-design/components';
import backimage from "../../../../../assets/img/workflow.jpeg";
import backimage2 from "../../../../../assets/img/workflow2.jpeg";
import ParticularWorkflowDetails from './ParticularWorkflowDetails';
import "../../../../../assets/styles/cloudScapeCustom.css"

const AddWorkflow = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState(null);

    const workflows = [
        { id: 1, title: 'Description', imageUrl: backimage, description: 'Effective procurement aims to optimize costs, ensure quality' },
        { id: 2, title: 'Workflow 2', imageUrl: backimage2, description: 'Effective procurement aims to optimize costs, ensure quality' },
        { id: 3, title: 'Workflow 3', imageUrl: backimage, description: 'Effective procurement aims to optimize costs, ensure quality' },
        { id: 4, title: 'Workflow 4', imageUrl: backimage2, description: 'Effective procurement aims to optimize costs, ensure quality' },
        { id: 5, title: 'Workflow 5', imageUrl: backimage, description: 'Effective procurement aims to optimize costs, ensure quality' },
        { id: 6, title: 'Workflow 6', imageUrl: backimage2, description: 'Effective procurement aims to optimize costs, ensure quality' },
    ];

    const filteredWorkflows = workflows.filter(workflow =>
        workflow.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onParticularWorkflow = (workflow) => {
        setSelectedWorkflow(workflow);
        setModalVisible(true);
    };

    const onCloseModal = () => {
        setModalVisible(false);
        setSelectedWorkflow(null);
    };

    return (
        <AppLayout
            toolsHide={true}
            navigationOpen={true}
            contentType='cards'
            minContentWidth={300}
            navigationWidth={220}
            disableContentPaddings
            toolsOpen
            navigation={
                <SideNavigation
                    items={[
                        { type: 'link', text: <h3 style={{ color: '#0958D9' }}>All Templates</h3>, href: '#' },
                        { type: 'link', text: "Recent", href: '#' },
                        { type: 'link', text: "Popular", href: '#' },
                        { type: 'link', text: <h1>Categories</h1>, href: '#' },
                        { type: 'link', text: "Development", href: '#' },
                        { type: 'link', text: "Marketing", href: '#' },
                        { type: 'link', text: "Recent", href: '#' },
                        { type: 'link', text: "Popular", href: '#' },
                        { type: 'link', text: "Recent", href: '#' },
                        { type: 'link', text: "Popular", href: '#' },
                        { type: 'link', text: "Recent", href: '#' },
                        { type: 'link', text: "Popular", href: '#' },
                        { type: 'link', text: <h1>Created By You</h1>, href: '#' },
                        { type: 'link', text: "API", href: '#' },
                        { type: 'link', text: "Dev", href: '#' },
                    ]}
                />
            }
            content={
                <ContentLayout
                    header={
                        <ColumnLayout columns={2}>
                            <Box margin={{ left: "m" }}>
                                <TextFilter
                                    filteringText={searchQuery}
                                    onChange={({ detail }) => setSearchQuery(detail.filteringText)}
                                    filteringPlaceholder="Search workflows"
                                />
                            </Box>
                            <Box float="right" textAlign="right">
                                <Button
                                    iconName="add-plus"
                                    variant="primary"
                                >
                                    Custom Workflow
                                </Button>
                            </Box>
                        </ColumnLayout>
                    }
                >
                    <Container
                        variant="borderless"
                        header={
                            <Header variant="h1">
                                All Workflow Templates
                            </Header>
                        }
                    >
                       
                        <Cards
                            className="card-addworkflow"
                            cardDefinition={{
                                sections: [
                                    {
                                        id: 'image',
                                        content: item => (
                                            <div className="card-section">
                                                <div><img src={item.imageUrl} alt={item.title} className="card-image" /></div>
                                                <div className="card-hover-content">
                                                    <h3>{item.title}</h3>
                                                    <p>{item.description}</p>

                                                    <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
                                                        <Button className="use-button" variant='primary'>Use</Button>
                                                        <Button className="preview-button"
                                                            onClick={() => onParticularWorkflow(item)}>See</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    },
                                ],
                            }}
                            items={filteredWorkflows}
                            cardSize="medium"
                            cardsPerRow={[{ cards: 3 }]}
                            trackBy="id"
                        />
                    </Container>
                    <Modal
                size='large'
                onDismiss={onCloseModal}
                visible={isModalVisible}
            >
                <ParticularWorkflowDetails workflow={selectedWorkflow} back={onCloseModal} />
            </Modal>
                </ContentLayout>
            }
        >
            
        </AppLayout>
    );
}

export default AddWorkflow;
