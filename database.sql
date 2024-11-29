
CREATE TABLE distributor(
    id SERIAL PRIMARY KEY,
    article VARCHAR(100) UNIQUE NOT NULL,
    code INTEGER UNIQUE,
    title VARCHAR(270) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE retailer(
    id SERIAL PRIMARY KEY,
    article VARCHAR(100) NOT NULL,
    shop_name VARCHAR(50) NOT NULL,
    price INTEGER,
    distributor_id INTEGER,
    FOREIGN KEY (distributor_id) REFERENCES  distributor (id)
);