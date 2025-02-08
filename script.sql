CREATE TABLE points (
                        id SERIAL PRIMARY KEY,
                        x DOUBLE PRECISION NOT NULL,
                        y DOUBLE PRECISION NOT NULL,
                        r DOUBLE PRECISION NOT NULL,
                        hit BOOLEAN NOT NULL,
                        execution_time BIGINT NOT NULL,
                        created_at TEXT NOT NULL
);

