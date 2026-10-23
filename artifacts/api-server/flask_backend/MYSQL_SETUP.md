# MySQL connection setup

This Flask API stores one navigator state per browser session in the
`career_navigator_state` MySQL table. It creates that table with
`CREATE TABLE IF NOT EXISTS` when it first connects. It does not delete or
change existing tables.

## Configure the database

1. Create a MySQL database with an account that can connect from Replit.
2. Give that account permission to create and use the `career_navigator_state`
   table. It needs `CREATE`, `SELECT`, `INSERT`, and `UPDATE` permissions on
   that database. The table is created with `CREATE TABLE IF NOT EXISTS`; no
   existing table is deleted or replaced.
3. In Replit, open **Tools → Secrets** and add a secret named `MYSQL_URL`.
4. Set its value to the connection URL supplied by your MySQL host:

   `mysql://USERNAME:PASSWORD@HOST:3306/DATABASE?ssl=true`

   Use the exact host, port, database name, username, and password from your
   provider. Keep the password in Secrets, never in source code. If the
   password contains reserved URL characters such as `@`, `:`, `/`, or `#`,
   URL-encode those characters first. Use `?ssl=true` when the provider
   requires TLS.
5. Restart the **Career API** workflow and check
   `/api/career/healthz`. It should report `"database": "connected"`.
6. Save a profile in the app, refresh the page, and confirm the profile loads
   from MySQL.

The API returns HTTP 503 for reads and writes if `MYSQL_URL` is missing or
MySQL is unreachable. It never reports a database save as successful unless
the MySQL write completes.
