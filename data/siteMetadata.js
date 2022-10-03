const siteMetadata = {
  title: 'Time Gambit Blog',
  author: 'Time Gambit | 한진탁',
  headerTitle: 'Time Gambit',
  description: 'Time Gambit의 블로그',
  language: 'ko-KR',
  theme: 'system', // system, dark or light
  siteUrl: 'http://localhost:3000',
  siteRepo: 'https://github.com/jintak/timegambit-blog',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'jintak0401@naver.com',
  github: 'https://github.com',
  twitter: 'https://twitter.com/Twitter',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com',
  locale: 'ko-KR',
  analytics: {
    googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
  },
  comment: {
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repoId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactionsEnabled: '1',
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      emitMetaData: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // Place the comment box above the comments. options: bottom, top
      inputPosition: 'bottom',
      // Choose the language giscus will be displayed in. options: en, es, zh-CN, zh-TW, ko, ja etc
      lang: 'ko',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
    },
  },
};

module.exports = siteMetadata;