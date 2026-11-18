let express = require("express");
let cors = require("cors");
require("dotenv").config();

let app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Spotify Admin Backend Running");
});

const allowedOrigins = ["http://localhost:5174", "http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

const { connectDB } = require("./connection");
const { AdminLogin } = require("./API/AdminLogin");
const AdminAuth = require("./Auth/AdminAuth");
const { GetAdminDashboard } = require("./API/GetAdminDashboard");
const { GetAdminSongs } = require("./API/GetAdminSongs");
const { DeleteAdminSongs } = require("./API/DeleteAdminSongs");
const { UpdateAdminSongs } = require("./API/UpdateAdminSongs");
const { AddAdminSongs } = require("./API/AddAdminSongs");
const { GetAdminArtists } = require("./API/GetAdminArtists");
const { AddAdminArtists } = require("./API/AddAdminArtists");
const { UpdateAdminArtists } = require("./API/UpdateAdminArtists");
const { DeleteAdminArtists } = require("./API/DeleteAdminArtists");
const { GetAdminBrowseCategory } = require("./API/GetAdminBrowseCategory");
const { AddAdminBrowseCategory } = require("./API/AddAdminBrowseCategory");
const {
  UpdateAdminBrowseCategory,
} = require("./API/UpdateAdminBrowseCategory");
const {
  DeleteAdminBrowseCategory,
} = require("./API/DeleteAdminBrowseCategory");

const { GetAdminAds } = require("./API/GetAdminAds");
const { AddAdminAds } = require("./API/AddAdminAds");
const { UpdateAdminAds } = require("./API/UpdateAdminAds");
const { DeleteAdminAds } = require("./API/DeleteAdminAds");
const { GetAdminUsers } = require("./API/GetAdminUsers");
const { AddAdminUsers } = require("./API/AddAdminUsers");
const { UpdateAdminUsers } = require("./API/UpdateAdminUsers");
const { DeleteAdminUsers } = require("./API/DeleteAdminUsers");
const { GetAdminPlaylists } = require("./API/GetAdminPlaylists");
const { AdminChangePassword } = require("./API/AdminChangePassword");

let port = process.env.PORT || 8001;

connectDB();

app.post("/adminlogin", AdminLogin);
app.get("/dashboard", AdminAuth, GetAdminDashboard);

app.get("/adminsongs", AdminAuth, GetAdminSongs);
app.delete("/adminsongs/:id", AdminAuth, DeleteAdminSongs);
app.put("/adminsongs/:id", AdminAuth, UpdateAdminSongs);
app.post("/adminsongs", AdminAuth, AddAdminSongs);

app.get("/adminartists", AdminAuth, GetAdminArtists);
app.post("/adminartists", AdminAuth, AddAdminArtists);
app.put("/adminartists", AdminAuth, UpdateAdminArtists);
app.delete("/adminartists/:artist_id", AdminAuth, DeleteAdminArtists);

app.get("/adminbrowsecategory", AdminAuth, GetAdminBrowseCategory);
app.post("/adminbrowsecategory", AdminAuth, AddAdminBrowseCategory);
app.put("/adminbrowsecategory", AdminAuth, UpdateAdminBrowseCategory);
app.delete(
  "/adminbrowsecategory/:category_id",
  AdminAuth,
  DeleteAdminBrowseCategory,
);

app.get("/adminads", AdminAuth, GetAdminAds);
app.post("/adminads", AdminAuth, AddAdminAds);
app.put("/adminads", AdminAuth, UpdateAdminAds);
app.delete("/adminads/:ad_id", AdminAuth, DeleteAdminAds);

app.get("/adminusers", AdminAuth, GetAdminUsers);
app.post("/adminusers", AdminAuth, AddAdminUsers);
app.put("/adminusers", AdminAuth, UpdateAdminUsers);
app.delete("/adminusers/:user_id", AdminAuth, DeleteAdminUsers);

app.get("/adminplaylists", AdminAuth, GetAdminPlaylists);
app.put("/adminchangepassword", AdminAuth, AdminChangePassword);

app.listen(port, () => {
  console.log("Admin Server is running on port " + port);
});
