const http = require('http');
const employees = [
    { "eId": 101, "name": "sanjay", "sal": 5000, "gender": "male" },
    { "eId": 104, "name": "geeta", "sal": 8000, "gender": "female" },
    { "eId": 103, "name": "sameer", "sal": 7000, "gender": "male" },
    { "eId": 102, "name": "sita", "sal": 9000, "gender": "female" },
    { "eId": 105, "name": "deepak", "sal": 8000, "gender": "male" }
];
const server = http.createServer((req, res) => {
    const { url, method } = req;
    const empId = url.split('/').pop();
    res.setHeader('Content-Type', 'application/json');

    if (url === '/employees' && method === 'GET') {
        res.end(JSON.stringify(employees));
    } else if (url.includes('/employees') && method === 'GET' && empId) {
        let employee = employees.find(emp => emp.id == +empId);
        res.end(JSON.stringify(employee));
    } else if (url.includes('/employees') && method === 'POST') {
        console.log('post')
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newItem = JSON.parse(body);
            newItem.id = employees.length ? employees[employees.length - 1].id + 1 : 1;
            employees.push(newItem);
            res.writeHead(201);
            res.end(JSON.stringify(newItem));
        });
    }
    // PUT: Update an entire item
    else if (method === 'PUT' && empId) {
        console.log('put')
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedItem = JSON.parse(body);
            const index = employees.findIndex(emp => emp.id === parseInt(empId));
            if (index !== -1) {
                employees[index] = { id: parseInt(empId), ...updatedItem };
                res.writeHead(200);
                res.end(JSON.stringify(employees[index]));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Item not found' }));
            }
        });
    }
    // PATCH: Update part of an item
    else if (method === 'PATCH' && empId) {
        console.log('patch')
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const partialUpdate = JSON.parse(body);
            const index = employees.findIndex(emp => emp.id === parseInt(empId));
            if (index !== -1) {
                employees[index] = { ...employees[index], ...partialUpdate };
                res.writeHead(200);
                res.end(JSON.stringify(employees[index]));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Item not found' }));
            }
        });
    }
    // DELETE: Remove an item
    else if (method === 'DELETE' && empId) {
        console.log('delete')
        const index = employees.findIndex(emp => emp.id === parseInt(empId));
        if (index !== -1) {
            employees.splice(index, 1);
            res.writeHead(200);
            res.end(JSON.stringify({ message: `Employee ${empId} deleted!!` }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: `Employee ${empId} Not Found!!` }));
        }
    }
    // Handle unknown routes
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(5000, () => {
    console.log(`Server Running at 5000 port`)
})