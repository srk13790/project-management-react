import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectSidebar from "./components/ProjectSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
    const[projectState, setProjectState] = useState({
        selectedProjectID: undefined,
        projects: []
    });


    function handleStartAddProject() {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectID: null
            }
        });
    }

    function handleSelectProject (id) {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectID: id
            }
        });
    }

    function handleCancel() {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectID: undefined
            }
        });
    }

    function handleDeleteProject () {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectID: undefined,
                projects: prevState.projects.filter(
                    (project) => project.id !== prevState.selectedProjectID
                ),
            }
        });
    }

    function handleAddProject (projectData) {
        setProjectState (prevState => {
            const newProject = {
                ...projectData,
                id: Math.random(),
            }

            return {
                ...prevState,
                selectedProjectID: undefined,
                projects: [...prevState.projects, newProject]
            }
        })
    }

    console.log(projectState);

    const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectID)

    let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />;

    if (projectState.selectedProjectID === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancel}/>
    } else if (projectState.selectedProjectID === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
    }

    return (
        <main className="h-screen my-8 flex gap-8">
        {/* <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1> */}
        <ProjectSidebar onStartAddProject={handleStartAddProject} projects={projectState.projects} onSelectProject={handleSelectProject}/>
        {/* <NoProjectSelected onStartAddProject={handleStartAddProject} /> */}
        {content}
        </main>
    );  
}

export default App;
