export function TException(req, res, err) {
    res.status(500).json({
        success: false,
        error: {
            message: err.message
        }
    });
}

export function TNotFoundModel(req, res, name="Model") {
    res.status(200).json({
        success: false,
        message: `${name} not found.`
    });
}