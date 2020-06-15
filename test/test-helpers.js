const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
	return [
		{
			id: 1,
			full_name: 'Test user 1',
			email: 'test1@gmail.com',
			github: 'https://github.com/test1',
			avatar_url: 'https://cludinary/footage/pics',
			password: 'password',
		},
		{
			id: 2,
			full_name: 'Test user 2',
			email: 'test2@gmail.com',
			github: 'https://github.com/test2',
			avatar_url: 'https://cludinary/footage/pics',
			password: 'password',
		},
		{
			id: 3,
			full_name: 'Test user 3',
			email: 'test3@gmail.com',
			github: 'https://github.com/test3',
			avatar_url: 'https://cludinary/footage/pics',
			password: 'password',
		},
		{
			id: 4,
			full_name: 'Test user 4',
			email: 'test4@gmail.com',
			github: 'https://github.com/test4',
			avatar_url: 'https://cludinary/footage/pics',
			password: 'password',
		},
	];
}

function makeProjectsArray(users) {
	return [
		{
			id: 1,
			start_date: '2020-05-14 21:52:51',
			due_date: '2020-06-24 21:52:51',
			project_name: 'Project 1',
			description: 'Project 1 decs',
			project_repo: 'https://github.com/project1',
			completed: false,
			created_by: users[1].id,
		},
		{
			id: 2,
			start_date: '2020-03-12 21:52:51',
			due_date: '2020-06-04 21:52:51',
			project_name: 'Project 2',
			description: 'Project 2 decs',
			project_repo: 'https://github.com/project2',
			completed: false,
			created_by: users[0].id,
		},
		{
			id: 3,
			start_date: '2020-05-10 21:52:51',
			due_date: '2020-03-24 21:52:51',
			project_name: 'Project 3',
			description: 'Project 3 decs',
			project_repo: 'https://github.com/project3',
			completed: false,
			created_by: users[2].id,
		},
		{
			id: 4,
			start_date: '2020-05-14 21:52:51',
			due_date: '2020-06-24 21:52:51',
			project_name: 'Project 4',
			description: 'Project 4 decs',
			project_repo: 'https://github.com/project4',
			completed: false,
			created_by: users[1].id,
		},
		{
			id: 5,
			start_date: '2020-05-14 21:52:51',
			due_date: '2020-06-24 21:52:51',
			project_name: 'Project 5',
			description: 'Project 5 decs',
			project_repo: 'https://github.com/project5',
			completed: false,
			created_by: users[3].id,
		},
		{
			id: 6,
			start_date: '2020-05-14 21:52:51',
			due_date: '2020-06-24 21:52:51',
			project_name: 'Project 6',
			description: 'Project 6 decs',
			project_repo: 'https://github.com/project6',
			completed: false,
			created_by: users[2].id,
		},
		{
			id: 7,
			start_date: '2020-10-14 21:52:51',
			due_date: '2020-12-09 21:52:51',
			project_name: 'Project 7',
			description: 'Project 7 decs',
			project_repo: 'https://github.com/project7',
			completed: false,
			created_by: users[1].id,
		},
		{
			id: 8,
			start_date: '2020-02-14 21:17:20',
			due_date: '2020-06-14 21:52:51',
			project_name: 'Project 8',
			description: 'Project 8 decs',
			project_repo: 'https://github.com/project9',
			completed: false,
			created_by: users[3].id,
		},
	];
}

function makeProjectTeamArray(users, projects) {
	return [
		{
			id: 1,
			user_id: users[1].id,
			project_id: projects[1].id,
		},
		{
			id: 2,
			user_id: users[2].id,
			project_id: projects[1].id,
		},
		{
			id: 3,
			user_id: users[1].id,
			project_id: projects[2].id,
		},
		{
			id: 4,
			user_id: users[3].id,
			project_id: projects[0].id,
		},
		{
			id: 5,
			user_id: users[0].id,
			project_id: projects[2].id,
		},
		{
			id: 6,
			user_id: users[3].id,
			project_id: projects[3].id,
		},
		{
			id: 7,
			user_id: users[0].id,
			project_id: projects[1].id,
		},
		{
			id: 8,
			user_id: users[1].id,
			project_id: projects[2].id,
		},
		{
			id: 9,
			user_id: users[2].id,
			project_id: projects[0].id,
		},
		{
			id: 10,
			user_id: users[3].id,
			project_id: projects[0].id,
		},
		{
			id: 11,
			user_id: users[0].id,
			project_id: projects[1].id,
		},
		{
			id: 12,
			user_id: users[1].id,
			project_id: projects[3].id,
		},
		{
			id: 13,
			user_id: users[1].id,
			project_id: projects[2].id,
		},
	];
}

