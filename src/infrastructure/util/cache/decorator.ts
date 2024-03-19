type ValueType = {
  data: Promise<any>;
  time: number;
};

export const Cache = (time: number) => (target: any, property: string) => {
  const method = target[property];
  let value: ValueType | undefined;

  return {
    value: async function (...args: unknown[]) {
      if (!value || value.time + time <= Date.now()) {
        value = {
          data: method.apply(this, args).catch((error: string) => {
            value = undefined;
            throw new Error(error);
          }),
          time: Date.now(),
        };
      }
      return value.data;
    },
  };
};
