class CartDAO {

    constructor(client) {
        this.client = client;
    }

    async save(cart) {
        const { user, createdAt } = cart;
        try {
            const results = await this.client.query(
                `INSERT INTO cart (user, createdAt) VALUES ($1, $2) RETURNING *`,
                [user, createdAt]
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
                "UPDATE cart SET user = $1, createdAt = $2, WHERE id = $3 RETURNING *",
                [cart.user, cart.createdAt, cart.id]
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