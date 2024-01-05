
const { Notification, notificationValidationSchema } = require('../models/notificationModel');

// creer une notif
const createNotification = async (req, res) => {
    try {
        // valider les donnees 
        const { error } = notificationValidationSchema.validate(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });
        //enregistrer la notif
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).json({ message: 'Notification created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// recupere ttes les notifs

// const getAllNotifications = async (req, res) => {
//     try {
//         //pagination
//         //validation des parametresde pagination
//         //limit= pageSize
//         const pageSize = parseInt(req.query.pagesize) || 3;
//         if (pageSize <= 0) {
//         return res.status(400).json({error: 'Invalid page size'});
//     }
//         const currentPage = parseInt(req.query.page) || 2;
//         if (currentPage <= 0) {
//         return res.status(400).json({error: 'Invalid page number'});
//     }
//     // application de la pagination
//         const skipNumber = (currentPage - 1) * pageSize;
//         const notifications = await Notification.find({}).skip(skipNumber).limit(pageSize);
//         res.status(200).json({ results: notifications.length,
//             //currentPage,=
//             pages: Math.ceil(await Notification.countDocuments() / pageSize),
//             data: notifications
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({});
        res.status(200).json({ results: notifications.length,
            data: notifications
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// recupere une notif
const getNotificationById = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ error: 'notification not found' });
        }
        res.status(200).send(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// mettre a jour une notif par id

const updateNotificationById = async (req, res) => {
    const { id } = req.params;

    try {
        const { error, value } = notificationValidationSchema.validate(req.body);
        if (error) {
            return res.status(404).json({ error: error.details[0].message });
        }
        const upNotification = await Notification.findByIdAndUpdate(id, value, { new: true });
        if (!upNotification) {
            return res.status(404).json({ error: 'notification not found' });
        }
        res.status(200).json({ message: 'Notification created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// supprimer une notif par id

const deleteNotificationById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNotification = await Notification.findByIdAndDelete(id);
        if (!deletedNotification) {
            return res.status(404).json({ error: 'notification not found' });
        }
        res.status(200).json({message: 'Notifiaction deleted successefully'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotificationById,
    deleteNotificationById
};