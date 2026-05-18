// Import any needed model functions
import { getAllProjects, getUpcomingProjects, getProjectDetails, getCategoriesByProjectId } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title: 'Upcoming Service Projects', projects });
};

const showProjectDetailsPage = async (req, res) => {

    const id = req.params.id;

    const project = await getProjectDetails(id);

    const categories = await getCategoriesByProjectId(id);

    res.render('project', {
        title: project.title,
        project,
        categories
    });
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };