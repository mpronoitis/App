import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@ngneat/transloco';
//import en from json file using resolveJsonModule
import en from '../assets/i18n/en.json';
//import el from json file using resolveJsonModule
import el from '../assets/i18n/el.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en, el },
    translocoConfig: {
      availableLangs: ['en', 'el'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
