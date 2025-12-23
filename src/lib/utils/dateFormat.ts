import { format } from 'date-fns';
import { it, enUS } from 'date-fns/locale';

const dateFormat = (date: Date | string, pattern: string = 'dd MMM, yyyy', lang: string = 'en'): string => {
  const dateObj = new Date(date);
  const output = format(dateObj, pattern, { locale: lang === 'it' ? it : enUS });
  return output;
};

export default dateFormat;
