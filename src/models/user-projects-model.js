
const pool = require('../config/db'); 

const { Pool } = require('pg');


class userProject {
    static async getUserProjects(userId) {
        const query = `SELECT * FROM user_projects WHERE user_id = $1;`;
        const values = [userId];
        const result = await pool.query(query, values);
        return result.rows; 
    }

    static async deleteUserProject(userId, projectId) {
        const query = `DELETE FROM user_projects WHERE user_id = $1 AND project_id = $2 RETURNING *;`;
        const values = [userId, projectId];
        const result = await pool.query(query, values);
        return result.rows[0]; 
    }

    static async assignProject(userId,projectId){
        try {
            await pool.query('INSERT INTO user_projects (user_id, project_id) VALUES ($1, $2)', [userId, projectId]);
        } catch (err) {
            console.error('Error assigning project:', err);
            throw new Error('Could not assign project.'); 
        }    }

       
}
module.exports = userProject;
