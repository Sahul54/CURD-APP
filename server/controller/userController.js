import User from "../model/userModel.js"; // Ensure the file path is correct and includes the .js extension

// User data create
export const create = async (req, res) => {
    try {
        const userData = new User(req.body);

        if (!userData) {
            return res.status(404).json({ 
                msg: "User data is not found!" 
            });
        }

        const savedData = await userData.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({ 
            error: error.message || "Internal Server Error" 
        });
    }
};

// User data getAll 
export const getAll = async(req, res) => {
    try{
        const userData = await User.find();
        if(!userData){
            return res.status(404).json({ 
                msg: "User data is not found!" 
            });
        }
        res.status(200).json(userData);
    }
    catch(error){
        res.status(500).json({ 
            error: error.message || "Internal Server Error" 
        });
    }
};


export const getOne = async (req, res) => {
    try {
        const id = req.params.id;

        // Use findById to fetch the user by _id
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        // Respond with the found user
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({
            error: error.message || "Internal Server Error"
        });
    }
};


export const update = async(req, res) =>{
    try{
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({
                msg: "User not found"
            })
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedData)
    }
    catch(error){
        res.status(500).json({
            error: error.message || "Internal Server Error"
        }); 
    }
}


export const deleteUser = async(req, res) => {
    try{
        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            res.status(404).json({
                msg: "User not found"
            })
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({
            msg: "User deleted sucessfully"
        })

    }
    catch(error){
        res.status(500).json({
            error : error.message || "Internal Server Error"
        })
    }
}