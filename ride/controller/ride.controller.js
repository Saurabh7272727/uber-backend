



const createRide = async (req, res) => {
    return res.status(200).json({ success: true, message: "create", status: "Yes", data: req.result });
}


export { createRide };