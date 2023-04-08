let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;
chai.use(chaiHttp);

describe("Testing Todos application", () => {
  it("Should return 200 for /health", (done) => {
    chai
      .request("http://localhost:5000")
      .get("/health")
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        throw err;
      });
  });
  it("Should return 200 for /todos", (done) => {
    chai
      .request("http://localhost:5000")
      .get("/todos")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(4);
        done();
      });
  });
  it("Should return 404 for toto", (done) => {
    chai
      .request("http://localhost:5000")
      .get("/todo")
      .then((res) => {
        expect(res).to.have.status(404);
        done();
      })
      .catch((err) => {
        throw err;
      });
  });
  it("Should return 200 for add ToDo", (done) => {
    chai
      .request("http://localhost:5000")
      .post("/todo")
      .send({
        id: 8,
        task: "task8",
        assignee: "assignee-8",
        status: "completed",
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(5);
        done();
      })
      .catch((err) => {
        throw err;
      });
  });
  it('should return 200 for Delete Todo',(done) => {
      chai
      .request("http://localhost:5000")
      .delete(`/todo/1`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(4);
        done();
      })
  })
});
