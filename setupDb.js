const { Client } = require('pg');

(async () => {

  const usersTableStmt = `
    CREATE TABLE IF NOT EXISTS users (
      id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      email           VARCHAR(50),      
      password        TEXT
    );
  `;

  const itemsTableStmt = `
    CREATE TABLE IF NOT EXISTS products (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      name            VARCHAR(50)     NOT NULL,
      price           BIGINT          NOT NULL
    );
  `;

  const cartsTableStmt = `
    CREATE TABLE IF NOT EXISTS carts (
      user_id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      item_id          INT             NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (item_id) REFERENCES items(id)
    );
  `;

  try {
    const db = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: '',
        port: 5432
    });

    await db.connect();

    // Create tables on database
    await db.query(usersTableStmt);
    await db.query(itemsTableStmt);
    await db.query(cartsTableStmt);

    await db.end();

  } catch(err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }

})();