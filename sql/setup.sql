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
    neglect_path_id INT
);


INSERT INTO users(username, password_hash) VALUES
('Cupcake', '$2b$10$8NtZGUwUl.GTf.Ol206vmeDYMwuBUAZjNOCfZ2zNcTbdi4H6mNb4e');

INSERT INTO actions (id, prompt, happy_choice, neglect_choice, happy_path_id, neglect_path_id) VALUES
(1, 'Your Termagotchi is home with you and looks bored', 'Take your Termagotchi outside and watch the adventure unfold.', 'Walk to the living room and turn on the TV. You are tired and have no time to play.', 2, 3),
(2, 'You are walking down the street when you notice a forested trail.', 'So Exciting! Take your Termagotchi on a walk through the forest.', 'There is no time for new adventures! Continue walking your normal route.', 4, 5),
(3, 'Your Termagotchi is now hungry, they ask you for some dinner, spaghetti sounds good to them.', 'Get to cookin'' and add some chocolate syrup on top because you know it is their favorite.', 'Tell your Termagotchi you will get to it later, you are deep in the Game of Thrones series.', 6, 7),
(4, 'You come across a meadow and see a fairy ring of mushrooms. Your Termagotchi immediately runs up to it and starts eating it.', 'It''s been awhile since your last trip. What the heck, join them and eat yo shrooms', 'Scold them and express your disappointment. Good digital pets don''t do drugs!', 17, 9),
(5, 'You come across a shimmering orb. Nearly blinded by it''s light, you step closer to inspect', 'You step through what appears to be a portal. You are always down for an adventure', 'Your phone rings and as you answer you walk away, turning your back to the orb', 12, 18),
(6, 'Your Termagotchi is now a sticky mess from dinner, jumps off the table and is now ready to play!', 'You suggest a bath with bubbles and toy ships to keep them entertained', 'Frustrated at the mess, you throw them in the backyard. Stickiness is not allowed in your home!', 15, 17),
(7, 'prompt', 'good', 'bad', 99, 99),
(8, 'prompt', 'good', 'bad', 99, 99),
(9, 'A squirrel runs across the trail in front of you and your Termagotchi chases after it.', 'You have just met this Termagotchi and don''t want them to get lost or hurt. So in an effort to distract, you pull out your banjo and serenade them.', 'You''re not worried, after all, you just met the Termagotchi, let them go wild.', 11, 10),
(10, 'Your Termagotchi opens their mouth and shoots acid at the squirrel, killing it dead immediately', 'You see this as an opportunity for growth and discuss boundaries, humanity and universal connection. You are also impressed with your Termagotchi''s array of skills. You forgive your Termagotchi and give it a hug.', 'You''re not impressed. You are busy thinking about your work day tomorrow. Grab your phone and check your instagram.', 19, 20),
(11, 'Your lovely serenade attracts the attention of a traveling circus group camping in the woods nearby. They invite you over to sit around their campfire.', 'Your Termagotchi seems very excited about the group. You accept the invite and ask the clown if they can make a balloon animal for you Termagotchi.', 'You feel intimidated by all the fun they are having. So you take your insecurities out on your Termagotchi and make them feel shame for having interest in the group.', 21, 22),
(12, 'You open your eyes to busy streets and a bustling town. You realize you are in Tokyo, your Termagotchi''s hometown. Your Termagotchi tells you they are hungry.', 'You feel excited and get the first Taxi you see. You go to Kichijoji Sun Road to buy some delicious food.', 'Your Termagotchi can wait. You take your time and stop at three different museums. This is your first time here, you have plans to see the sites.', 14, 13),
(13, 'While you weren''t looking, your Termagotchi got into some trash and is now feeling sick. Fluids are now expelling out of both ends.', 'Clean up the mess and apologize for ignoring your Termagotchi''s needs. Find the nearest Urgent Care.', 'You can''t handle the mess so you walk away hoping someone else will help your Termagotchi.', 23, 24), 
(14, 'After your delicious meal, you find yourself on the streets enjoying the annual Tanabata celebration. The vibrant and cheerful colors of the parade inspires your Termagotchi to dress up and lead the festivities.', 'Being as supportive as you can, you follow behind and cheer them on! You are so proud.', 'Your introverted ways have got you feeling overwhelmed so you go sit in a cafe. Your Termagocthi will be fine without you, after all, this is their hometown.', 25, 26),
(15, 'The bubbles look so much like ice cream, your Termagotchi gobbles them up, mouthful after mouthful until they are gone. Now they are feeling sick.', 'Make them some tea, turn on a movie and cuddle them back to health.', 'Tell them to "MAN UP!" bubbles are not that bad! You walk to your room and get ready for bed', 16, 27),
(16, 'The movie reminds them of their past. They ask you to build a fort in the hopes of recreating their fun adventures before they met you.', 'happy', 'Threatened by their previous life, you shame them for not living in the present moment with you. You say no because the Termagotchi should only be concerned about your time together now', 28, 29),
(17, 'The world becomes distorted before your eyes. Colors start to pop and the earth looks like it is slowly breathing. You pull out your blanket and lay down next to your Termagotchi. Life is amazing and you are friends forever!', 'replay', 'exit', 1, 0),
(18, 'As you turn away, your Termagotchi jumps through the orb, never to be seen again. You have lost your Termagotchi!', 'replay', 'exit', 1, 0),
(19, 'On the way back home your Termagotchi celebrates your love and presence. They are your pet forever ❤️.', 'replay', 'exit', 1, 0),
(20, 'Your continued acts of neglect have turned your Termagotchi into a MURDERER, they are now a fugitive. Your Termagotchi, fearing the authorities, runs away and you never see it again. You have lost your Termagotchi!', 'replay', 'exit', 1, 0),
(21, 'Your Termagotchi is so appreciative of your love and care. They can''t wait to go on more adventures with you and want to stay forever ❤️.', 'replay', 'exit', 1, 0),
(22, 'Your Termagotchi tells you you need therapy and decides to run off with the circus. Now living their best life, they will not take part in your scarcity. You have lost your Termagotchi!', 'replay', 'exit', 1, 0),
(23, 'The trip wasn''t as planned but it has brought you closer. You realize your love for each other and you are bonded for life.', 'replay', 'exit', 1, 0),
(24, 'A kind stranger that happens to be your Termagotchi''s second cousins uncle finds them and by fate, brings them to their original family. As they are nurtured back to health, they decide to stay with their family in Tokyo. You have lost your Termagotchi!', 'replay', 'exit', 1, 0),
(25, 'You see that your Termagotchi is thriving in Tokyo so you decide to pick up your entire life and move here for them. You are both so excited and live out the rest of your days happily every after.', 'replay', 'exit', 1, 0),
(26, 'Your Termagotchi is a star and realizes that your introverted ways are holding them back. They decide to live in Tokyo without you. You have lost your Termagotchi!', 'replay', 'exit', 1, 0),
(27, 'After hours of vomiting your Termagotchi feels better and finds the quickest escape through the crack in the door you left open. Your toxic energy was no environment to thrive in. You have lost your Termagotchi', 'replay', 'exit', 1, 0),
(28, 'prompt', 'good', 'bad', 99, 99),
(29, 'prompt', 'good', 'bad', 99, 99);