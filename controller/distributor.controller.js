const db = require('../db');

class DistributorController {
    async createDistributor(req, res) {
        try {
            const {id, article, code, title, category} = req.body;

            if (id == null || article == null || code == null || title == null || category == null) {
                return res.status(400).json("Данные введены неправильно");
            }

            if (article.length > 50) {
                return res.status(400).json("Слишком длинный артикль");
            }

            if (title.length > 200) {
                return res.status(400).json("Слишком длинное название");
            }

            if (category.length > 50) {
                return res.status(400).json("Слишком длинная категория");
            }

            const newDistributor = await db.query(`INSERT INTO distributor (id, article, code, title, category) values ($1, $2, $3, $4, $5) RETURNING *`,
                [id, article, code, title, category]);
            
            res.status(200).json(newDistributor.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }

    async getDistributors(req, res) {
        try {
            const distributors = await db.query(`SELECT * FROM distributor`);
            res.status(200).json(distributors.rows);
        } catch (error) {
            console.error('Ошибка базы данных: ', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
    async getOneDistributor(req, res) {
        try {
            const id = req.params.id;
            const distributor = await db.query(`SELECT * FROM distributor where id = $1`, [id]);
            console.log(distributor);

            if (!distributor.rows[0]) {
                return res.status(404).json({ error: 'Товар не найден' });
            }

            res.status(200).json(distributor.rows[0]);
        } catch (error) {
            console.error('Ошибка базы данных: ', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
    async updateDistributor(req, res) {
        try {
            const {id, price} = req.body;

            if (Object.keys(req.body).length > 2){
                return res.status(400).json({ error: 'Вы ввели лишние данные' });
            }

            if (!id || !price) {
                return res.status(400).json({ error: 'Вы не ввели id или price' });
            }

            if (isNaN(id) || isNaN(price)) {
                return res.status(400).json({ error: 'Данные введены в неправильном формате' });
            }

            const idCheck = await db.query(`SELECT id FROM distributor where id = $1`, [id]);
            if (!idCheck.rows[0]) {
                return res.status(404).json({ error: 'Товар не найден' });
            }

            const distributor = await db.query(`UPDATE distributor set price = $1 where id = $2 RETURNING *`, [price, id]);
            res.status(200).json(distributor.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
        
    }
    async deleteOneDistributor(req, res) {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ error: 'Вы не ввели id' });
        }

        try {
            const idCheck = await db.query(`SELECT id FROM distributor where id = $1`, [id]);

            if (!idCheck.rows[0]) {
                return res.status(404).json({ error: 'Товар не найден' });
            }
    
            await db.query(`DELETE FROM distributor where id = $1`, [id]);
            res.json('Товар удален');
        } catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
    async deleteDistributors(req, res) {
        try {
            await db.query(`DELETE FROM distributor`);
            res.json('Все товары удалены');
        } catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
}

module.exports = new DistributorController;