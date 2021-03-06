CREATE TABLE projects (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  start_date TIMESTAMPTZ DEFAULT now() NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  description TEXT,
  project_name TEXT NOT NULL,
  project_repo TEXT NOT NULL,
  completed BOOLEAN DEFAULT false NOT NULL,
  created_by INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);