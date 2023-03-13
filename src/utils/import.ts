// eslint-disable-next-line no-new-func
export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
)
