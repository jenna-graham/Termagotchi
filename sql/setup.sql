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
(1, 'You are chillin'' at home with your Termagotchi and you notice they look bored', 'Take your Termagotchi outside and watch the adventure unfold.', 'Walk to the living room and turn on the TV. You are tired and have no time to play.', 2, 3),
(2, 'You are walking down the street when you notice a forested trail.', 'This looks Exciting, so you take your Termagotchi on a walk through the forest.', 'There is no time for new adventures! Continue walking your normal route.', 4, 5),
(3, 'Your Termagotchi is now hungry, they ask you for some dinner, spaghetti sounds good to them but you are out of some ingredients.', 'Buckle your Termagotchi in the car and head to the grocery store.', 'Hershey''s chocolate syrup looks like a good alternative. You are sure Termagotchi''s need sugar.', 6, 7),
(4, 'You come across a meadow and see a fairy ring of mushrooms. Your Termagotchi immediately runs up to it and starts eating it.', 'It''s been awhile since your last trip. What the heck, join them and eat yo shrooms', 'Scold them and express your disappointment. Good digital pets don''t do drugs!', 17, 9),
(5, 'You come across a shimmering orb. Nearly blinded by it''s light, you step closer to inspect', 'You step through what appears to be a portal. You are always down for an adventure', 'Your phone rings and as you answer you walk away, turning your back to the orb', 12, 18),
(6, 'You arrive at the store and your Termagotchi runs to the cart shaped like a car. They crawl inside and immediately run into a bin full of apples. APPLES ARE FLYING EVERYWHERE!', 'You take this unfortunate situation as an opportunity to play the game of clean up. apologizing to the staff and customers around you. You know your Termagotchi didn''t mean any harm.', 'You step back slowly and turn to walk out the store, You don''t know who that Termagotchi belongs to.', 15, 17),
(7, 'Hyper and covered in chocolate syrup, your Termagotchi is now bouncing off the walls, making a sticky mess.', 'Addressing both situations you have the brilliant idea of setting up the sprinkler outside. You put on your swimsuit and join them in all the fun.', 'Frustrated, you scold your Termagotchi for making such a mess. Even though you know you gave them the chocolate, you make them clean up the mess and send them straight to bed!', 8, 32),
(8, 'Your yard is now soaked and the dirt has become mud. Your Termagotchi starts to make mud pies and is now dirtier than when you started.', 'You run and grab your camera because the mud covered Termagotchi is actually quite cute. You capture the authentic moment because you know they are only this young once.', 'Frustrated you tell your Termagotchi they are no longer allowed inside your home. They are far too messy and you are overwhelmed by the work it is taking to raise this digital pet.', 33, 34),
(9, 'A squirrel runs across the trail in front of you and your Termagotchi chases after it.', 'You have just met this Termagotchi and don''t want them to get lost or hurt. So in an effort to distract, you pull out your banjo and serenade them.', 'You''re not worried, after all, you just met the Termagotchi, let them go wild.', 11, 10),
(10, 'Your Termagotchi opens their mouth and shoots acid at the squirrel, killing it dead immediately', 'You see this as an opportunity for growth and discuss boundaries, humanity and universal connection. You are also impressed with your Termagotchi''s array of skills. You forgive your Termagotchi and give it a hug.', 'You''re not impressed. You are busy thinking about your work day tomorrow. Grab your phone and check your instagram.', 19, 20),
(11, 'Your lovely serenade attracts the attention of a traveling circus group camping in the woods nearby. They invite you over to sit around their campfire.', 'Your Termagotchi seems very excited about the group. You accept the invite and ask the clown if they can make a balloon animal for you Termagotchi.', 'You feel intimidated by all the fun they are having. So you take your insecurities out on your Termagotchi and make them feel shame for having interest in the group.', 21, 22),
(12, 'You open your eyes to busy streets and a bustling town. You realize you are in Tokyo, your Termagotchi''s hometown. Your Termagotchi tells you they are hungry.', 'You feel excited and get the first Taxi you see. You go to Kichijoji Sun Road to buy some delicious food.', 'Your Termagotchi can wait. You take your time and stop at three different museums. This is your first time here, you have plans to see the sites.', 14, 13),
(13, 'While you weren''t looking, your Termagotchi got into some trash and is now feeling sick. Fluids are now expelling out of both ends.', 'Clean up the mess and apologize for ignoring your Termagotchi''s needs. Find the nearest Urgent Care.', 'You can''t handle the mess so you walk away hoping someone else will help your Termagotchi.', 23, 24), 
(14, 'After your delicious meal, you find yourself on the streets enjoying the annual Tanabata celebration. The vibrant and cheerful colors of the parade inspires your Termagotchi to dress up and lead the festivities.', 'Being as supportive as you can, you follow behind and cheer them on! You are so proud.', 'Your introverted ways have got you feeling overwhelmed so you go sit in a cafe. Your Termagotchi will be fine without you, after all, this is their hometown.', 25, 26),
(15, 'As you finish apologizing, you turn around and your Termagothci is no where to be found. You frantically search the aisles to find cereal boxes falling from the top shelf all over the floor. Somehow they have climbed the shelves and are wreaking havoc!', 'You run and grab the closest ladder you can find, help them down and give them a hug. You are so happy they are okay and didn''t get hurt.', 'You yell at the top of your lungs ''GET THE F*#$ DOWN NOW!''', 16, 27),
(16, 'Due to repeated offenses you have now been kicked out of the store and are forced to get spaghettis at a restaurant instead. Once inside the restaurant you notice a karaoke stage and before you know it your Termagotchi is grabbing the mic.', 'You suggest they sing ''Party in the USA''. You are the loudest amongst the crowd and are your Termagotchi''s biggest supporter.', 'Embarrassed by your Termagotchi''s performance, you drag them out of the restaurant and leave before they can have dinner.', 28, 29),
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
(27, 'Scared of the shrilling decibals of your voice, your Termagotchi is now frightened and jumps from one shelf to the next. In an effort to hide form you they quickly create a fort out of toilet paper rolls.', 'You immediately change the tone of your voice, crawl on your hands and knees into the fort and apologize. You may be a parent, but you are far from perfect.', 'You kick down the Termagotchi''s fort, yank them out and continue yelling.', 30, 31),
(28, 'Your Termagotchi is a hit and you now have a promising future as a manager for your newly famous Termagotchi. #partners4life.', 'replay', 'exit', 1, 0),
(29, 'Upset and starving your Termagotchi packs their bags and heads to the train station. They successfully pursue a career as a musician and eat spaghetti every day. You have lost your Termagotchi!', 'replay', 'exit', 1, 0),
(30, 'Your Termagotchi is impressed by your fortitude and self awareness. They decide to stay and be yours forever ♡.', 'replay', 'exit', 1, 0),
(31, 'Customers start to notice all the commotion and unfortunately for you, one of them works for CPS. You are taken in for questioning and your Termagotchi is now in foster care. You have lost your Termagotchi', 'replay', 'exit', 1, 0),
(32, 'Upset and unable to fall asleep, your Termagotchi makes a knotted sheet rope and flings it out the window. As it slides down it thinks about how unfair of an owner you have been and runs away. You have lost your Termagotchi!', 'replay', 'exit', 1, 0),
(33, 'Impressed by how photogenic your Termagotchi is, you submit the photos to a modeling agency and your Termagotchi becomes one of the world''s Top Models! They stay loyal to you as without your love and support they wouldn''t be who they are today. They are yours forever ♡.', 'replay', 'exit', 1, 0),
(34, 'Forced to become resourceful, your pet wonders off and meets a local pac of stray Termagothchi''s They are their new family and they live happily ever after without you. You have lost your Termagotchi!', 'replay', 'exit', 1, 0),
(35, 'You get into your car and drive away, abandoning your Termagotchi forcing them to live out the rest of their days as a grocery goblin. You have lost your Termagotchi!', 'replay', 'exit', 1, 0);