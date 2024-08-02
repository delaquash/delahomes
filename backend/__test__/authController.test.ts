import request from "supertest";
import express from "express";
import authRoute from "../route/authRoute";

const app = express();
app.use(express.json());

require("dotenv").config();
app.use("/api/v1/auth", authRoute);

describe("POST /api/v1/auth", ()=> {
    // it("should return a 200 status code when user sign in",async ()=> {
        // const userData = {
        //     email: "gbenroalade@gmail.com",
        //     password: "Equarshie85@",
        //   };

    //    const res = await request(app)
    //     .post("POST /api/v1/auth")
    //     .set("Accept", "application/json")
    //     // .send(userData)
    //     .expect(200)
    // })

    it.only("responds with 200", (done: any) => {
         const userData = {
            email: "gbenroalade@gmail.com",
            password: "Equarshie85@",
          };
        request(app)
          .post("/api/v1/auth/signin")
          .send(userData)
          .set("Accept", "application/json")
          .timeout(10000000)
          .expect(200, done);
      });
})

/* 
 const mockSendEmail = jest.fn().mockResolvedValue(true); // Mock email sending
    jest.spyOn(global, 'sendEmail').mockImplementation(mockSendEmail);

    const res = await request(app)
      .post("/api/v1/user/registeruser")
      .send(userData)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("activation mail");
    expect(mockSendEmail).toHaveBeenCalledTimes(1); // Verify email was sent
  });
});


*/