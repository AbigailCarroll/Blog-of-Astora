const {readFileSync, writeFileSync} = require('fs');

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req,res) => {
    const count = readFileSync('./count.txt', 'utf-8');
    console.log('count ', count)

    const intCount = parseInt(count) + 1
    const newCount = intCount.toString()
    const LSD = newCount.slice(-1);
    let ordinal = "th";
    switch(LSD){
        case "1":
            ordinal = "st";
            break;
        case "2":
            ordinal = "nd";
            break;
        case "3":
            ordinal = "rd";
    }
    if(count > 9 && count < 13)
    {
        ordinal = "th";
    }
    writeFileSync('./count.txt', newCount);
    
    res.render('homepage.ejs', {newCount, ordinal});
    

});

app.get('/ReadingList', (req, res) => {
    res.render('ReadingList.ejs');
})


app.listen(5000, () => console.log('http://localhost:5000/'));
