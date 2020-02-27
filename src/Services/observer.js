function Observer (target) {
  return new Proxy(target, {
    set (target, property, value, receiver) {
      const success = Reflect.set(target, property, value, receiver)
      if (success) {
        console.log('QQQ', property, target[property])
      }
      return success
    }
  })
}

const obj = {}
const observer = Observer(obj)
observer.name = 'wqe'
observer.name1 = 'wqe1'
observer.name2 = 'wqe2'
observer.name3 = 'wqe3'
observer.name = 'wqe123'
