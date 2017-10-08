const AV = require('../utils/av-weapp-min.js');
const app = getApp();

class Order extends AV.Object {
  get departure() { return this.get('departure') }
  set departure(value) { return this.set('departure', value) }

  get destination() { return this.get('destination') }
  set destination(value) { return this.set('destination', value) }

  get accepted() { return this.get('accepted') }
  set accepted(value) { return this.set('accepted', value) }

  get done() { return this.get('done') }
  set done(value) { return this.set('done', value) }
}

AV.Object.register(Order);
module.exports=Order;