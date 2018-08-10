var fs = require('fs');

var secrect = fs.readFileSync("./certs/secrets/StripePayments/test/secret", "utf8");

var stripe = require("stripe")(secrect);
const userService = require('./userService.js');

var Rx = require('rxjs')

var trialLength = 2592000000;

var memberShips = [

  {
    name: 'Workchew Starter Membership',
    id: "prod_DNkKhY6x69OR4p",
    planId: "plan_DNkd2WlLmkb055"
  },

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


const createPlan = ({id, name, price}) => {

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

var createCustomer = ({email, source, userId}) => {

  return Rx.Observable.create((observer) => {

    stripe.customers.create({
      email,
      source: source.id
    })

      .then((stripUserResponse) => {

        console.log("stripUserResponse", stripUserResponse)

        observer.next(stripUserResponse)
        observer.complete(stripUserResponse)

      })

      .catch((stripeErrorResponse) => {

        console.log("stripeErrorResponse", stripeErrorResponse)

        observer.error(stripeErrorResponse)

      })

  })

    .switchMap((stripUserResponse) => {

      var {id, account_balance, email} = stripUserResponse;

      //userService.up

      return Rx.Observable.of(stripUserResponse)

    })

}

var initUserMemberShip = (stripUserResponse, type) => {

  if (type === "PRO") {

    return subscribeUserToProMemberShip(stripUserResponse)

  } else {

    return subscribeUserToStarterMemberShip(stripUserResponse)

  }

}

var subscribeUserToProMemberShip = (stripUserResponse) => {

  return subscribeCustomer(stripUserResponse, memberShips[1].planId)

}

var subscribeUserToStarterMemberShip = (stripUserResponse) => {

  return subscribeCustomer(stripUserResponse, memberShips[0].planId)

}

var chargeCustomerForOneDayPass = ({source}) => {

  return Rx.Observable.fromPromise(

    stripe.charges.create({
      amount: 1499,
      currency: "usd",
      description: "charge for one day pass",
      source: source.id
    })
      .then((response) => {

        console.log(" chargeRequest response", response)

        return response

      })

  )

} //chargeCustomerForOneDayPass

var subscribeCustomer = (customer, plan) => {

  var today = new Date();

  var nowTime = today.getTime()

  console.log('nowTime', nowTime)


  var trial_end = nowTime + trialLength

  console.log('nowTime trialLength', trial_end, new Date(trial_end))


  return Rx.Observable.fromPromise(

    stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        plan: plan
      }],
      trial_period_days: 30

    })

      .then((response) => {

        console.log(" subscription response", response)
        return response

      })

  )
} //subscribeCustomer



module.exports = {
  createCustomer,
  initUserMemberShip
}














