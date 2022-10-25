const errorHandler = (res) => {
    return res.status(500).json({
        success: false,
        message: "Something went wrong"
    })
}

const ControllerAuth = {
    userLogin: async (req, res) => {
        try {
            return res.status(200).json({
                success: true,
                data: 'Login successful',
            })
        } catch (error) {
            error.log(error.message)
            return errorHandler(res)
        }
    }
}

module.exports = ControllerAuth