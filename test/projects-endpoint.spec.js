const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Projects Endpoints', function () {
	let db;

	const { testUsers, testProjects } = helpers.makeProjectsFixtures();

	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL,
		});
		app.set('db', db);
	});

	after('disconnect from db', () => db.destroy());

	before('cleanup', () => helpers.cleanTables(db));

	afterEach('cleanup', () => helpers.cleanTables(db));

	describe('GET /api/projects', () => {
		context('Given no project', () => {
			it('responds with 200 and an empty list', () => {
				return supertest(app).get('/api/projects').expect(200, []);
			});
		});

		context('Given there are prjects in the database', () => {
			beforeEach('insert project', () =>
				helpers.seedProjectsTables(db, testUsers, testProjects)
			);

			it('responds with 200 and all of the projects', () => {
				const expectedProjects = testProjects.map((project) =>
					helpers.makeExpectedProject(project)
				);
				return supertest(app)
					.get('/api/projects')
					.expect(200, expectedProjects);
			});
		});

		context('Given an XSS attack project', () => {
			const testUser = helpers.makeUsersArray()[1];
			const {
				maliciousProject,
				expectedProject,
			} = helpers.makeMaliciousProject(testUser);

			beforeEach('insert malicious project', () => {
				return helpers.seedMaliciousProject(db, testUser, maliciousProject);
			});

			it('removes XSS attack content', () => {
				return supertest(app)
					.get('/api/projects')
					.expect(200)
					.expect((res) => {
						expect(res.body[0].project_name).to.eql(
							expectedProject.projectName
						);
						expect(res.body[0].description).to.eql(expectedProject.description);
					});
			});
		});
	});

	describe(`GET /api/projects/:project_id`, () => {
		context(`Given no project`, () => {
			beforeEach(() => helpers.seedUsers(db, testUsers));

			it(`responds with 404`, () => {
				const projectId = 123456;
				return supertest(app)
					.get(`/api/projects/${projectId}`)
					.set('x-auth-token', helpers.makeAuthHeader(testUsers[0]))
					.expect(404, { error: `Project doesn't exist` });
			});
		});

		context('Given there are projects in the database', () => {
			beforeEach('insert projects', () =>
				helpers.seedProjectsTables(db, testUsers, testProjects)
			);

			it('responds with 200 and the specified project', () => {
				const projectId = 2;
				const expectedProject = helpers.makeExpectedProject(
					testProjects[projectId - 1]
				);

				return supertest(app)
					.get(`/api/projects/${projectId}`)
					.set('x-auth-token', helpers.makeAuthHeader(testUsers[0]))
					.expect(200, expectedProject);
			});
		});

		context(`Given an XSS attack project`, () => {
			const testUser = helpers.makeUsersArray()[1];
			const {
				maliciousProject,
				expectedProject,
			} = helpers.makeMaliciousProject(testUser);

			beforeEach('insert malicious project', () => {
				return helpers.seedMaliciousProject(db, testUser, maliciousProject);
			});

			it('removes XSS attack content', () => {
				return supertest(app)
					.get(`/api/projects/${maliciousProject.id}`)
					.set('x-auth-token', helpers.makeAuthHeader(testUser))
					.expect(200)
					.expect((res) => {
						expect(res.body.project_name).to.eql(expectedProject.projectName);
						expect(res.body.description).to.eql(expectedProject.description);
					});
			});
		});
	});

	//start herer
});
