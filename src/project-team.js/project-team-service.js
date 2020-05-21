const ProjectService = {
	getAllProjects(knex) {
		return knex.select('*').from('projects');
	},

	insertProjec(knex, newUser) {
		return knex
			.insert(newUser)
			.into('projects')
			.returning('*')
			.then((rows) => {
				return rows[0];
			});
	},

	getById(knex, id) {
		return knex.from('projects').select('*').where('id', id).first();
	},

	deleteProject(knex, id) {
		return knex('projects').where({ id }).delete();
	},

	updateProect(knex, id, newProjectFields) {
		return knex('projects').where({ id }).update(newProjectFields);
	},
};

module.exports = ProjectService;
