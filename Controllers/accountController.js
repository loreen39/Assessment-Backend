const accountModel = require('../Models/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Login , authentication using jwt
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const account = await accountModel.findOne({ username });
    if (account && (await bcrypt.compare(password, account.password))) {
            const user = await accountModel.findOne({username});

        const accessToken = jwt.sign({
            // Payload
            user: {
                username: user.username,
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });

        return res.status(200).json({ accessToken });
    } else {
        return res.status(401).json({ error: "Invalid credentials" });
    }
}

const logout = async (req, res) => {
    // Clear any authentication-related cookies or session information
    res.clearCookie('refreshToken');

    // Redirect the user back to the login page
    return res.redirect('/loginPage');
};

module.exports = {
    loginUser,
    logout
}