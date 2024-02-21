class ProductDAO {

    constructor(client) {
        this.client = client;
    }

    async save(product) {
        const { name, price } = product;
        try {
            const results = await this.client.query(
                `INSERT INTO product (name, price) VALUES ($1, $2) RETURNING *`,
                [name, price]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findAll() {
        try {
            const results = await this.client.query("SELECT * FROM product");
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findOne(id) {
        try {
            const results = await this.client.query(`SELECT * FROM product WHERE id = $1`, [id]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
    
    async updateOne(product) {
        try {
            const results = await this.client.query(
                "UPDATE product SET name = $1, price = $2 WHERE id = $3 RETURNING *",
                [product.name, product.price, product.id]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async deleteOne(id) {
        try {
            const results = await this.client.query("DELETE FROM product WHERE id = $1 RETURNING *", [id]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
  }
   
  module.exports = (client) => new ProductDAO(client);