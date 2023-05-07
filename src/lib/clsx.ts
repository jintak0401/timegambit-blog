type Mixed = string | number | boolean | undefined | null | object;

const toVal = (mix: string | number | boolean | object) => {
  let k,
    y,
    str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k as keyof typeof mix]) {
          str && (str += ' ');
          str += k;
        }
      }
    }
  }

  return str;
};

const clsx = (...args: Mixed[]) => {
  let i = 0,
    tmp,
    x,
    str = '';
  while (i < args.length) {
    if ((tmp = args[i++])) {
      if ((x = toVal(tmp))) {
        str && (str += ' ');
        str += x;
      }
    }
  }
  return str;
};

export default clsx;
