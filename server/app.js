var express = require("express"),
  exphbs  = require("express3-handlebars"),
  helpers = require("./src/helper"),
  app = express(),
  dashboardroutes = require("./routes/dashboard_routes"),
  featureroutes = require("./routes/feature_routes"),
  path = require("path");

app.set('views', __dirname + '/../client/views');
app.set("view engine", "jade");

app.set("port", process.env.PORT || 3006);

app.use(express.cookieParser("featuretoggle"));
app.use(express.session());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(express.favicon());
app.use(express.logger("dev"));
app.use(app.router);

app.use(express.static(path.join(__dirname, "/../client")));

app.get("/", dashboardroutes.dashboard);
app.get('/partials/:name', dashboardroutes.partials);
app.get("/features", featureroutes.getAll);

console.log("Starting up feature toggle dashboard on port " + app.get('port'));

app.listen(app.get("port"));
