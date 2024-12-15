/* eslint-env node */

import { fakerEN_US as faker } from "@faker-js/faker"
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const seedProjects = async () => {
    try {
        const name = faker.lorem.words(3);

        const { data, error } = await supabase
            .from('projects')
            .insert([
                {
                    name: name,
                    slug: name.toLowerCase().replace(/ /g, '-'),
                    status: faker.helpers.arrayElement(['in-progress', 'completed']),
                    collaborators: [faker.helpers.arrayElement(['user1', 'user2', 'user3'])],
                },
            ]);

        if (error) {
            console.error("Error inserting project:", error.message);
        } else {
            console.log("Project inserted successfully.");
        }
    } catch (err) {
        console.error("Error during seeding:", err.message);
    }
};

await seedProjects()