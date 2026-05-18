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

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getCategoriesByProjectId }