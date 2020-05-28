CREATE TABLE task (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  section_id INTEGER REFERENCES section(id) ON DELETE CASCADE NOT NULL,
  start_date TIMESTAMPTZ DEFAULT now() NOT NULL,
  completed BOOLEAN DEFAULT false NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  description TEXT NOT NULL,
  created_by INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
); 