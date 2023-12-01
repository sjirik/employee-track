const inquirer = require('inquirer');
const mysql = require('mysql2') 
const cTable = require('console.table');
const { default: Choices } = require('inquirer/lib/objects/choices');
require('dotenv').config();

const connect = mysql.createConnection(
    {
    host: '127.0.0.1',
    user: 'root',
    password: 'Password1',
    database: 'work_db'
    },
  );

const firstQuestion = [
  {
    type: 'list', 
    name: 'firstQ',
    message: 'Please choose one:',
    choices: ['View Depts.', 'View Jobs', 'View Employees', 'Add Dept.', 'Add Job', 'Add Employee', 'Update Employee Job']
  }
];

const addDepartment = [
  {
    type: 'input', 
    name: 'departmentQuestion', 
    message: 'Department name?',
  }
]; 

const addRole = [
  {
    type: 'input', 
    name: 'roleQuestion', 
    message: 'Name of role?'
  }, 
  {
    type: 'input', 
    name: 'salaryQuestion', 
    message: 'Salary of role?'
  }, 
  {
    type: 'input', 
    name: 'departmentQuestion', 
    message: 'What is the department ID?'
  }
];

const addEmployee = [
  {
    type: 'input', 
    name: 'first_name', 
    message: 'First name?'
  }, 
  {
    type: 'input', 
    name: 'last_name', 
    message: 'Last name?'
  }, 
  {
    type: 'input', 
    name: 'role_id', 
    message: 'Role ID?'
  },
  {
    type: 'input', 
    name: 'manager_id', 
    message: 'Manager ID?'
  }
];

const updateEmployee = [
  {
    type: 'input', 
    name: 'current', 
    message: 'Current ID?'
  },
  {
    type: 'input', 
    name: 'new', 
    message: 'New ID?'
  }
];

function answerFirstQuestion({firstQ}) {
  switch(firstQ) {
    case 'View Depts.':
        
        viewDepts();

      break;

    case 'View Jobs':

      viewRoles();
        
      break;

    case 'View Employees':

      viewEmploy();
      
      break;

    case 'Add Dept.':

      addDept();
     
      break;

    case 'Add Job':

      addRoles();
      
      break;

    case 'Add Employee':

      addEmploy();
      
      break;

    case 'Update Employee Job':
      
      updateRole();
    
      break;

      default:
        console.log(`Goodbye!`);
    }
};

function addDept() {
  inquirer.prompt(addDepartment)
  .then((answers) => {
    connect.query(
      `INSERT INTO department (name) VALUES (?);`, 
      [answers.departmentQuestion], 
      (err, results) => { 
        err
        ? console.log(err)
        : viewDepts() &&
        console.log("Successfully added Department")
      }
    )
  })
}; 

function addRoles() {
  inquirer.prompt(addRole)
  .then((answers) => {
    connect.query(
      `INSERT INTO job (title, pay, department_id) VALUES ( ?, ?, ?);`, 
      [answers.roleQuestion, answers.salaryQuestion, answers.departmentQuestion], 
      (err, results) => { 
        err
        ? console.log(err)
        : viewRoles();
      }
    )
  })
}; 

function addEmploy() {
  inquirer.prompt(addEmployee)
  .then((answers) => {
    connect.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES( ?, ?, ?, ?)`, 
      [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], 
      (err, results) => { 
        err
        ? console.log(err)
        : viewEmploy();
      }
    )
  })
}; 

function viewDepts() {
  connect.query (
    `SELECT department.name AS 'Department', department.id AS 'Department ID' FROM department`, 
    (err, results) => { 
      err
      ? console.log(err)
      : console.table(results)
      init();
    }
  )
};

function viewRoles() {
  connect.query (
    `SELECT job.title AS 'Role Title', job.id AS 'Role ID' ,job.pay AS 'Salary', job.department_id AS 'Department ID' FROM job`, 
    (err, results) => { 
      err
      ? console.log(err)
      : console.table(results)
      init();
    }
  )
};

function viewEmploy() {
  connect.query (
    `SELECT 
      employee.id AS 'Employee ID',
      employee.first_name AS 'First Name', 
      employee.last_name AS 'Last Name', 
      job.title AS 'Title', 
      job.department_id AS 'Department', 
      job.pay AS 'Salary',
      employee.manager_id AS 'Manager ID'
     FROM 
      employee
        JOIN job ON employee.role_id = job.id
        JOIN department ON job.department_id = department.id 
        LEFT JOIN employee manager ON manager.id = employee.manager_id`,
        (err, results) => { 
          err
          ? console.log(err)
          : console.table(results)
          init();
    }
  )
}; 

function updateRole() {
  inquirer
  .prompt(updateEmployee)
  .then((answers) =>{
      connect.query(
          `UPDATE employee SET role_id = ? WHERE id = ?`,
              [answers.current, answers.new],
          (err, results) => { 
              err
              ? console.log(err)
              : viewEmploy();
          }
      );
  })
};

