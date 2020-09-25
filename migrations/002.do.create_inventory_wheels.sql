CREATE TABLE inventory_wheels (
    id SERIAL PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    size INTEGER NOT NULL,
    bolt_pattern INTEGER NOT NULL,
    et INTEGER,
    quantity INTEGER NOT NULL,
    finish TEXT NOT NULL,
    condition TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);
