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
