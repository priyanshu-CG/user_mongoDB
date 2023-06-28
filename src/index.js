const express = require("express");
const {connect} = require('./services/mongoConnect') 
require("dotenv").config();
const app = express();
const {
  createUser,
  getAllUsers,
  findOneUser,
  updateUser,
  FindUserWithFilter,
  deleteUser,
} = require("./controller/user");
const Joi = require('joi');
const logger = require('./middleware/log')

const middleware = () => {
  app.use(express.json());
  app.use(express.urlencoded({extended:false}))
  app.use(logger.logger)
};4




const routes = () => {

  app.get("/api/users",async (req, res) => {
     try {
    // Fetch all users from the database using the User model
    const users = await getAllUsers()

    res.status(200).send(users); // Return the users in the response
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
  });

  app.get("/api/users/:email", async (req, res) => {
    const email = req.params.email;
    try {
      console.log(email);
      const user = await findOneUser(email);
      return res.status(201).send(user);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });



  app.post("/api/users", async (req, res) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required().min(5),
        age: Joi.number().required(),
        password: Joi.string().required().min(8),
        email: Joi.string().email().required(),
      });
      await schema.validateAsync(req.body, { abortEarly: false });
      const { name, email, password, age } = req.body;
      const user = await createUser(name, email, password, age);
      return res.status(201).send(user);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });


  app.post("/api/users/:id", async (req, res) => {
    const {id} = req.params
    const { name, password } = req.body;
    const data = { name, password };
    try {
      const user = await updateUser(id, data);
      return res.status(201).send(user);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.get("/api/user/sort", async (req, res) => {
    try {
      // Fetch all users from the database using the User model
      const users = await FindUserWithFilter();

      res.status(200).send(users); // Return the users in the response
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
      // Call your delete function or logic here
      await deleteUser(id);

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


};

const defRoutes = () => {
  // Add your default routes logic here

  app.all("/", (req, resp) => {
    resp.status(200).send({ success: true, message: "Server is working" });
  });

  app.all("*", (req, resp) => {
    resp
      .status(404)
      .send({
        success: false,
        message: `given route [${req.method}] ${req.path} not found`,
      });
  });
};

// const start = async () => {
//   console.log("Server starteing");
//   await app.listen(process.env.PORT, () => {
//     console.log("Server listening on port: " + process.env.PORT);
//   });

//   try {
//     await connect();
//     middleware();
//     routes();
//     defRoutes();
//   } catch (error) {
//     console.error("Error starting the server:", error);
//   }
// };



const start=async()=>{
  app.listen(process.env.PORT);
  try{
    await connect()
  }
  catch(error){
        console.log("Error starting the server:", error);

  }
}

start();