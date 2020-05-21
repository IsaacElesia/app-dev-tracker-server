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
};

module.exports = AppService;
