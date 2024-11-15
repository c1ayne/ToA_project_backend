const express = require('express');
const distributorRouter = require('./routes/distributor.routes.js');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use('/api', distributorRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));