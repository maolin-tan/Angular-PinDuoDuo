// tslint:disable-next-line:typedef
export function Emoji() {
    return (target: object, key: string) => {
        let val = target[key];

        const getter = () => {
            return val;
        };

        const setter = (value: string) => {
            val = `♡-${value}-♡`;
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}


// 自定义第二个
// tslint:disable-next-line:typedef
export function  Confirmable(message: string){
    return (target: object, key: string, descriptor: PropertyDescriptor) => {
      const original = descriptor.value;
      // tslint:disable-next-line:typedef
      descriptor.value = function(...args: any[]){
      const allow = window.confirm(message);
      if (allow) {
          const result = original.apply(this, args);
          return result;
      }
      return null;
    };
      return descriptor;
  };
}