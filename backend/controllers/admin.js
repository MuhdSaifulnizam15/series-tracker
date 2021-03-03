const Series = require('../models/Series');

exports.getIndex = async (req, res) => {
    const series = await Series.find((data) => data);

    try {
        console.log(series);
        res.status(200).render('index', { series: series });
    } catch (error){
        console.log(error);
    }
};

exports.getSeries = async (req, res) => {
    const seriesId = req.params.seriesId;

    const series = await Series.findById(seriesId, (series) => series);

    try{
        console.log(series);
        res.status(200).render('series', { series: series });
    } catch (error) {
        console.log(error);
    }
};

exports.getAddSeries = (req, res) => {
    res.status(200).render('edit-series');
};

exports.getEditseries = async (req, res) => {
    const seriesId = req.params.seriesId;

    const editMode = req.query.edit;

    if(!editMode){
        return res.redirect('/');
    }

    const series = await Series.findById(seriesId);

    try {
        if(!seriesId) {
            return res.redirect('/');
        }
        console.log(series);
        res.status(200).render('edit-series', { series: series, editing: editMode });
    } catch (error) {
        console.log(error);
    }
};

exports.postSeries = (req, res) => {
    const { name, image, description } = req.body;

    const series = new Series({
        name: name,
        image: image,
        description: description
    });
    series.save();
    console.log('Series added to the database');
    res.status(201).redirect('/');
};

exports.postEditSeries = (req, res) => {
    const seriesId = req.body.seriesId;
    const { name, image, description } = req.body;

    Series.findById(seriesId)
        .then((series) => {
            series.name = name;
            series.image = image;
            series.description = description;

            return series.save();
        })
        .then(() => {
            console.log('Item Updated');
            res.status(201).redirect('/');
        })
        .catch((err) => {
            console.lof(err);
        });
};

exports.postDelete = async (req, res) => {
    const seriesId = req.body.seriesId;

    const series = await Series.findByIdAndRemove(seriesId, (data) => data);

    try {
        console.log(series);
        console.log('Item Deleted');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};