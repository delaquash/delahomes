import request from "supertest";
import express from "express";
import authRoute from "../route/authRoute";
import User from "../models/userModel";
jest.mock('../models/userModel');
// jest.mock('../utils/sendToken');
// jest.mock('../utils/errorHandler');

const app = express();
app.use(express.json());

require("dotenv").config();
app.use("/api/v1/auth", authRoute);

describe("POST /api/v1/auth/signin", ()=> {
    it('should return 400 if email or password is missing', async () => {
      const response = await request(app).post('/api/v1/auth/signin').send({});
      expect(response.status).toBe(400);
    });


    it("should return a 404 if there is no valid user", async ()=> {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      const response = await request(app).post('/api/v1/auth/signin').send({email: "Bonanza@gmail.com"});
      expect(response.status).toBe(400);
    })

    it("should return a 400 if password is wrong",async ()=> {
      const mockUser = {
          "email": "gbenroalade@gmail.com",
          "password": "Equarshie85@"
      }
      const response = await request(app)
      .post('/api/v1/auth/signin')
      .send({
         email: "gbenroalade@gmail.com", 
         password: "Equarshie85"
         });
      expect(400);
    })


    it("should return a 200 when user signs in with valid credentials", async()=> {
      const mockUser = {
        "email": "gbenroalade@gmail.com",
        "password": "Equarshie85@"
        }
        const response = await request(app)
        .post('/api/v1/auth/signin')
        .send(mockUser)
        expect(200);
    })


    it.only('should return 500 if there is a server error', async () => {
      (User.findOne as jest.Mock).mockRejectedValue(new Error('Server error'));
  
      const response = await request(app).post('/api/signin').send({ email: 'test@example.com', password: 'password123' });
      expect(500);
      expect(response.body.message).toBe('Server error');
    });
})


describe("DELETE /api/v1/auth/signout",()=> {
  it("should return a 400 if user is not logged in", async ()=> {
    const response = await request(app).delete('/api/v1/auth/signout').send();
    expect(response.status).toBe(400);
  })
})