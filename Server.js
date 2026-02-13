const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname))); // static für html, js, mp3, images

const SCORE_FILE = "highscores.json";

// Highscore abrufen
app.get("/get-scores", (req,res)=>{
    if(!fs.existsSync(SCORE_FILE)) fs.writeFileSync(SCORE_FILE, "[]");
    const data = JSON.parse(fs.readFileSync(SCORE_FILE));
    data.sort((a,b)=>b.score-a.score);
    res.json(data.slice(0,10));
});

// Highscore speichern
app.post("/submit-score", (req,res)=>{
    if(!fs.existsSync(SCORE_FILE)) fs.writeFileSync(SCORE_FILE, "[]");
    let data = JSON.parse(fs.readFileSync(SCORE_FILE));
    data.push({name:req.body.name,score:req.body.score});
    data.sort((a,b)=>b.score-a.score);
    fs.writeFileSync(SCORE_FILE, JSON.stringify(data));
    res.json(data.slice(0,10));
});

app.listen(PORT, ()=>console.log(`Server läuft auf http://localhost:${PORT}`));