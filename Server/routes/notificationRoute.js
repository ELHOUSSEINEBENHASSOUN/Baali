const express = require('express');
const router = express.Router();

const { createNotification, getAllNotifications, getNotificationById, updateNotificationById, deleteNotificationById } = require('../controllers/notificationController');

//routes
router.post('/addNotif', createNotification);
router.get('/getNotif/:id', getNotificationById);
router.get('/getNotif', getAllNotifications);
router.put('/upNotif/:id', updateNotificationById);
router.delete('/delNotif/:id', deleteNotificationById);


module.exports = router;