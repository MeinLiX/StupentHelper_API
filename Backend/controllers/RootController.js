export async function Pong(req, res) {
    res.status(200).json({
        message: 'pong!'
    });
}

export async function CheckAuthenticated(req, res) {
    if (req.isAuthenticated()) {
        res.status(200).json({
            isAuthenticated: true
        });
    } else {
        res.status(200).json({
            isAuthenticated: false
        });
    }
}