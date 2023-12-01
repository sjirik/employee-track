INSERT INTO department (name)
VALUES ("Managment");

INSERT INTO department (name)
VALUES ("Customer_Support");

INSERT INTO department (name)
VALUES ("Service_Staff"); 

INSERT INTO job (title, pay, department_id)
VALUES ("Manager", 100, 1); 

INSERT INTO job (title, pay, department_id)
VALUES ("Bartender", 65, 2); 

INSERT INTO job (title, pay, department_id)
VALUES ("Janitor", 50, 3); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Catherine", "Bateman", 1, null); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Matthew", "Weber", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Arnold", "Laskins", 2, 1); 