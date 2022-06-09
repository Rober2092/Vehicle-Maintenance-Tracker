const { User, Maintenance, Cost } = require('../../models');
const moment = require('moment');

const router = require('express').Router();

router.get('/', (req, res) => {
    Maintenance.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
        .then(dbMaintenanceData => {
            if (!dbMaintenanceData) {
                res.status(404).json({ message: 'Data not found' });
                return;
            }
            res.json(dbMaintenanceData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // Expects id, date, mileage, user_id
    Maintenance.destroy({ truncate: true })
    .then(
    Maintenance.create({
        mileage: req.body.mileage,
        maintenance_type: req.body.maintenance_type,
        user_id: req.session.user_id
    })
        .then(dbMaintenanceData => res.json(dbMaintenanceData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    );
});

router.put('/:id', (req, res) => {
    // Expects date, mileage, type
    Maintenance.update(
        {
            date: req.body.date,
            mileage: req.body.mileage,
            maintenance_type: req.body.maintenance_type
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbMaintenanceData => {
            if (!dbMaintenanceData) {
                res.status(404).json({ message: 'No maintenance type found with this id' })
                return;
            }
            res.json(dbMaintenanceData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/delete', (req, res) => {
    Maintenance.destroy({
        where: {
            mileage: req.body.mileage
        }
    })
    .then(dbMaintenanceData => {
        if(!dbMaintenanceData){
            res.status(404).json({ message: 'No maintenance data found' });
            return;
        }
        res.json(dbMaintenanceData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;