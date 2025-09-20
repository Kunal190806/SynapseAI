// src/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Dashboard": "Dashboard",
      "Purpose & Goals": "Purpose & Goals",
      "Projects": "Projects",
      "Narrative Studio": "Narrative Studio",
      "Collective Intelligence": "Collective Intelligence",
      "Simulation": "Simulation",
      "Adaptive Management": "Adaptive Management"
    }
  },
  hi: {
    translation: {
      "Dashboard": "tableau",
      "Purpose & Goals": "उद्देश्य और लक्ष्य",
      "Projects": "परियोजनाएं",
      "Narrative Studio": "कथा स्टूडियो",
      "Collective Intelligence": "सामूहिक खुफिया",
      "Simulation": "محاكاة",
      "Adaptive Management": "अनुकूली प्रबंधन"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
