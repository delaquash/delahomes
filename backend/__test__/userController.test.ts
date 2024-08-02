// import request from "supertest";
// import express from "express";
// import userRoute from "../route/userRoute";

// const app = express();
// app.use(express.json());

// app.use("/api/v1/user", userRoute);

// describe("POST api/vi/user/registeruser", () => {
//     it("should return 201 status code when user is created successfully (with timeout)", (done) => {
//       request(app)
//         .post("/api/v1/user/registeruser")
//         .set("Accept", "application/json")
//         // .expect("Content-Type", /json/)
//         .expect(201)
//         .timeout(1999000) // Set a timeout of 5 seconds
//         .end((err, res) => {
//           if (err) return done(err);
//           console.log(err)
//           done();
//         });
//     });
//   });
