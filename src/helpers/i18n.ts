import i18n from '../i18n';

// While all the constants modules are comprised when imported and depends on t(), we delay the real value until i18n is initialized
export const t = (text: string) => {
  return i18n ? i18n.t(text) : text;
};

export const tArray = (text: string[]) => {
  return i18n ? i18n.t(text) : text;
};

export const tUpperCase = (text: string) => {
  return i18n ? i18n.t(text).toUpperCase() : text;
};
export const tLowerCase = (text: string) => {
  return i18n ? i18n.t(text).toLowerCase() : text;
};
