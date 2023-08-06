import * as utilArray from './ArrayTools';
import * as utilDate from './DateTools';

const isEnum = (object) => {
  return (
    Object.keys(object).length == 2 &&
    Object.hasOwn(object, 'name') &&
    Object.hasOwn(object, 'description')
  );
};

export const removeNullValues = (object, index, objects) => {
  if (typeof object === 'object' && !Array.isArray(object)) {
    for (let key in object) {
      if (object[key] == null || object[key] == undefined) {
        delete object[key];
      } else if (isEnum(object[key])) {
        object[key] = object[key].name;
      } else if (Array.isArray(object[key])) {
        object[key].map((o, i, os) => {
          removeNullValues(o, i, os);
          if (index && objects) {
            utilArray.modifyItem(objects, index, object);
          }
        });
      } else if (
        key.toLowerCase().includes('date') ||
        key.toLowerCase().includes('period')
      ) {
        object[key] = utilDate.createDate(new Date(object[key]));
      } else {
        removeNullValues(object[key], index, objects);
      }
      if (index && objects) {
        utilArray.modifyItem(objects, index, object);
      }
    }
  } else if (Array.isArray(object)) {
    object.map((o, i, os) => {
      removeNullValues(o, i, os);
    });
  }
};
