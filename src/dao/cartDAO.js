class CartDAO {

    constructor(client) {
        this.client = client;
    }

    async save(cart) {
        const { users_id, createdAt } = cart;
        try {
            const results = await this.client.query(
                `INSERT INTO cart (users_id, createdAt) VALUES ($1, $2) RETURNING *`,
                [users_id, createdAt]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findAll() {
        try {
            const results = await this.client.query("SELECT * FROM cart");
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findOne(id) {
        try {
            const results = await this.client.query(`SELECT * FROM cart WHERE id = $1`, [id]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
    
    async updateOne(cart) {
        try {
            const results = await this.client.query(
                "UPDATE cart SET user_id = $1, createdAt = $2, WHERE id = $3 RETURNING *",
                [cart.user_id, cart.createdAt, cart.id]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async deleteOne(id) {
        try {
            const results = await this.client.query("DELETE FROM cart WHERE id = $1 RETURNING *", [id]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
  }
   
  module.exports = (client) => new CartDAO(client);