CREATE TABLE users
(
    id serial NOT NULL unique,
    name varchar(255) NOT NULL,
    username varchar(255) NOT NULL unique,
    password_hash varchar(255) NOT NULL,
    current_words varchar(255) NOT NULL default ''
);

CREATE TABLE types
(
    id serial NOT NULL unique,
    type varchar(255) NOT NULL
);

CREATE TABLE words
(
    id serial NOT NULL unique,
    user_id int references users (id) on delete cascade NOT NULL,
    type_id int references types (id) on delete cascade NOT NULL,
    word varchar(255) NOT NULL,
    translation varchar(255) NOT NULL,
    priority int NOT NULL default 1
);
