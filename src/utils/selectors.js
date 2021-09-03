export const addClass = (ref, className) => ref.current.classList.add(`${className}`);
export const removeClass = (ref, className) => ref.current.classList.remove(`${className}`)
export const toggleClass = (ref, className) => ref.current.classList.toggle(`${className}`);

