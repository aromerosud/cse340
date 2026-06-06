import db from './db.js'

const getAllProjects = async () => {

    const query = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name

        FROM public.projects p

        JOIN public.organization o
            ON p.organization_id = o.organization_id

        ORDER BY p.date;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM public.projects
        WHERE organization_id = $1
        ORDER BY date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {

    const query = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name

        FROM public.projects p

        JOIN public.organization o
            ON p.organization_id = o.organization_id

        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1;
    `;

    const queryParams = [numberOfProjects];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {

    const query = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name

        FROM public.projects p

        JOIN public.organization o
            ON p.organization_id = o.organization_id

        WHERE p.project_id = $1;
    `;

    const queryParams = [id];

    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {

    const query = `
        SELECT
            c.category_id,
            c.name
        FROM public.categories c

        JOIN public.project_categories pc
            ON c.category_id = pc.category_id

        WHERE pc.project_id = $1

        ORDER BY c.name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO public.projects (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (projectId, title, description, location, date, organizationId) => {
    const query = `
        UPDATE public.projects
        SET title = $1, description = $2, location = $3, date = $4, organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId, projectId];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to update project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

const assignVolunteerToProject = async (userId, projectId) => {
    const query = `
        INSERT INTO public.project_volunteers (user_id, project_id)
        VALUES ($1, $2)
        RETURNING user_id, project_id;
    `;

    const queryParams = [userId, projectId];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to assign volunteer to project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log(`Assigned user ${userId} to project ${projectId}`);
    }

    return result.rows[0];
};

const removeVolunteerFromProject = async (userId, projectId) => {
    const query = `
        DELETE FROM public.project_volunteers
        WHERE user_id = $1
        AND project_id = $2
        RETURNING user_id, project_id;
    `;

    const queryParams = [userId, projectId];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Volunteer assignment not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log(`Removed user ${userId} from project ${projectId}`);
    }

    return result.rows[0];
};

const getVolunteerProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name

        FROM public.projects p

        JOIN public.project_volunteers pv
            ON p.project_id = pv.project_id

        JOIN public.organization o
            ON p.organization_id = o.organization_id

        WHERE pv.user_id = $1

        ORDER BY p.date;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};

const isUserVolunteerForProject = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM public.project_volunteers
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};

export { 
    getAllProjects, 
    getProjectsByOrganizationId, 
    getUpcomingProjects, 
    getProjectDetails, 
    getCategoriesByProjectId, 
    createProject, 
    updateProject,
    assignVolunteerToProject,
    removeVolunteerFromProject,
    getVolunteerProjectsByUserId,
    isUserVolunteerForProject
}