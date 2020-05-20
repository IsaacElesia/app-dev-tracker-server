CREATE TABLE section_team(
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  section_id INTEGER REFERENCES section(id) ON DELETE CASCADE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
)