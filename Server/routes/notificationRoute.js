const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/authMiddleware');

const { createNotification, getAllNotifications, getNotificationById, updateNotificationById, deleteNotificationById } = require('../controllers/notificationController');
const {  authorizeNotificationAccess, isAdmin } = require('../middleware/notificationMiddleware');


//routes
router.post('/addNotif', authenticate, isAdmin, createNotification);
router.get('/getNotif/:id',authenticate, getNotificationById);
router.get('/getNotif', authenticate,getAllNotifications);
router.put('/upNotif/:id', authenticate, isAdmin, updateNotificationById);
router.delete('/delNotif/:id', authenticate, isAdmin, deleteNotificationById);


module.exports = router;