const mongoose = require("mongoose");

const connectDB = async () => {
try {
await mongoose.connect(process.env.MONGO_URL);

```
console.log("✅ MongoDB Connected");
return true;
```

} catch (error) {
console.error("❌ MongoDB Connection Error:", error.message);
return false;
}
};

module.exports = connectDB;
