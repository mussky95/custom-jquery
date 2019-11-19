import {
  returnValue, exists, isString, isArray,
} from './helpers';

class ElementAbstraction {
  constructor(htmlElements) {
    if (!htmlElements || htmlElements.length === 0) {
      this.elements = [document.body];
    } else {
      this.elements = [...htmlElements];
    }
  }

  addClass(...classes) {
    this.elements.forEach((element) => element.classList.add(classes));

    return this;
  }

  removeClass(...classes) {
    this.elements.forEach((element) => element.classList.remove(classes));

    return this;
  }

  append(...elements) {
    this.elements.forEach((currentEl) => {
      elements.forEach((newEl) => {
        const child = (newEl instanceof ElementAbstraction)
          ? newEl.elements
          : newEl;

        if (isString(child)) {
          currentEl.insertAdjacentHTML('beforeend', child);
        } else {
          currentEl.append(child);
        }
      });
    });

    return this;
  }

  remove(selector = null) {
    this.elements = this.elements.filter((element) => {
      if (!exists(selector) || element.matches(selector)) {
        element.remove();

        return false;
      }

      return true;
    });

    return this;
  }

  text() {
    const values = this.elements.map((element) => element.textContent.trim());

    return returnValue(values);
  }

  attr(name, value = null) {
    if (value) {
      this.elements.forEach((el) => {
        el.setAttribute(name, value);
      });
    } else {
      return returnValue(
        this.elements.map((element) => element.getAttribute(name)),
      );
    }

    return this;
  }

  children(selector = null) {
    const elements = this.elements.reduce(
      (acc, el) => [...acc, ...Array.from(el.children).filter((child) => {
        if (!exists(selector)) {
          return true;
        }

        return child.matches(selector);
      })],
      [],
    );

    return new ElementAbstraction(elements);
  }

  empty() {
    this.elements.forEach((element) => {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    });
  }

  css(propNames, value = null) {
    if (value) {
      this.elements.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.style[propNames] = value;
      });
    } else if (isArray(propNames)) {
      const els = this.elements.reduce(
        (acc, el) => [...acc, propNames.map((name) => el.style[name])],
        [],
      );

      return returnValue(els);
    } else {
      const els = this.elements.reduce(
        (acc, el) => [...acc, el.style[propNames]],
        [],
      );

      return returnValue(els);
    }

    return this;
  }

  on(eventName, callbackOrSelector, callback) {
    if (isString(callbackOrSelector)) {
      this.elements.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el = el.find(callbackOrSelector);
        if (el) {
          el.addEventListener(eventName, callback);
        }
      });
    } else {
      this.elements.forEach((el) => {
        el.addEventListener(eventName, callbackOrSelector);
      });
    }

    return this;
  }

  click(callbackOrSelector, callback) {
    return this.on('click', callbackOrSelector, callback);
  }

  each(callback) {
    this.elements.forEach((el, index) => callback.call(el, index));

    return this;
  }

  wrap(wrapper) {
    let wrapperEl = wrapper;

    if (isString(wrapper)) {
      const parser = new DOMParser();
      wrapperEl = parser.parseFromString(wrapper, 'text/html').body.firstChild;
    } else if (wrapper instanceof ElementAbstraction) {
      [wrapperEl] = wrapper.elements;
    }

    this.elements.forEach((element) => {
      const wrapperElClone = wrapperEl.cloneNode(true);
      element.parentNode.insertBefore(wrapperElClone, element);
      wrapperElClone.appendChild(element);
    });

    return this;
  }
}

export default ElementAbstraction;
