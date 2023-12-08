import express from "express"
import mysql from "mysql2"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();
const app = express();

const db = mysql.createConnection({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
})

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello this is the backend");
})

app.get("/sets", (req, res) => {
    const q = "SELECT * FROM sets"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/sets/:userId", (req, res) => {
    const userId = req.params.userId
    const q = "SELECT * FROM sets WHERE userId = ?"

    db.query(q, userId, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/sets/:setId", (req, res) => {
    const setId = req.params.setId
    const q = "DELETE FROM sets WHERE setId = ?"

    db.query(q, setId, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/sets", (req, res) => {
    const q = "INSERT INTO sets(`userId`, `setName`) VALUES (?)"
    const values = [
        req.body.userId,
        req.body.setName
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Userset created successfully")
    })
})

app.post("/cards", (req, res) => {
    const q = "INSERT INTO cards(`setId`, `key`, `value`) VALUES (?)"
    const values = [
        req.body.setId,
        req.body.key,
        req.body.value,
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Card created successfully")
    })
})

app.get("/cards", (req, res) => {
    const q = "SELECT * FROM cards"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/cards/:setId", (req, res) => {
    const setId = req.params.setId
    const q = "SELECT * FROM cards WHERE setId = ?"

    db.query(q, setId, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/cards/:cardId", (req, res) => {
    const cardId = req.params.cardId
    const q = "DELETE FROM cards WHERE cardId = ?"

    db.query(q, cardId, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.put("/cards/:cardId", (req, res) => {
    const cardId = req.params.cardId;
    const q = "UPDATE cards SET `key` = ?, `value` = ? WHERE cardId = ?";

    const values = [
        req.body.key,
        req.body.value
    ]

    db.query(q, [...values,cardId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Update successful")
    })

})

app.listen(8800, () => {
    console.log("Connected to backend!sfda");
})