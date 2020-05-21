const ProjectService = {
	getAllProjects(knex) {
		return knex.select('*').from('projects');
	},

	insertProject(knex, newproject) {
		return knex
			.insert(newproject)
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