function makeSectionsArray(users, projects) {
	return [
		{
			id: 1,
			section_name: 'section 1',
			description: 'section 1 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: true,
			img_url: 'https://cludinary/footage/pics',
			project_id: projects[0].id,
			created_by: users[1].id,
		},
		{
			id: 2,
			section_name: 'section 2',
			description: 'section 2 desc',
			start_date: '2020-03-11 21:54:49',
			due_date: '2020-06-01 21:54:49',
			completed: true,
			img_url: 'https://cludinary/footage/pics',
			project_id: projects[2].id,
			created_by: users[3].id,
		},
		{
			id: 3,
			section_name: 'section 3',
			description: 'section 3 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: true,
			img_url: 'https://cludinary/footage/pics',
			project_id: projects[2].id,
			created_by: users[2].id,
		},
		{
			id: 4,
			section_name: 'section 4',
			description: 'section 3 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-08-11 21:54:49',
			completed: false,
			img_url: 'https://cludinary/footage/pics',
			project_id: projects[0].id,
			created_by: users[3].id,
		},
		{
			id: 5,
			section_name: 'section 5',
			description: 'section 5 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: false,
			img_url: 'https://cludinary/footage/pics',
			project_id: projects[0].id,
			created_by: users[1].id,
		},
		{
			id: 6,
			section_name: 'section 6',
			description: 'section 6 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: false,
			img_url: 'https://cludinary/footage/pics',
			project_id: projects[1].id,
			created_by: users[1].id,
		},
		{
			id: 7,
			section_name: 'section 7',
			description: 'section 7 desc',
			start_date: '2020-03-10 21:54:49',
			due_date: '2020-07-18 21:54:49',
			completed: false,
			img_url: 'https://cludinary/footage/pics',
			project_id: projects[0].id,
			created_by: users[2].id,
		},
		{
			id: 8,
			section_name: 'section 8',
			description: 'section 8 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: false,
			img_url: 'https://cludinary/footage/pics',
			project_id: projects[3].id,
			created_by: users[2].id,
		},
	];
}

function makeSectionTeamArray(users, projects, sections) {
	return [
		{
			id: 1,
			section_id: sections[2].id,
			project_id: projects[0].id,
			user_id: users[2].id,
		},
		{
			id: 2,
			section_id: sections[0].id,
			project_id: projects[0].id,
			user_id: users[2].id,
		},
		{
			id: 3,
			section_id: sections[3].id,
			project_id: projects[1].id,
			user_id: users[2].id,
		},
		{
			id: 4,
			section_id: sections[3].id,
			project_id: projects[1].id,
			user_id: users[0].id,
		},
		{
			id: 5,
			section_id: sections[1].id,
			project_id: projects[0].id,
			user_id: users[3].id,
		},
		{
			id: 6,
			section_id: sections[4].id,
			project_id: projects[2].id,
			user_id: users[2].id,
		},
		{
			id: 7,
			section_id: sections[1].id,
			project_id: projects[1].id,
			user_id: users[3].id,
		},
		{
			id: 8,
			section_id: sections[3].id,
			project_id: projects[4].id,
			user_id: users[1].id,
		},
		{
			id: 9,
			section_id: sections[1].id,
			project_id: projects[0].id,
			user_id: users[3].id,
		},
		{
			id: 10,
			section_id: sections[4].id,
			project_id: projects[3].id,
			user_id: users[0].id,
		},
		{
			id: 11,
			section_id: sections[4].id,
			project_id: projects[5].id,
			user_id: users[1].id,
		},
	];
}

function makeTaskArray(users, sections) {
	return [
		{
			id: 1,
			description: 'Task 1 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: true,
			created_by: users[3].id,
			section_id: sections[2].id,
		},
		{
			id: 2,
			description: 'Task 2 desc',
			start_date: '2020-07-21 21:54:49',
			due_date: '2020-10-11 21:54:49',
			completed: false,
			created_by: users[1].id,
			section_id: sections[0].id,
		},
		{
			id: 3,
			description: 'Task 3 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: true,
			created_by: users[2].id,
			section_id: sections[1].id,
		},
		{
			id: 4,
			description: 'Task 4 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: false,
			created_by: users[0].id,
			section_id: sections[1].id,
		},
		{
			id: 5,
			description: 'Task 5 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: false,
			created_by: users[0].id,
			section_id: sections[4].id,
		},
		{
			id: 6,
			description: 'Task 6 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: true,
			created_by: users[2].id,
			section_id: sections[2].id,
		},
		{
			id: 7,
			description: 'Task 7 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: false,
			created_by: users[0].id,
			section_id: sections[1].id,
		},
		{
			id: 8,
			description: 'Task 2 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: false,
			created_by: users[0].id,
			section_id: sections[2].id,
		},
		{
			id: 9,
			description: 'Task 9 desc',
			start_date: '2020-05-21 21:54:49',
			due_date: '2020-07-01 21:54:49',
			completed: false,
			created_by: users[3].id,
			section_id: sections[3].id,
		},
	];
}

