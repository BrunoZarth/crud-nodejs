CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4 (),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE product (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE request (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    quantity INTEGER NOT NULL,
    product_id UUID NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE cart (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    users_id UUID NOT NULL,
    created_at TIMESTAMP,
    FOREIGN KEY (users_id) REFERENCES users (id)
);

CREATE TABLE cart_request (
    cart_id UUID NOT NULL,
    request_id UUID NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES cart (id),
    FOREIGN KEY (request_id) REFERENCES request (id)
);
