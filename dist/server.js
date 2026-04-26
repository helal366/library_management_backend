"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const mongoDB_1 = require("./configs/mongoDB");
let server;
const PORT = process.env.PORT || 5000;
async function main() {
    try {
        await mongoose_1.default.connect(mongoDB_1.MONGODB_ALTAS_URI);
        console.log("Connected to mongodb using mongoose");
        server = app_1.app.listen(PORT, () => {
            console.log(`App is listening the port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
//# sourceMappingURL=server.js.map