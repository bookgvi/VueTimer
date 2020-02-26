const accountObj = {
  name: 'John Doe',
  money: 12
}

function Account (name, money) {
  this.name = name
  this.money = money || 13
}

function Money (name, money, isStatus) {
  Account.call(this, name, money)
  this.status = isStatus
}

Money.prototype = Object.create(Account.prototype)

Object.defineProperty(Money.prototype, 'constructor', {
  value: Money,
  enumerable: false
})

const account = new Money('John Doe', 51, true)

const accountProxy = new Proxy(account, {
  get (target, key, receiver) {
    console.log('...from proxy...')
    return Reflect.get(target, key, receiver)
  },
  set (target, key, val, receiver) {
    // eslint-disable-next-line no-prototype-builtins
    if (target.hasOwnProperty(key) && key === 'status') {
      return Reflect.set(target, key, val, receiver)
    }
    throw new Error('Operation not permitted')
  }
})

console.log(account)
console.log(accountProxy.money)

try {
  accountProxy.money = 123
  console.log(account)
  console.log(accountProxy)
} catch (err) {
  console.warn(err.message)
}

try {
  accountProxy.name = 123
  console.log(account)
  console.log(accountProxy)
} catch (err) {
  console.warn(err.message)
}

try {
  accountProxy.status = false
} catch (err) {
  console.warn(err.message)
}
console.log(account)
