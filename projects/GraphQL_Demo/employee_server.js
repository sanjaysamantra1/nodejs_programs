const express = require('express');
const cors = require('cors');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql');
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');

const app = express()
app.use(cors());

// In-memory database
const employees = [
    { id: 1, name: 'Sachin Tendulkar', sal: 5000, gender: 'male' },
    { id: 2, name: 'Kapil Dev', sal: 7000, gender: 'female' },
];

// Employee Type Definition
const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        sal: { type: GraphQLInt },
        gender: { type: GraphQLString },
    },
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve: () => employees,
        },
        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLInt } },
            resolve: (_, { id }) => employees.find((employee) => employee.id === id),
        },
    },
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                sal: { type: new GraphQLNonNull(GraphQLInt) },
                gender: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { name, sal, gender }) => {
                const newEmployee = { id: String(employees.length + 1), name, sal, gender };
                employees.push(newEmployee);
                return newEmployee;
            },
        },
        updateEmployee: {
            type: EmployeeType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLString },
                sal: { type: GraphQLInt },
                gender: { type: GraphQLString }
            },
            resolve: (_, { id, name, sal, gender }) => {
                const employee = employees.find((employee) => employee.id == id);
                if (!employee) throw new Error('Employee not found');
                if (name) employee.name = name;
                if (sal) employee.sal = sal;
                if (gender) employee.gender = gender;
                return employee;
            },
        },
        deleteEmployee: {
            type: EmployeeType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (_, { id }) => {
                const employeeIndex = employees.findIndex((employee) => employee.id === id);
                if (employeeIndex === -1) throw new Error('Employee not found');
                return employees.splice(employeeIndex, 1)[0];
            },
        },
    },
});

// Schema
const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

/* call createHandler(Schema) */
app.all('/api/employees', createHandler({ schema }));

// serve RURU ui
app.get('/', (req, res) => {
    res.end(ruruHTML({ endPoint: '/api/employees' }))
})

app.listen(5000, () => {
    console.log(`Server Running at 5000 port`)
});


/* Example queries:
1. Get all employees:
query { employees { id name gender } }

2. Get a single employee by ID:
query { employee(id: 1) { name gender } }

3. Add a new employee:
mutation { addEmployee(id:3 , name: "Rahul Dravid",sal:8000, gender: "male") { id name gender } }

4. Update a employee:
mutation{updateEmployee(id:1,name:"sanjay 2", sal:8000, gender: "male"){id name sal gender}}

5. Delete a employee:
mutation { deleteEmployee(id: 1) { id name sal gender } } */