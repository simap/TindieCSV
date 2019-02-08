require('dotenv').config()
var axios = require('axios');
const stringify = require('csv-stringify')

axios.defaults.baseURL = "https://www.tindie.com/api/"
axios.defaults.headers.common['Authorization'] = "ApiKey " + process.env.APIUSER + ":" + process.env.APIKEY;


(async () => {
  try {
    let request = axios({
      method: 'get',
      url: 'v1/order?shipped=false&limit=100',
      headers: {
      }
    })

    let res = await request;


    res.data.orders.forEach(o => {
      o.item_summary = o.items.map(i => i.quantity + "x " + i.model_number).join(' + ')
    })

    // console.log(JSON.stringify(res.data, null, 2))

    stringify(res.data.orders, {
      header: true,
      columns: {
        company_title : 'company',
        email : 'email',
        message : 'message',
        number : 'orderId',
        phone : 'phone',
        shipping_city : 'city',
        shipping_country : 'country',
        shipping_instructions : 'instructions',
        shipping_name : 'name',
        shipping_postcode : 'postcode',
        shipping_service : 'service',
        shipping_state : 'state',
        shipping_street : 'street',
        item_summary: 'item_summary',
        // items: 'items'
      }
    }).pipe(process.stdout)

  } catch (err) {
    console.log(err);
  }
})()
