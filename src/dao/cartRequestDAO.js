class CartRequestDAO {

    constructor(client) {
        this.client = client;
    }

    async save(cartRequest) {
        const { cartId, requestId } = cartRequest;
        try {
            const results = await this.client.query(
                `INSERT INTO cartRequest (cart_id, request_id) VALUES ($1, $2) RETURNING *`,
                [cartId, requestId]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findAll() {
        try {
            const results = await this.client.query("SELECT * FROM cartRequest");
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findByCartId(cartId) {
        try {
            const results = await this.client.query(`SELECT * FROM cartRequest WHERE cart_id = $1`, [cartId]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }

    async findByRequestId(cartId) {
        try {
            const results = await this.client.query(`SELECT * FROM cartRequest WHERE request_id = $1`, [cartId]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }

    async findByRequestIdCartId(requestId, cartId) {
        try {
            const results = await this.client.query(`SELECT * FROM cartRequest WHERE request_id = $1 AND cart_id = $2`, [requestId, cartId]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }    

    async updateOne(cartRequest) {
        try {
            const results = await this.client.query(
                "UPDATE cartRequest SET cart_id = $1, request_id = $2, WHERE id = $3 RETURNING *",
                [cartRequest.cartId, cartRequest.requestId, cartRequest.id]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async deleteByRequestIdCartId(requestId, cartId) {
        try {
            const results = await this.client.query(`DELETE FROM cartRequest WHERE request_id = $1 AND cart_id = $2`, [requestId, cartId]);
            return results.rows; 
        } catch(err){
            console.error(err);
            throw err;
        }
    }
    
  }
   
  module.exports = (client) => new CartRequestDAO(client);