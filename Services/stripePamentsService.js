var fs = require('fs');

var secrect = fs.readFileSync("./certs/secrets/StripePayments/test/secret", "utf8");

var stripe = require("stripe")(secrect);

var trialLength = 2592000000;

var memberShips = [

  {
    name: 'Workchew Starter Membership',
    id: "prod_DNkKhY6x69OR4p",
    planId: "plan_DNkd2WlLmkb055"
  }

]

var makeServiceProduct = () => {

  const product = stripe.products.create({
    name: 'Workchew Starter Membership',
    type: 'service',
  });

  product.then((response) => {

    console.log("response", response)

  })

}


var createPlan = ({id, name, price}) => {

  const plan = stripe.plans.create({
    product: id,
    nickname: name + "_plan",
    currency: 'usd',
    interval: 'month',
    amount: price,
  });

  plan.then((response) => {

    console.log(" createPlan response", response)

  }).catch((response) => {

    console.log(" createPlan rerr", response)

  })

}



var createCustomer = ({email, source}) => {

  const customer = stripe.customers.create({
    email,
    source
  });

  customer.then((response) => {

    console.log(" customer response", response)

  }).catch((response) => {

    console.log(" customer rerr", response)

  })

}

var subscribeCustomer = ({customer, plan}) => {

  var today = new Date();

  var nowTime = today.getTime()

  const subscription = stripe.subscriptions.create({
    customer: customer,
    items: [plan],
    trial_end: nowTime + trialLength

  });

  subscription.then((response) => {

    console.log(" subscription response", response)

  }).catch((response) => {

    console.log(" subscription rerr", response)

  })

}


















