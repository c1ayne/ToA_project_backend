const db = require('../db');
const axios = require('axios');

async function getRetailers(id) {
    try {
        const response = await axios.get(`http://localhost:8080/api/retailer/${id}`);
        console.log('Данные успешно получены:', response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error.response ? error.response.data : error.message);
    }
}
async function getDistributorPrice(id) {
    try {
        const response = await axios.get(`http://localhost:8080/api/distributor/${id}`);
        console.log('Данные успешно получены:', response.data.price);
        return response.data.price;
    } catch (error) {
        console.error('Ошибка при получении данных:', error.response ? error.response.data : error.message);
    }
}

function calculatePercentageIncrease(num1, num2) {
    if (num2 === 0) {
        return "Невозможно вычислить процентное увеличение от 0";
    }
    const difference = num1 - num2;
    const percentageIncrease = (difference / num2) * 100;
    return parseFloat(percentageIncrease.toFixed(2));
}

class ProfitabilityController {
    async getProfitability(req, res) {
        try {
            const id = req.params.id;
            const retailer = await getRetailers(id);
            const price = await getDistributorPrice(id);

            if(!retailer){
                return res.status(404).json({ error: 'У данного товара нет продавцов' });
            }
            if(!price){
                return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
            }

            const minPrice = Math.min(...retailer.map(item => item.price));

            const diff = calculatePercentageIncrease(minPrice, price);

            const profit = (diff > 5);

            res.status(200).json({
                profit: profit,
                difference: diff
            });
        } catch (error) {
            console.error('Ошибка базы данных: ', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
}

module.exports = new ProfitabilityController;