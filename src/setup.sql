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