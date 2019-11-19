import ElementAbstraction from './ElementAbstraction';
import { isString } from './helpers';

const jquery = (selector) => {
  if (!selector) {
    return new ElementAbstraction();
  }

  if (isString(selector)) {
    return new ElementAbstraction(document.querySelectorAll(selector));
  }

  if (selector instanceof ElementAbstraction) {
    return new ElementAbstraction(selector.elements);
  }

  return new ElementAbstraction([selector]);
};

export default jquery;
