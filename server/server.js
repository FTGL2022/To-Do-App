const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use (cors());


app.get("/todos1/:userEmail", async (req, res) => {
  console.log (req)
  const {userEmail} =req.params
  console.log(userEmail)
  try {
    const todos = await pool.query("SELECT * FROM todos1 WHERE useremail= $1", [userEmail]); 
    res.json(todos.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno do servidor");
  }
});

  


  app.post("/todos1", async (req, res) => {
    const { useremail, title, progress, date } = req.body;
  
    try {
      const newToDo = await pool.query(
        "INSERT INTO todos1 (useremail, title, progress, date) VALUES ($1, $2, $3, $4)",
        [useremail, title, progress, date]
      );
  
      
      res.status(201).send("Tarefa adicionada com sucesso");
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro interno do servidor");
    }
  });
  


app.put("/todos1/:id", async (req, res) => {
  const { id } = req.params;
  const { useremail, title, progress, date } = req.body;
  try {
    const editToDo = await pool.query(
      "UPDATE todos1 SET useremail = $1, title = $2, progress = $3, date = $4 WHERE id = $5",
      [useremail, title, progress, date, id]
    );
    res.json(editToDo.rows); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar o todo" });
  }
});





app.delete("/todos1/:id", async(req, res)=>{
  const {id}= req.params;
  try {
  const deleteToDo = await pool.query("DELETE FROM todos1 WHERE id = $1",[id])
  res.json(deleteToDo.rows)
  } catch (err) {
    console.log(err)
  }
})


app.post("/signup", async (req, res) =>{
  const {email, password} = req.body;
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  try {

   const signup = await pool.query("INSERT INTO users (email, hashed_password) VALUES ($1, $2)", [email, hashedPassword])

   const token = jwt.sign({email}, 'secret' , {expiresIn: '1h'})
   res.json({email, token})

  } catch (err) {
    console.error(err);
    if(err) {
      res.json ({detail: err.detail})
    }
  }
})



app.post("/login", async (req, res) =>{
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE useremail = $1", [email]);
    if (!result.rows.length) {
      return res.json({ detail: "User does not exist" });
    }

    const user = result.rows[0];
    const success = await bcrypt.compare(password, user.password);

    if (success) {
      const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
      res.json({ email: user.useremail, token });

      res.cookie("AuthToken", token);
      res.cookie("Email", user.useremail);
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});