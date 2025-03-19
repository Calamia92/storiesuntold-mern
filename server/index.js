require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await connectDB();
        console.log('✅ MongoDB connected');
        app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
    } catch (err) {
        console.error('❌ DB connection error:', err);
        process.exit(1);
    }
})();
