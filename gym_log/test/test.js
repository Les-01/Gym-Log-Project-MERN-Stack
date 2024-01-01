// test.js

const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../backend/server");
const exerciseRouter = require("../backend/routes/exercises");
const userRouter = require("../backend/routes/users");
chai.use(chaiHttp);
// This is the JSON Web Token confirming the users authorisation to access the server.
const jwtAuthorisationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkyZWNlNTVjNjBiYmNhM2I3OTFjYTEiLCJpYXQiOjE3MDQxMjg5NjUsImV4cCI6MTcxMjc2ODk2NX0.1d8DltOMhoxtXML1nAQrfG603T0bTVR5sqSnBm-R7V8'
// This is the payload for the create exercise test.
const createExercisePayload = {
  exerciseName: "Create Exercise Test",
  reps: 10,
  weight: 10,
  user_id: "6592ece55c60bbca3b791ca1" 
};
// This is the object ID of the object in the database to be deleted in the delete exercise test.
const deleteExerciseId = "65930c63038ce7589528e769"
// This is the object ID of the object in the database to be updated in the update exercise test.
const updateExerciseId = "65930bb240fda0396a986398"
// This is the payload for the update exercise test.
const updateExercisePayload = {
  exerciseName: "Update Exercise Test",
  reps: 10,
  weight: 10,
  user_id: "6592ece55c60bbca3b791ca1" 
};
// This is the payload for the create new user test.
const signupUserPayload = {
  userName: "Test User Signup",
  email: "testuser@signup.com",
  password: "TestUserSignup01!" 
};
// This is the payload for the login user test.
const loginUserPayload = {
  email: "testuser@login.com",
  password: "TestUserLogin01!" 
};

// This is the start of the testing suite.
suite("Integration tests for exercise routes", function() {

  // --------------------  Database Exercise Create, Read, Update and Delete Tests   -------------------- //

  // C.R.U.D Create Exercise Test
  test("CREATE Exercise Test (POST /api/exercises)", function(done) {
    chai.request(app)
      .post("/api/exercises")
      .set('Authorization', jwtAuthorisationToken)
      .send(createExercisePayload)
      .end(function(error, response) {
        console.log(response.body.error);
        console.log(error);
        chai.assert.equal(response.status, 200, "Wrong status code");
        chai.expect(response.body).to.have.property('exerciseName').equal(createExercisePayload.exerciseName);
        chai.expect(response.body).to.have.property('reps').equal(createExercisePayload.reps);
        chai.expect(response.body).to.have.property('weight').equal(createExercisePayload.weight);
        chai.expect(response.body).to.have.property('user_id').equal(createExercisePayload.user_id);
        done();
      });
  });

  // C.R.U.D Retrieve Exercises Test
  test("READ Exercises Test (GET /api/exercises)", function(done) {
    chai.request(app)
      .get("/api/exercises")
      .set('Authorization', jwtAuthorisationToken)
      .end(function(error, response) {
        console.log(response.body.error);
        console.log(error);
        chai.assert.equal(response.status, 200, "Wrong status code");
        chai.expect(response.body).to.be.an("array");
        chai.expect(response.body).to.have.length.above(0);
        // Example assertions for the GET request
        chai.expect(response.body[0]).to.have.property('exerciseName').that.is.a('string');
        done();
      });
  });

  // C.R.U.D Update Exercise Test
  test("UPDATE Exercise Test (PATCH /api/exercises/:id)", function(done) {
    const exerciseIdToUpdate = updateExerciseId;
    chai.request(app)
      .patch(`/api/exercises/${exerciseIdToUpdate}`)
      .set('Authorization', jwtAuthorisationToken)
      .send(updateExercisePayload)
      .end(function(error, response) {
        console.log(response.body.error);
        console.log(error);
        chai.assert.equal(response.status, 200, "Wrong status code");
        chai.expect(response.body).to.have.property('exerciseName').equal(updateExercisePayload.exerciseName);
        chai.expect(response.body).to.have.property('reps').equal(updateExercisePayload.reps);
        chai.expect(response.body).to.have.property('weight').equal(updateExercisePayload.weight);
        chai.expect(response.body).to.have.property('user_id').equal(updateExercisePayload.user_id);
        done();
      });
  }); 

  // C.R.U.D Delete Exercise Test
  test("DELETE Exercise Test (DELETE /api/exercises/:id)", function(done) {
    const exerciseIdToDelete = deleteExerciseId;
    chai.request(app)
      .delete(`/api/exercises/${exerciseIdToDelete}`)
      .set('Authorization', jwtAuthorisationToken)
      .end(function(error, response) {
        console.log(response.body.error);
        console.log(error);
        chai.assert.equal(response.status, 200, "Wrong status code");
        chai.expect(response.body).to.have.property('_id').equal(deleteExerciseId);
        done();
      });
  });

// --------------------  Database User Account Create and Login Tests   -------------------- //

  // C.R.U.D Create User Account Test
  test("CREATE New User Account Test (POST /api/signup)", function(done) {
    chai.request(app)
      .post("/api/user/signup")
      .send(signupUserPayload)
      .end(function(error, response) {
        console.log(response.body.error);
        console.log(error);
        chai.assert.equal(response.status, 200, "Wrong status code");
        chai.expect(response.body).to.have.property('userName').equal(signupUserPayload.userName);
        chai.expect(response.body).to.have.property('email').equal(signupUserPayload.email);
        done();
      });
  });

  // C.R.U.D Login User Test
  test("AUTHENTICATE User Account (Test POST /api/login)", function(done) {
    chai.request(app)
      .post("/api/user/login")
      .send(loginUserPayload)
      .end(function(error, response) {
        console.log(response.body.error);
        console.log(error);
        chai.assert.equal(response.status, 200, "Wrong status code");
        chai.expect(response.body).to.have.property('email').equal(loginUserPayload.email);
        done();
      });
  });
});