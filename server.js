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
