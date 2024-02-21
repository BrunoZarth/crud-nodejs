class UserDAO {

    constructor(client) {
        this.client = client;
    }

    async save(user) {
        const { name, email, hash, salt } = user;
        try {
            const results = await this.client.query(
                `INSERT INTO users (name, email, hash, salt) VALUES ($1, $2, $3, $4) RETURNING *`,
                [name, email, hash, salt]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findAll() {
        try {
            const results = await this.client.query("SELECT * FROM users");
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findOne(id) {
        try {
            const results = await this.client.query(`SELECT * FROM users WHERE id = $1`, [id]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }

    async findOneByEmail(email) {
        try {
            const results = await this.client.query(`SELECT * FROM users WHERE email = $1`, [email]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async updateOne(user) {
        try {
            const results = await this.client.query(
                "UPDATE users SET name = $1, email = $2, hash = $3, WHERE id = $4 RETURNING *",
                [user.name, user.email, user.hash, user.id]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async deleteOne(id) {
        try {
            const results = await this.client.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
  }
   
  module.exports = (client) => new UserDAO(client);