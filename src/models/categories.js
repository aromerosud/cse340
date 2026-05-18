import db from './db.js'

const getAllCategories = async () => {

    const query = `
        SELECT
            c.category_id,
            c.name

        FROM public.categories c

        ORDER BY c.name;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (id) => {

    const query = `
        SELECT
            category_id,
            name
        FROM public.categories
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const getProjectsByCategoryId = async (categoryId) => {

    const query = `
        SELECT
            p.project_id,
            p.title,
            p.date
        FROM public.projects p

        JOIN public.project_categories pc
            ON p.project_id = pc.project_id

        WHERE pc.category_id = $1

        ORDER BY p.date;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

export { getAllCategories, getCategoryById, getProjectsByCategoryId }