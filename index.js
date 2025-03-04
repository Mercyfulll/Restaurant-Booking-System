import express from "express";
import pgPromise from "pg-promise";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import flash from "flash-express";
import restaurant from "./services/restaurant.js";

const app = express()
const pgp = pgPromise()


var connectionString = process.env.DATABASE_URL || 'postgres://zuovmndx:KGDKBX7JCdk5zlRNdEbihBOrRGmZFTj5@tai.db.elephantsql.com/zuovmndx?ssl=true'

const db = pgp(connectionString);
const rest = restaurant(db)

app.use(express.static('public'));
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.get("/", async (req, res) => {
    
    res.render('index', { tables : rest.getTables})
});

app.post("/book", async (req, res) =>{
    let number = req.body.booking_size
    let name = req.body.username
    let contact = req.body.phone_number
    let details = {
        username: name,
        phoneNumber:contact,
        seats:number
    }
    
    res.render("index",rest.bookTable(details))
})
app.get("/bookings", async (req, res) => {
    res.render('bookings', { tables : [{}, {}, {}, {}, {}, {}]})
});


var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('🚀  server listening on:', portNumber);
});