// src/lib/utils/dom.ts - DOM utility functions
export function querySelector<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent?: Document | HTMLElement
): T | null {
  const element = (parent || document).querySelector(selector);
  return element as T | null;
}

export function querySelectorAll<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent?: Document | HTMLElement
): NodeListOf<T> {
  return (parent || document).querySelectorAll(selector) as NodeListOf<T>;
}

export function getElementById<T extends HTMLElement = HTMLElement>(
  id: string
): T | null {
  const element = document.getElementById(id);
  return element as T | null;
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes?: Record<string, string>,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

export function addEventListenerOnce<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions
): void {
  const wrappedListener = function (
    this: HTMLElement,
    ev: HTMLElementEventMap[K]
  ) {
    element.removeEventListener(
      type,
      wrappedListener as EventListener,
      options
    );
    return listener.call(this, ev);
  };

  element.addEventListener(type, wrappedListener as EventListener, options);
}

export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function getElementOffset(element: HTMLElement): {
  top: number;
  left: number;
} {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastExecTime = 0;

  return (...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime >= delay) {
      func(...args);
      lastExecTime = currentTime;
    }
  };
}
