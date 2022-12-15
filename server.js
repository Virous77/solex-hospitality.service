require("dotenv").config();
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51MCPQJSHnj0cswqZJaPvtGtn7GNURe5YOhV2u9hFSt3aI7FgLIiaqOVJLH3SbNmrDJ6qUnKnaJf2HdKoUE8NplMI008YKuE3w8"
);

const app = express();
app.use(cors());
app.use(express.json());
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("welcome to solex");
});

app.post("/create-payment-intent", async (req, res) => {
  const { total, description, shipping } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },

    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postalCode,
      },

      name: shipping.name,
      phone: shipping.phone,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
