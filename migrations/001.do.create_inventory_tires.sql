CREATE TABLE inventory_tires (
    id SERIAL PRIMARY KEY,
    brand TEXT NOT NULL,
    model TEXT,
    size INTEGER,
    quantity INTEGER,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);
