const { expect } = require('chai');
const supertest = require('supertest');
require('dotenv').config();

//process.env.TZ = 'UCT'
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.JWT_EXPIRY = '3m';

process.env.TEST_DB_URL = process.env.TEST_DATABASE_URL;

global.expect = expect;
global.supertest = supertest;
