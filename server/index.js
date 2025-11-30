import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import bannedCompanyRoutes from "./routes/bannedcompany.js"; // Thêm dòng này

// data imports
import User from "./models/User.js";
import Company from "./models/Company.js";
import JobPosting from "./models/JobPosting.js";
import {
  dataUser,
  dataCompanies,
  dataJobPost,

  
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/bannedcompany", bannedCompanyRoutes); // ĐĂNG KÝ ROUTE MỚI

// app.use("/bannedcompany", bannedCompanyRoutes); // Thêm dòng này

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', true); // hoặc true tùy bạn
mongoose
  .connect(process.env.MONGO_URL, 
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
    // Company.insertMany(dataCompanies);
    // JobPosting.insertMany(dataJobPost);



    })
  .catch((error) => console.log(`${error} did not connect`));
