INSERT INTO section (project_id, section_name, description, start_date, due_date, img_url, completed, created_by)
VALUES
(1, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(2, 'section 2', 'cart', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(3, 'section 3', 'log in user', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(1, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() - '1 days' :: INTERVAL, 'https://cludinary/footage/pics', true, 11 ),
(4, 'section 1', 'register user', now() - '5 days' :: INTERVAL, now() + '4 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 11 ),
(6, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '2 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(1, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '12 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 5 ),
(5, 'section 2', 'product interface', now() - '5 days' :: INTERVAL, now() + '1 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 5 ),
(7, 'section 1', 'customer check out', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(8, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 4 ),
(2, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 11 ),
(2, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() + '10 days' :: INTERVAL, 'https://cludinary/footage/pics', false, 3 ),
(3, 'section 1', 'user interface', now() - '5 days' :: INTERVAL, now() - '2 days' :: INTERVAL, 'https://cludinary/footage/pics', true, 3 )
