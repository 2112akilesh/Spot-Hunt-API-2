const mongoose = require('mongoose');

//-----------------------Creating schema---------------------------
const GetScheme = mongoose.Schema({
    Photo_DNA: String,
    size: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    pixel: {
        width: Number,
        height: Number
    },
    EXIF_data: {
        ISO: Number,
        Focus: Number,
        lens: String,
        apature: String,
        Flash: Boolean
    },
    App_Name: String
});

//Exporting schema (imported in router folder)
module.exports = mongoose.model('Get', GetScheme);