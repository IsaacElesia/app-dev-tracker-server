INSERT INTO section (project_id, section_name, description, start_date, due_date, img_url, completed, created_by)
VALUES
(9, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(9, 'section 2', 'cart', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(9, 'section 3', 'log in user', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(10, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() - '1 days' :: INTERVAL, 'https://cludinary/footage/pics', true, 11 ),
(10, 'section 1', 'register user', now() - '5 days' :: INTERVAL, now() + '4 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 11 ),
(13, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '2 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(11, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '12 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 5 ),
(11, 'section 2', 'product interface', now() - '5 days' :: INTERVAL, now() + '1 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 5 ),
(12, 'section 1', 'customer check out', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(13, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 4 ),
(14, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 11 ),
(15, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(16, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() - '2 days' :: INTERVAL, 'https://cludinary/footage/pics', true, 3 )
