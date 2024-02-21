class RequestDAO {

    constructor(client) {
        this.client = client;
    }

    async save(request) {
        const { quantity, product_id } = request;
        try {
            const results = await this.client.query(
                `INSERT INTO request (quantity, productId) VALUES ($1, $2) RETURNING *`,
                [quantity, product_id]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findAll() {
        try {
            const results = await this.client.query("SELECT * FROM request");
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findOne(id) {
        try {
            const results = await this.client.query(`SELECT * FROM request WHERE id = $1`, [id]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
    
    async updateOne(request) {
        try {
            const results = await this.client.query(
                "UPDATE request SET quantity = $1, productId = $2, WHERE id = $3 RETURNING *",
                [request.quantity, request.product_id, request.id]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async deleteOne(id) {
        try {
            const results = await this.client.query("DELETE FROM request WHERE id = $1 RETURNING *", [id]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
  }
   
  module.exports = (client) => new RequestDAO(client);