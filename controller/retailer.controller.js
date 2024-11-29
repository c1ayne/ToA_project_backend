const db = require('../db');

class RetailerController {
    async createRetailer(req, res) {
        try {
            const {id, article, shop_name, price} = req.body;

            if (id == null || article == null || shop_name == null || price == null) {
                return res.status(400).json("Данные введены неправильно");
            }

            if (isNaN(id)) {
                return res.status(400).json("id не является целым числом");
            }

            if (isNaN(price)) {
                return res.status(400).json("price не является целым числом");
            }

            if (article.length > 100) {
                return res.status(400).json("Слишком длинный артикль");
            }

            if (shop_name.length > 50) {
                return res.status(400).json("Слишком длинное название");
            }

            const distributorResult = await db.query(
                'SELECT id FROM distributor WHERE article = $1',
                [article]
            );

            if (distributorResult.rows.length > 0) {
                const distributor_id = distributorResult.rows[0].id;

                const newRetailer = await db.query(
                    'INSERT INTO retailer (id, article, shop_name, price, distributor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [id, article, shop_name, price, distributor_id]
                );

                res.status(200).json(newRetailer.rows[0]);
            } else {
                console.log(`Дистрибьютор не найден по артикулу: ${article}`);
            }
            
        } catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }

    async getRetailers(req, res) {
        try {
            const retailers = await db.query(`SELECT * FROM retailer`);
            console.log(retailers.rows); //test
            res.status(200).json(retailers.rows);
        } catch (error) {
            console.error('Ошибка базы данных: ', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }

    async getOneRetailer(req, res) {
        try {
            const id = req.params.id;
            const retailer = await db.query(`SELECT * FROM retailer WHERE distributor_id = $1`, [id]);

            if(!retailer.rows){
                return res.status(404).json({ error: 'У данного товара нет продавцов' });
            }

            res.status(200).json(retailer.rows);
        } catch (error) {
            console.error('Ошибка базы данных: ', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
    async deleteRetailers(req, res) {
        try {
            await db.query(`DELETE FROM retailer`);
            res.json('Все товары удалены');
        } catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
}

module.exports = new RetailerController;