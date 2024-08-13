const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your Express app is exported from app.js
const EmployeeModel = require('../src/models/employee_model');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /employees', () => {
    let findStub;
    let findOneStub;

    beforeEach(() => {
        findStub = sinon.stub(EmployeeModel, 'find');
        findOneStub = sinon.stub(EmployeeModel, 'findOne');
    });

    afterEach(() => {
        findStub.restore();
        findOneStub.restore();
    });
    it('should return all employees', async () => {
        const mockEmployees = [
            { _id: '123', name: 'sanjay samantra' },
            { _id: '123', name: 'manoj kumar' }
        ];
        findStub.resolves(mockEmployees);

        const res = await chai.request(app).get('/employees');

        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(mockEmployees);
    });

    it('should return 1 employee if found', async () => {
        const mockEmployee = { _id: '123', name: 'John Doe' };
        findOneStub.resolves(mockEmployee);

        const res = await chai.request(app).get('/employees/123');

        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(mockEmployee);
    });

    it('should return 404 if employee is not found', async () => {
        findOneStub.resolves(null);

        const res = await chai.request(app).get('/employees/123');

        expect(res).to.have.status(404);
        expect(res.text).to.equal('employee not found');
    });

    it('should return 500 if there is a server error', async () => {
        findOneStub.rejects(new Error('Server error'));

        const res = await chai.request(app).get('/employees/123');

        expect(res).to.have.status(500);
        expect(res.text).to.equal('Server error');
    });
});
