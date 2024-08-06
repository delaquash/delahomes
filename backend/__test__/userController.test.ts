import request from "supertest";
import express from "express";
import userRoute from "../route/userRoute";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use("/api/v1/user", userRoute);

describe("User /api/v1/user ", () => {
    //    beforeEach(async () => {
    //     try {
    //      await mongoose.connect(String(process.env.MONGO_URI_TEST));
    //     } catch (error: any) {
    //       console.log(error.message);
    //     }
    //   });
    
    //   afterEach(async () => {
    //     await mongoose.disconnect();
    //     await mongoose.connection.close();
    //  });

     it("should return a 400 Invalid refresh token if there is no token", async ()=>{
        const response = await request(app)
        .post("/api/v1/user/refresh-token")
        .send({
          refreshToken: ""
          });
          
     } )
});

})

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
