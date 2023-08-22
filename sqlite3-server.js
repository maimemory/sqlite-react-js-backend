const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const memo = require('./models/memo');
const cors = require('cors');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.post('/create', async (req, res) => {

    const results = await memo.create(req.body);
    res.status(201).json({ message: `${results.detail}, ${results.writer}, ${results.date} has been created`});
})

app.get('/read', async (req, res) => {
    const results = await memo.findAll();
    return res.status(200).json(results);
})

app.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    const newDetail = req.body.newDetail;

    const results = await memo.update({ detail: newDetail},
        {
            where : {
                id : id
            }
        }    
    )
    return res.status(200).json({ message: `${newDetail} successfully updated`});
})

app.delete('/delete/:date', async (req, res) => {
    const date = req.params.date;

    const results = await memo.destroy({
        where : {
            date : date
        }
    })
    if(results.affectedRows === 0){
        return res.status(404).json({ message: 'No memo with that date'});
    }
    return res.status(200).json({ message: `date ${date} successfully deleted`});
})

app.listen(1000, () => {
    console.log('Server is running at http://localhost:1000');
})