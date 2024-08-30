const cron = require('node-cron');
const User = require('../models/User');

cron.schedule('*/2 * * * *', async () => {
    const twoMinutesAgo = new Date();
    twoMinutesAgo.setTime(twoMinutesAgo.getTime() - 2 * 60 * 1000); // Subtract 2 minutes

    try {
        const users = await User.find({
            'paymentDates.date': { $lte: twoMinutesAgo }
        });

        for (const user of users) {
            // Remove expired enrollments
            await User.updateMany(
                { _id: user._id },
                { $pull: { mentors: { $in: user.paymentDates.map(pd => pd.premiumId) } } }
            );

            // Remove the payment date entry
            await User.updateMany(
                { _id: user._id },
                { $pull: { paymentDates: { date: { $lte: twoMinutesAgo } } } }
            );
        }
        console.log('Expired enrollments and payment dates cleaned up.');
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
});
