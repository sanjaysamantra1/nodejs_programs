import * as chai from "chai";
const { expect } = chai;
import { default as chaiHttp, request } from "chai-http";
import sinon from "sinon";

import { EmployeeModel } from "../src/models/employee_model.js";
import { app } from "../app.js";

chai.use(chaiHttp);

describe('Test Suite for Employee CRUD', () => {
    let findStub;
    let findByIdStub;
    let createStub;
    let findByIdAndUpdateStub;
    let findByIdAndDeleteStub;

    beforeEach(() => {
        findStub = sinon.stub(EmployeeModel, 'find');
        findByIdStub = sinon.stub(EmployeeModel, 'findById');
        createStub = sinon.stub(EmployeeModel, 'create');
        findByIdAndUpdateStub = sinon.stub(EmployeeModel, 'findByIdAndUpdate');
        findByIdAndDeleteStub = sinon.stub(EmployeeModel, 'findByIdAndDelete');
    })
    afterEach(() => {
        findStub.restore();
        findByIdStub.restore();
        createStub.restore();
        findByIdAndUpdateStub.restore();
        findByIdAndDeleteStub.restore();
    })

    it('should verify getAllEmployees', async () => {
        const mockEmployees = [
            { _id: 111, name: 'sanjay', gender: 'male', sal: 5000 },
            { _id: 222, name: 'simran', gender: 'female', sal: 6000 }
        ]
        findStub.resolves(mockEmployees);

        const res = await request.execute(app).get('/employees');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(mockEmployees);
    })
    it('should verify getEmployeeById', async () => {
        const mockEmployee = { _id: 222, name: 'simran', gender: 'female', sal: 6000 }
        findByIdStub.resolves(mockEmployee);
        const res = await request.execute(app).get('/employees/123');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(mockEmployee);
    })
    it('should return 404 if employee is not found', async () => {
        findByIdStub.resolves(null);
        const res = await request.execute(app).get('/employees/123');
        expect(res).to.have.status(404);
        expect(res.text).to.equal('Employee Not Found');
    })
    it('should return 500 if there is a server error ', async () => {
        findByIdStub.rejects(new Error('Server Error'));
        const res = await request.execute(app).get('/employees/123');
        expect(res).to.have.status(500);
        expect(res.text).to.equal('Server Error');
    })
})