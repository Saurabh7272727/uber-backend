import axios from 'axios';



const Authorization = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "UnAuthorized person for ride (toke)", status: "No" });
    }

    const URL_USER_PROFILE = "http://localhost:3000/users/profile";
    try {

        const response = await axios.get(URL_USER_PROFILE, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        req.result = response.data;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ success: false, message: "UnAuthorized person for ride (catch)", status: "No" });
    }
}


export default Authorization;