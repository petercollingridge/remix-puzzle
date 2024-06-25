// https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable

// Use to only call a function enough times for smooth animation, not every time the mouse moves
export const throttle = (f) => {
  let token = null;
  let lastArgs = null;

  // Call the function with the latest arguments
  const invoke = () => {
    f(...lastArgs);
    token = null;
  };

  // Save the arguments passed in, and if there's no token, call the function
  const result = (...args) => {
    lastArgs = args;
    if (!token) {
      token = requestAnimationFrame(invoke);
    }
  };

  result.cancel = () => token && cancelAnimationFrame(token);
  return result;
};
