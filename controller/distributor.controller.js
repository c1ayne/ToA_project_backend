const db = require('../db');

class DistributorController {
    async createDistributor(req, res) {
        try {
            const {article, code, title, category, price} = req.body;

            if (article == null || code == null || title == null || category == null || price == null) {
                return res.status(400).json("Данные введены неправильно");
            }

            if (isNaN(price)) {
                return res.status(400).json("price не является целым числом");
            }

            if (article.length > 100) {
                return res.status(400).json("Слишком длинный артикль");
            }

            if (title.length > 270) {
                return res.status(400).json("Слишком длинное название");
            }

            if (category.length > 100) {
                return res.status(400).json("Слишком длинная категория");
            }

            const newDistributor = await db.query(`INSERT INTO distributor (article, code, title, category, price) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [article, code, title, category, price]
            );
            
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
            console.log(distributor.rows[0]);

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
            const article = req.body.article;
            let price = req.body.price;

            price = Number(price);


            if (isNaN(price)) {
                return res.status(400).json("price не является целым числом");
            }

            // const idCheck = await db.query(`SELECT id FROM distributor where article = $1`, [article]);
            // if (!idCheck.rows[0]) {
            //     return res.status(404).json({ error: 'Товар не найден', article: article, price: price });
            // }

            const distributor = await db.query(`UPDATE distributor set price = $1 where article = $2 RETURNING *`, [price, article]);
            // res.status(200).json({article: article, price: price});
            res.status(200).json(distributor.rows[0]);
        } catch (error) {
            res.status(500).json({ error: '[upd]Внутренняя ошибка сервера' });
        }
    }
    // async updateDistributor(req, res) {
    //     try {
    //         const article = req.body.article;
    //         let price = req.body.price;
    
    //         // Преобразуем price в число
    //         price = Number(price);
            
    //         // Проверяем, что price число
    //         if (isNaN(price)) {
    //             return res.status(400).json("price не является числом");
    //         }
    
    //         // Проверяем, что price целое число
    //         if (!Number.isInteger(price)) {
    //             return res.status(400).json("price не является целым числом");
    //         }
    
    //         // Обновляем данные в базе данных
    //         const distributor = await db.query(
    //             `UPDATE distributor SET price = $1 WHERE article = $2 RETURNING *`,
    //             [price, article]
    //         );
    
    //         // Проверяем, была ли запись обновлена
    //         if (distributor.rows.length === 0) {
    //             return res.status(404).json({ error: 'Товар не найден', article: article, price: price });
    //         }
    
    //         // Возвращаем обновленную запись
    //         res.status(200).json(distributor.rows[0]);
    //     } catch (error) {
    //         res.status(500).json({ error: '[upd] Внутренняя ошибка сервера' });
    //     }
    // }
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
    async checkArticle(req, res) {
        try {
            const article = req.body.article;
            const articleCheck = await db.query(`SELECT id FROM distributor WHERE article = $1`, [article]);
            if(!articleCheck.rows[0]) {
                return res.status(200).json({ flag: false })
            }
            return res.status(200).json({ flag: true })
        } catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
}

module.exports = new DistributorController;