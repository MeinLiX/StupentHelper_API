export function TException(req, res, err) {
    res.status(500).json({
        success: false,
        error: {
            message: err.message
        }
    });
}

export function TNotFoundModel(req, res, name = "Model") {
    res.status(200).json({
        success: false,
        message: `${name} not found.`
    });
}

export function TNotNullAndEmpty(req, res, value = "", name = "Model") {
    if (!value || value == "") {
        res.status(200).json({
            success: false,
            error: {
                message: `The ${name} field can not be empty.`
            }
        });
        return true;
    }
    return false;
}