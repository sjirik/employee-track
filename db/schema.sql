DROP DATABASE IF EXISTS work_db;
CREATE DATABASE work_db;

USE work_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE job (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30), 
  pay DECIMAL, 
  department_id INT, 
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
); 


CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30), 
  last_name VARCHAR(30), 
  role_id INT, 
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES job(id) ON DELETE SET NULL 
);