export const addCommaFromInteger = (integer: number = 0) =>
  integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')