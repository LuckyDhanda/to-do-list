const express = require ('express');
const app = express();
const db = require('./config/mongoose');
const Todo = require('./models/todoSchema');

const Port = 3000;

const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));

app.get('/', async(req, res)=>{
    try{
        // fetch the to do list from database and render it
        const todoList = await Todo.find({});
        return res.render('todo', {title: "TODO App", todoList: todoList});
    }catch(err){
        console.log("Error in fetching contacts:" + err);
        return res.redirect('/');
    }
})

app.post('/add-task', async(req, res)=>{
    
    try {
        // Destructure the task details from req.body
        const { description, category, date } = req.body;

        // Create a new task instance
        const newTask = new Todo({
            description,
            category,
            date
        });

        // Save the new task to the database
        await newTask.save();

        // Redirect to the homepage after adding the task
        return res.redirect('/');
    }catch(err){
        console.log("Error occured while adding a new task: " + err);
        return res.redirect('/');
    }
})


app.get('/delete/', async function(req, res){
    // console.log(req.query);
    try{
        let id = req.query.id;
        await Todo.findByIdAndDelete(id);
        return res.redirect('/');
    }catch (err) {
        console.log('Error in deleting contact:', err);
        return res.redirect('back');
    }
})


app.post('/delete-task',async function(req,res){
    try{
        const task=req.body.task;
        for( let i of task){
            await list_schema.findByIdAndDelete({_id:i});
        }
        return res.redirect('back');
    }
    catch(error){
        console.log(error);
    }
})

app.post('/delete-multiple', async (req, res) => {
    try {
        await Todo.deleteMany({ _id: { $in: req.body.ids } });

        console.log('Tasks deleted successfully:', req.body);
        return res.status(200).send({msg: 'Tasks deleted successfully.'});
    } catch (err) {
        console.log('Error in deleting multiple tasks:', err);
        return res.status(500).send('Error in deleting tasks.');
    }
});

app.listen(Port, function(err){
    if(err){
        console.log("Error occured while running the port " + Port);
    }else{
        console.log("Server is Successfully Running, and App is listening on port "+ Port)
    }
})