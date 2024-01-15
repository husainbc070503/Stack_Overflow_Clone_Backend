const ErrorHandler = async (err, req, res, next) => {
    const status = err.status || 400;
    const message = err.message || 'Backend error. Please try again later';
    return res.status(status).json({ success: false, message });
}

export default ErrorHandler;