export const isEmpty = value => value === undefined || value === null || value === '' || (typeof value === 'object' && Object.keys(value).length === 0)

export const addCommaFromInteger = (integer: number = 0) =>
  integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const getParams = query => {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      let [key, value] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, {})
}
