CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure...', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective...', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group...', 'hello@unityserve.org', 'unityserve-logo.png');


CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

INSERT INTO projects
(organization_id, title, description, location, date)
VALUES

-- Organization 1
(1, 'Park Cleanup', 'Clean local parks.', 'Lima', '2026-05-20'),
(1, 'Bridge Repair', 'Repair community bridges.', 'Cusco', '2026-05-25'),
(1, 'School Painting', 'Paint local schools.', 'Arequipa', '2026-06-01'),
(1, 'Road Maintenance', 'Repair damaged roads.', 'Piura', '2026-06-05'),
(1, 'Community Shelter', 'Build temporary shelters.', 'Tacna', '2026-06-10'),

-- Organization 2
(2, 'Urban Garden Expansion', 'Expand city gardens.', 'Lima', '2026-05-21'),
(2, 'Tree Planting', 'Plant trees in neighborhoods.', 'Cusco', '2026-05-28'),
(2, 'Community Harvest', 'Harvest vegetables.', 'Trujillo', '2026-06-02'),
(2, 'Water Conservation', 'Promote water saving.', 'Ica', '2026-06-07'),
(2, 'Recycling Campaign', 'Community recycling event.', 'Puno', '2026-06-12'),

-- Organization 3
(3, 'Youth Tutoring', 'Tutor local students.', 'Piura', '2026-05-22'),
(3, 'Food Distribution', 'Deliver food to families.', 'Chiclayo', '2026-05-29'),
(3, 'Health Workshop', 'Community health education.', 'Lima', '2026-06-03'),
(3, 'Clothing Donation', 'Distribute donated clothes.', 'Cusco', '2026-06-08'),
(3, 'Senior Assistance', 'Support elderly citizens.', 'Arequipa', '2026-06-15');

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO categories (name)
VALUES
('Education'),
('Environment'),
('Healthcare');

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project_categories_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_categories_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);

INSERT INTO project_categories (project_id, category_id)
VALUES
(1,1),
(1,2),
(2,2),
(3,1),
(4,3),
(5,1),
(6,2),
(7,2),
(8,1),
(9,3),
(10,2),
(11,1),
(12,3),
(13,3),
(14,1),
(15,2);

--Roles
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

-- Verify the data was inserted
SELECT * FROM roles;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- View all users and roles
SELECT * FROM users;
SELECT * FROM roles;

-- Update the dedicated admin testing account to have admin role
UPDATE users SET role_id = (SELECT role_id FROM roles WHERE role_name = 'admin') WHERE email = 'admin@example.com';

-- Verify the update by listing all users and their roles
SELECT users.user_id, users.email, roles.role_name FROM users JOIN roles ON users.role_id = roles.role_id;