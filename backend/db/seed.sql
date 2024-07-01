\c hobbyboard_dev;

INSERT INTO testTable(content) VALUES
('This is our database''s test data');

INSERT INTO users(username, password, email, date, details, created_projects, collaborated_projects, profile_image) VALUES 

('BZ', 'password', 'email@email.com', '05/13/2022', 'Can type gud.','{Legal Drive}','{Noob game devs}', 'https://drive.google.com/uc?id=1xNU72FBvkrAmhZTtKbqPMTm-yPuU3CUx&export=download'),
('JD', 'password', 'email@email.com', '05/14/2022', 'Hey, i''m new to making games and looking for others to learn and collaborate with.','{Noob game devs}', '{}', 'https://i.imgur.com/bNmjbzk.png?1'),
('RS', 'password', 'email@email.com', '05/15/2022', 'Can type gudder.','{T -1Hour,Rohan''s Gamer Dating App}', '{}', 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Jamie_Foxx_Django_avp.jpg'),
('DylanL', 'password', 'email@email.com', '05/16/2022', 'Full Stack Web Developer & Computer Technician','{Backflippers}', '{}', 'https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg0NTEzNzgyNTMyNDE2OTk5/black-cat-gettyimages-901574784.jpg');


INSERT INTO projects(name, details, project_image, archived, creator) VALUES
('Reset','With the project Reset I would like to explore the idea of an apocalyptic video game that begins about a day or two before the apocalypse. Reset is an open world game with a single player/co-op mode. However for this project I will be focusing on making a playable demo of the single player/co-op experience. My main motivation for creating a game like Reset is exploring player decision making during the initial events at the beginning of the apocalypse.', 'https://static.onecms.io/wp-content/uploads/sites/28/2021/02/19/new-york-city-evening-NYCTG0221.jpg', false, 'RS'),
('Noob game devs', 'Hello, I''m look for others who would like to learn about the process of developing games, to play and understand game design, and to collaborate with others in researching and creating our own games.', 'https://i.imgur.com/s5n9x1q.jpg', false, 'JD'),
('CompatABLE', 'An idea for creating a website that can be used to find compatability between two different pieces of technology, be it hardware or software', 'https://www.invensis.net/blog/wp-content/uploads/2015/06/Compatibility-Testing-Invensis.jpg', false, 'DylanL'),
('Legal Drive', 'An illegal racing game that takes place in New York city, where racers can coordinate street racing events using an underground App. This App will track winners and transfer money to participants.', 'https://www.harlemworldmagazine.com/wp-content/uploads/2020/09/The-Fate-Of-The-Furious-64-f3.jpg', false, 'BZ');

INSERT INTO connections (username, project_id, permissions) VALUES
('RS', 1, 'owner'),
('JD', 2, 'owner'),
('DylanL', 3, 'owner'),
('BZ', 4, 'owner'),
('BZ', 2, 'collaborator'),
('BZ', 2, 'follow'),
('BZ', 3, 'collaborator'),
('BZ', 3, 'request'),
('JD', 3, 'collaborator'),
('BZ', 4, 'follower'),
('RS', 4, 'collaborator');


INSERT INTO posts (project_id, members_only, date, title, contents) VALUES 
(1, false, '2020-9-04 10:23:54', 'Character model: Lisa', 'We just finished the first charater model. Check out Lisa HERE'),
(2, true, '2020-9-05 10:23:54', 'Post 2', 'This is our second test post'),
(2, false, '2020-9-06 10:23:54', 'Post 3', 'This is our third test post'),
(2, false, '2020-9-07 10:23:54', 'Post 4', 'This is our fourth test post'),
(3, true, '2022-3-04 10:23:54', 'Group Links', 'Discord: -here-, Facebook: -here-'),
(3, false, '2022-5-07 10:23:54', 'LF Video Editor', 'We''re in Alpha! Looking for members to help with video editing! '),
(4, false, '2020-9-08 10:23:54', 'Post 5', 'This is our fifth test post'),
(1, false, '2020-9-04 10:23:54', 'Character model: Jacob', 'We just finished up Lisa''s husband Jacob. Check it the new model HERE');

INSERT INTO comments (post_id, username, comment, date) VALUES 
(1, 'DylanL', 'Wow, this is amazing', '2020-9-05 10:23:54'),
(1, 'BZ', 'Her lips look so real!', '2020-9-06 10:23:54'),
(1, 'RS', 'We will be working on some simple animations next :-)', '2020-9-05 10:23:54'),
(2, 'JD', 'Test comment 4', '2020-9-05 10:23:54'),
(2, 'DylanL', 'Test comment 5', '2020-9-05 10:23:54'),
(3, 'BZ', 'Test comment 6', '2020-9-05 10:23:54'),
(3, 'RS', 'Test comment 7', '2020-9-05 10:23:54'),
(4, 'JD', 'Test comment 8', '2020-9-05 10:23:54'),
(6, 'JD', 'Sounds good!', '2022-6-03 10:23:54'),
(6, 'BZ', 'Works for me!', '2022-6-04 10:23:54');

INSERT INTO likes (post_id, username) VALUES 
(1, 'RS'),
(1, 'BZ'),
(1, 'JD'),
(1, 'DylanL'),
(6, 'JD'),
(6, 'BZ'),
(8, 'RS'),
(8, 'BZ'),
(8, 'JD'),
(8, 'DylanL');

