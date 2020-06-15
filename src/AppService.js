const AppService = {
	getAllItems(knex, table) {
		return knex.select('*').from(table);
	},

	insertItem(knex, table, newItem) {
		return knex
			.insert(newItem)
			.into(table)
			.returning('*')
			.then((rows) => {
				return rows[0];
			});
	},

	getById(knex, table, id) {
		return knex.from(table).select('*').where('id', id).first();
	},

	getByEmail(knex, table, email) {
		return knex.from(table).select('*').where('email', email).first();
	},

	deleteItem(knex, table, id) {
		return knex(table).where({ id }).delete();
	},

	updateItem(knex, table, id, newItemFields) {
		return knex(table).where({ id }).update(newItemFields);
	},

	projectsUserInvolveIn(knex, userId) {
		return knex('project_team')
			.join('projects', 'project_team.project_id', '=', 'projects.id')
			.select('*')
			.where({ 'project_team.user_id': userId });
	},

	sectionsInProject(knex, userId) {
		return knex('section_team')
			.join('projects', 'section_team.project_id', '=', 'projects.id')
			.join('section', 'section_team.section_id', '=', 'section.id')
			.select('*')
			.where({
				'section_team.user_id': userId,
			});
	},

	tasksInSection(knex, userId) {
		return knex('task_team')
			.join('section', 'task_team.section_id', '=', 'section.id')
			.join('task', 'task_team.task_id', '=', 'task.id')
			.select('*')
			.where({
				'task_team.user_id': userId,
			});
	},

	taskTeamMembers(knex, taskId) {
		return knex('task_team')
			.join('users', 'task_team.user_id', '=', 'users.id')
			.select(
				'task_team.id',
				'task_team.task_id',
				'task_team.section_id',
				'users.full_name',
				'users.email',
				'users.avatar_url'
			)
			.where({
				'task_team.task_id': taskId,
			});
	},

	sectionTeamMembers(knex, sectionId) {
		return knex('section_team')
			.join('users', 'section_team.user_id', '=', 'users.id')
			.select(
				'section_team.id',
				'section_team.section_id',
				'section_team.project_id',
				'users.full_name',
				'users.email',
				'users.avatar_url'
			)
			.where({
				'section_team.section_id': sectionId,
			});
	},

	projectTeamMembers(knex, projectId) {
		return knex('project_team')
			.join('users', 'project_team.user_id', '=', 'users.id')
			.select(
				'project_team.id',
				'project_team.project_id',
				'users.full_name',
				'users.email',
				'users.avatar_url'
			)
			.where({
				'project_team.project_id': projectId,
			});
	},

	findItems(knex, table, column, term) {
		return knex.select('*').from(table).where(column, 'ilike', `%${term}%`);
	},
};

module.exports = AppService;
