const express = require('express');
const distributorRouter = require('./routes/distributor.routes.js');
const retailerRouter = require('./routes/retailer.routes.js');
const profitabilityRouter = require('./routes/profitability.routes.js');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use('/api', distributorRouter);
app.use('/api', retailerRouter);
app.use('/api', profitabilityRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));