import Task from "../models/task.model.js"


export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user : req.user.id }).populate("user");
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal" })
    }
    
};

export const createTask = async (req, res) => {
    try {
        const { title, description,date,datefinal,region,status,comuna } = req.body
        const newTask = new Task({
            title,
            description,
            date,
            datefinal,
            region,
            comuna,
            status,
            user: req.user.id,
            
        })
        const savedTask = await newTask.save()
        res.json(savedTask);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal" })
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).json({ message: 'Caso no encontrado' })
        res.json(task)
    } catch (error) {
        return res.sendStatus(404).json({ message: 'Caso no encontrado' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: 'Caso no encontrado' })
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: 'Caso no encontrado' })
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!task) return res.status(404).json({ message: 'Caso no encontrado' })
        res.json(task) 
    } catch (error) {
        return res.status(404).json({ message: 'Caso no encontrado' })
    }
};
