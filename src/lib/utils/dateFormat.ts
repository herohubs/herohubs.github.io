import { format } from 'date-fns';
import { it } from 'date-fns/locale';

const dateFormat = (date: Date | string, pattern: string = 'dd MMM, yyyy'): string => {
  const dateObj = new Date(date);
  const output = format(dateObj, pattern, { locale: it });
  return output;
};

export default dateFormat;
