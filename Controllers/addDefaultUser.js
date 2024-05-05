const accountModel = require('../Models/Account');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
    try {
        // Check if any user exists
        const existingUser = await accountModel.findOne();

        if (!existingUser) {
            const salt = await bcrypt.genSaltSync(10);
            const password = "defaultUser@123";
            const hashedPassword = await bcrypt.hash(password, salt);
            const userAccount = await accountModel.create({
                username: "Default User",
                password: hashedPassword
            });

            if (userAccount) {
                console.log("User Added successfully!");
            }
        } else {
            console.log("User already exists in the database.");
        }
    } catch (error) {
        console.error("Error while adding default user:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { addUser };
