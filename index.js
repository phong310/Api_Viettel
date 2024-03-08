const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const dotenv = require('dotenv')
const DataNetwork = require('./router/Data')
const ComboData = require('./router/ComboData')
const DataSieuToc = require('./router/SieuTocData')
const DataOffer = require('./router/DataOffer')
const Users = require('./router/Users')
const Auth = require('./router/Auth')

dotenv.config()
const app = express()


app.use(cookieParser())
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 5000;

// CONNECT DATABASE
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('CONNECT TO MONGO DB');
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });

app.listen(PORT, () => {
    console.log("Server is running !")
})


// ROUTER
app.use("/data-network", DataNetwork)

app.use("/data-combo", ComboData)

app.use('/data-sieu-toc', DataSieuToc)

app.use('/data-offer', DataOffer)

app.use('/user-account', Users)

app.use('/auth', Auth)
