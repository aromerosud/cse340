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

export { getAllCategories }