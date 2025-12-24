import { loadLocalizedConfig } from '@/lib/utils/lang';

const readingTime = async (content: string, lang: string = 'en'): Promise<string> => {
  const i18n: any = await loadLocalizedConfig(lang, 'i18n');

  const WPS = 275 / 60;

  let images = 0;
  const regex = /\w/;

  let words = content.split(' ').filter((word) => {
    if (word.includes('<img')) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  let imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);

  if (minutes < 10) {
    if (minutes < 2) {
      return '0' + minutes + ` ${i18n.min_read}`;
    } else {
      return '0' + minutes + ` ${i18n.mins_read}`;
    }
  } else {
    return minutes + ` ${i18n.mins_read}`;
  }
};

export default readingTime;
