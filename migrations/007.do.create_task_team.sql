CREATE TABLE task_team(
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  task_id INTEGER REFERENCES task(id) ON DELETE CASCADE NOT NULL,
  section_id INTEGER REFERENCES section(id) ON DELETE CASCADE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
)