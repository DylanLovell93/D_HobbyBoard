DROP DATABASE IF EXISTS hobbyboard_dev;
CREATE DATABASE hobbyboard_dev;

\c hobbyboard_dev;

DROP TABLE IF EXISTS projects, users, connections,posts, comments,testTable ;

CREATE TABLE testTable (
    test_id SERIAL PRIMARY KEY,
    content TEXT NOT NULL
);
CREATE TABLE users (
    username TEXT NOT NULL PRIMARY KEY,
    password TEXT,
    email TEXT NOT NULL,
    date DATE,
    details TEXT,
    created_projects TEXT[],
    collaborated_projects TEXT[],
    profile_image TEXT
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    details TEXT NOT NULL,
    project_image TEXT,
    archived BOOLEAN DEFAULT false,
    creator TEXT NOT NULL,
    FOREIGN KEY (creator) REFERENCES users(username)
);




CREATE TABLE connections (
    username TEXT,
    project_id INTEGER,
    permissions TEXT,
    FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY(project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    CONSTRAINT unique_connection UNIQUE (username, project_id, permissions)
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    project_id INTEGER,
    members_only BOOLEAN DEFAULT true,
    date timestamp NOT NULL,
    title TEXT NOT NULL,
    contents TEXT NOT NULL,
    likes TEXT [],
    FOREIGN KEY(project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INTEGER,
    username TEXT,
    comment TEXT NOT NULL,
    date timestamp NOT NULL,
    FOREIGN KEY(post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE
);