function makeTaskTeamArray(users, sections, tasks) {
	return [
		{
			id: 1,
			section_id: sections[0].id,
			task_id: tasks[1].id,
			user_id: users[1].id,
		},
		{
			id: 2,
			section_id: sections[2].id,
			task_id: tasks[2].id,
			user_id: users[2].id,
		},
		{
			id: 3,
			section_id: sections[1].id,
			task_id: tasks[7].id,
			user_id: users[1].id,
		},
		{
			id: 4,
			section_id: sections[0].id,
			task_id: tasks[3].id,
			user_id: users[1].id,
		},
		{
			id: 5,
			section_id: sections[3].id,
			task_id: tasks[2].id,
			user_id: users[3].id,
		},
		{
			id: 6,
			section_id: sections[4].id,
			task_id: tasks[9].id,
			user_id: users[3].id,
		},
		{
			id: 7,
			section_id: sections[0].id,
			task_id: tasks[3].id,
			user_id: users[1].id,
		},
		{
			id: 8,
			section_id: sections[4].id,
			task_id: tasks[6].id,
			user_id: users[2].id,
		},
		{
			id: 9,
			section_id: sections[3].id,
			task_id: tasks[1].id,
			user_id: users[0].id,
		},
		{
			id: 10,
			section_id: sections[3].id,
			task_id: tasks[4].id,
			user_id: users[1].id,
		},
		{
			id: 11,
			section_id: sections[1].id,
			task_id: tasks[3].id,
			user_id: users[1].id,
		},
	];
}

function makeExpectedProject(project) {
	return {
		projectId: project.id,
		startDate: project.start_date,
		dueDate: project.due_date,
		projectName: project.project_name,
		projectRepo: project.project_repo,
		completed: project.completed,
		createdBy: project.created_by,
		description: project.description,
	};
}

function makeMaliciousProject(user) {
	const maliciousProject = {
		id: 911,
		start_date: new Date(),
		due_date: '2020-06-24 21:52:51',
		project_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
		description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
		project_repo: 'https://github.com/project1',
		completed: false,
		created_by: user.id,
	};
	const expectedProject = {
		...makeExpectedProject([user], maliciousProject),
		project_name:
			'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
		description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
	};
	return {
		maliciousProject,
		expectedProject,
	};
}

function makeProjectsFixtures() {
	const testUsers = makeUsersArray();
	const testProjects = makeProjectsArray(testUsers);
	// const testComments = makeCommentsArray(testUsers, testArticles)
	return { testUsers, testProjects };
}

function cleanTables(db) {
	return db.transaction((trx) =>
		trx
			.raw(
				`TRUNCATE
            users,
            projects,
            project_team,
            section,
            section_team,
            task,
            task_team
          `
			)
			.then(() =>
				Promise.all([
					trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
					trx.raw(`ALTER SEQUENCE projects_id_seq minvalue 0 START WITH 1`),
					trx.raw(`ALTER SEQUENCE project_team_id_seq minvalue 0 START WITH 1`),
					trx.raw(`ALTER SEQUENCE section_id_seq minvalue 0 START WITH 1`),
					trx.raw(`ALTER SEQUENCE section_team_id_seq minvalue 0 START WITH 1`),
					trx.raw(`ALTER SEQUENCE task_id_seq minvalue 0 START WITH 1`),
					trx.raw(`ALTER SEQUENCE task_team_id_seq minvalue 0 START WITH 1`),
					trx.raw(`SELECT setval('users_id_seq', 0)`),
					trx.raw(`SELECT setval('projects_id_seq', 0)`),
					trx.raw(`SELECT setval('project_team_id_seq', 0)`),
					trx.raw(`SELECT setval('section_id_seq', 0)`),
					trx.raw(`SELECT setval('section_team_id_seq', 0)`),
					trx.raw(`SELECT setval('task_id_seq', 0)`),
					trx.raw(`SELECT setval('task_team_id_seq', 0)`),
				])
			)
	);
}

function seedUsers(db, users) {
	const preppedUsers = users.map((user) => ({
		...user,
		password: bcrypt.hashSync(user.password, 1),
	}));
	return db
		.into('users')
		.insert(preppedUsers)
		.then(() =>
			// update the auto sequence to stay in sync
			db.raw(`SELECT setval('users_id_seq', ?)`, [users[users.length - 1].id])
		);
}

function seedProjectsTables(db, users, projects) {
	// use a transaction to group the queries and auto rollback on any failure
	return db.transaction(async (trx) => {
		await seedUsers(trx, users);
		await trx.into('projects').insert(projects);
		// update the auto sequence to match the forced id values
		await trx.raw(`SELECT setval('projects_id_seq', ?)`, [
			projects[projects.length - 1].id,
		]);
	});
}

function seedMaliciousProject(db, user, project) {
	return seedUsers(db, [user]).then(() =>
		db.into('projects').insert([project])
	);
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
	const token = jwt.sign({ user_id: user.id }, secret, {
		subject: user.user_name,
		algorithm: 'HS256',
	});
	return token;
}

module.exports = {
	makeUsersArray,
	makeProjectsArray,
	makeExpectedProject,
	//makeExpectedArticleComments,
	makeMaliciousProject,
	// makeCommentsArray,

	makeProjectsFixtures,
	cleanTables,
	seedProjectsTables,
	seedMaliciousProject,
	makeAuthHeader,
	seedUsers,
};
