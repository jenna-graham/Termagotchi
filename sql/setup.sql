-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS actions CASCADE;
DROP TABLE IF EXISTS user_actions;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR NOT NULL,
    password_hash VARCHAR NOT NULL 
);

CREATE TABLE actions (
    id BIGINT PRIMARY KEY,
    prompt VARCHAR NOT NULL,
    happy_choice VARCHAR NOT NULL,
    neglect_choice VARCHAR NOT NULL,
    happy_path_id INT,
    neglect_path_id INT,
    is_good BOOLEAN
);

CREATE TABLE user_actions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    path_id BIGINT,
    user_id BIGINT,
    -- pet_owner BOOLEAN,
    FOREIGN KEY (path_id) REFERENCES actions(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users(username, password_hash) VALUES
('Cupcake', '123456');

INSERT INTO actions (id, prompt, happy_choice, neglect_choice, happy_path_id, neglect_path_id, is_good) VALUES
(1, 'Congratulations on your new pet! You will want to take care of them so they will love you back (neglected pets never stay too long)', 'smile and say hello', 'go about your busy life', 2, 3, null);