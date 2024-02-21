class CartRequestDAO {

    constructor(client) {
        this.client = client;
    }

    async save(cartRequest) {
        const { cart_id, request_id } = cartRequest;
        try {
            const results = await this.client.query(
                `INSERT INTO cart_request (cart_id, request_id) VALUES ($1, $2) RETURNING *`,
                [cart_id, request_id]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findAll() {
        try {
            const results = await this.client.query("SELECT * FROM cart_request");
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findByCartId(cartId) {
        try {
            const results = await this.client.query(`SELECT * FROM cart_request WHERE cart_id = $1`, [cartId]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }

    async findByRequestId(cartId) {
        try {
            const results = await this.client.query(`SELECT * FROM cart_request WHERE request_id = $1`, [cartId]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }

    async findByRequestIdCartId(cart_id, request_id) {
        try {
            const results = await this.client.query(`SELECT * FROM cart_request WHERE request_id = $1 AND cart_id = $2`, [cart_id, request_id]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }    

    async updateOne(cartRequest) {
        try {
            const results = await this.client.query(
                "UPDATE cart_request SET cart_id = $1, request_id = $2 WHERE id = $3 RETURNING *",
                [cartRequest.cart_id, cartRequest.request_id, cartRequest.id]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async deleteByRequestIdCartId(cart_id, request_id) {
        try {
            const results = await this.client.query(`DELETE FROM cart_request WHERE request_id = $1 AND cart_id = $2`, [cart_id, request_id]);
            return results.rows; 
        } catch(err){
            console.error(err);
            throw err;
        }
    }
    
  }
   
  module.exports = (client) => new CartRequestDAO(client);