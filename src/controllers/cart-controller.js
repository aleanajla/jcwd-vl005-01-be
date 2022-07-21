const path = require('path');
const db = require("../config").promise();

module.exports = {
    getCartProduct: async(req,res) => {
        try {
            const q = `select * from cart c join product p on p.id = c.product_id`;
    
            const [product] = await db.execute(q);
    
            res.status(200).send(product);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("internal service error");
        }
    },
    deleteCartProduct: async(req,res) => {
        const id = req.params.id;

        try {
            const q = `delete from cart where id=?`
            const [product] = await db.execute(q, [id]);

            res.status(200).send('Sucessfully Deleted!')
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal service error");
        }
    },
    addCartProduct: async(req,res) => {
        let {user_id,product_id,qty} = req.body;
        
        try {
            
            if(product_id){
                const q = `select * from cart where product_id = ?`
                const [product] = await db.execute(q,[product_id]);

                if(product.length) {
                    const qUpdate = `update from cart set qty = ?`
                    await db.execute(qUpdate, [qty]);
                    res.status(200).send("Data Succesfully Updated")
                }
            }
            
            const qInsert = `insert into cart(user_id,product_id,qty) values(?,?,?)`;
            await db.execute(qInsert, [user_id,product_id,qty]);
            res.status(200).send(product);

        } catch (error) {
            console.log(error.message);
            res.status(500).send("internal service error");
        }

    },
    updateCartProduct: async(req,res) => {
        let {user_id,product_id,qty} = req.body;
        

        try {
            const q = `update cart set qty = ? where product_id = ? AND user_id=?`;
            await db.execute(q, [qty, product_id, user_id]);
    
            res.status(200).send("Successfully Updated!");
        } catch (error) {
            console.log(error.message);
            res.status(500).send("internal service error");
        }
    },
    getSumCartProduct: async(req,res) => {
        try {
            const q = `SELECT SUM(p.price) FROM cart c JOIN product p ON p.id = c.product_id`;
            const [sum] = await db.execute(q);
    
            res.status(200).send(sum);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("internal service error");
        }
    }
}