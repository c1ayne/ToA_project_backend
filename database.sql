
create TABLE distributor(
    id SERIAL PRIMARY KEY UNIQUE,
    article VARCHAR(50),
    code INTEGER UNIQUE,
    title VARCHAR(200),
    category VARCHAR(50),
    price INTEGER
);

create TABLE retailer(
    id SERIAL PRIMARY KEY,
    code INTEGER UNIQUE,
    shop_name VARCHAR(50),
    price INTEGER,
    distributor_id INTEGER,
    FOREIGN KEY (distributor_id) REFERENCES  distributor (id)
);