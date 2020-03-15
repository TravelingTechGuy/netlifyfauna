# Netlifpress - Netlify functions using Express

A demo repo showing use of CRUD API with FaunaDB using a Netlify function.

To see the site in action: [Demo Site](https://netlifyfauna.netlify.com/).

## Prepare FaunaDB to use the code

1. Log into FaunaDB and create a new database (name does not matter)
1. Select the option to pre-populate the database with demo collections. This will create the "Customers" collection we'll use.
1. Select the "Security" tab in the dabase, and add a new key.
1. Copy the key, create a `.env` file at the root of the project and add a line `DB_KEY=<your key>`.
1. If you're deploying to Netlify, create an environment variable called `DB_KEY` and add your key to it.
1. If you're goin to use a different collection, or a non-default index name, change the paramneters on line 5 in the `api.js` file.

## To use the demo

No, or light error handling is included, and the logic is pretty naive and scripted:

1. Click the "Get" button to see all customers.
1. Click "POST" to add a customer.
1. Click "PUT" to change the customer's last name (verify that by clicking "GET" again).
1. Click "DELETE" to delete the added customer.

You cannot change or delete a user before creating it. The new record id is saved in a global variable, so refreshing the page will require you to start the equence again. As mentioned, naive 😊.
