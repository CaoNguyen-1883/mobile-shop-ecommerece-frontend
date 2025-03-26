export const $ = (selector, parent = document) => parent.querySelector(selector);

// Select multiple elements as an array
export const $$ = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector));

// Utility: Create element with properties and children
export const createElement = (tag, props = {}, children = []) => {
    const element = document.createElement(tag);
    // Apply properties
    Object.entries(props).forEach(([key, value]) => {
        if (key === "classList" && Array.isArray(value)) {
        value.forEach(cls => element.classList.add(cls));
        } else if (key === "style" && typeof value === "object") {
        Object.assign(element.style, value);
        } else if (key.startsWith("on") && typeof value === "function") {
        element.addEventListener(key.substring(2).toLowerCase(), value);
        } else {
        element[key] = value;
        }
    });
    // Append children
    children.forEach(child => {
        if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
        } else {
        element.appendChild(child);
        }
    });
    return element;
};
