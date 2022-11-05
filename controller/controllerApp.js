const { ZingMp3 } = require('zingmp3-api-full');

const handleError = (res) => {
    return res.status(500).json({
        success: false,
        message: 'Something went wrong'
    })
}

const ControllerApp = {
    getHome: (req, res) => {
        try {
            if(req.session.passport.user) {
                return ZingMp3.getHome()
                .then(data => {
                    return res.status(200).json({
                        success: true,
                        data: data
                    });
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    getPlaylist: (req, res) => {
        try {
            if (req.session.passport.user) {
                return ZingMp3.getDetailPlaylist(req.query.id).then((data) => {
                    res.status(200).json({
                        success: true,
                        data: data
                    })
                })
            } else {
                return handleError(res)
            }

        } catch (error) {
            return handleError(res)
        }
    },
    getSong: (req, res) => {
        try {
            if (req.session.passport.user) {
                return ZingMp3.getSong(req.query.id).then((data) => {
                    res.status(200).json({
                        success: true,
                        data: data
                    })
                })
            } else {
                return handleError(res)
            }

        } catch (error) {
            return handleError(res)
        }
    },
    search: (req, res) => {
        try {
            if (req.session.passport.user) {
                return ZingMp3.search(req.query.keyword).then((data) => {
                    res.status(200).json({
                        success: true,
                        data: data
                    })
                })
            } else {
                return handleError(res)
            }
        } catch (error) {
            return handleError(res)
        }
    },
    getPlaylist: (req, res) => {
        try {
            ZingMp3.getDetailPlaylist(req.query.id).then((data) => {
                return res.status(200).json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            handleError(res)
        }
    }
}

module.exports = ControllerApp

// getSong(req, res) {
//     return ZingMp3.getSong(req.query.id).then((data) => {
//         res.json(data)
//     })
// }

// getDetailPlaylist(req, res) {
//     ZingMp3.getDetailPlaylist(req.query.id).then((data) => {
//         res.json(data)
//     })
// }

// getHome = async (req, res) => {
//     const data = await ZingMp3.getHome();
//     return res.status(200).json(data);
// }

// getTop100(req, res) {
//     ZingMp3.getTop100().then((data) => {
//         res.json(data);
//     })
// }

// getChartHome(req, res) {
//     ZingMp3.getChartHome().then((data) => {
//         res.json(data);
//     })
// }

// getNewReleaseChart(req, res) {
//     ZingMp3.getNewReleaseChart().then((data) => {
//         res.json(data)
//     })
// }

// getInfo(req, res) {
//     ZingMp3.getInfoSong(req.query.id).then((data) => {
//         res.json(data);
//     })
// }

// getArtist(req, res) {
//     ZingMp3.getArtist(req.query.name).then((data) => {
//         res.json(data)
//     })
// }

// getArtistSong(req, res) {
//     ZingMp3.getListArtistSong(req.query.id, req.query.page, req.query.count).then((data) => {
//         res.json(data)
//     })
// }

// getLyric(req, res) {
//     ZingMp3.getLyric(req.query.id).then((data) => {
//         res.json(data)
//     })
// }

// search(req, res) {
//     ZingMp3.search(req.query.keyword).then((data) => {
//         res.json(data)
//     })
// }

// getListMV(req, res) {
//     ZingMp3.getListMV(req.query.id, req.query.page, req.query.count).then((data) => {
//         res.json(data)
//     })
// }

// getCategoryMV(req, res) {
//     ZingMp3.getCategoryMV(req.query.id).then((data) => {
//         res.json(data)
//     })
// }

// getVideo(req, res) {
//     ZingMp3.getVideo(req.query.id).then((data) => {
//         res.json(data)
//     })
// }