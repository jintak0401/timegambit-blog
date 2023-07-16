const siteMetadata = {
  // for meta tags
  title: 'Time Gambit Blog',
  author: 'Time Gambit',
  titleTemplate: '%s | Time Gambit',
  applicationName: 'Time Gambit Blog',
  headerTitle: 'Time Gambit',
  description: 'Time Gambit의 블로그',
  keywords: ['Time Gambit', '기술 블로그'],
  locale: 'ko-KR',
  language: 'ko',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.timegambit.com',
  siteRepo: 'https://github.com/jintak/timegambit-blog',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  fallbackImage: '/static/images/fallback.webp',

  // for footer
  email: 'jintak0401@naver.com',
  github: 'https://github.com/jintak0401',
  twitter: '',
  facebook: '',
  youtube: '',
  linkedin: '',

  revalidate: 10, // renewal period of popular post list at home page and guestbook logs (in seconds)
  blogPost: {
    maxLikeCount: 4,
    postsPerScroll: 10,
    homeRecentPostLength: 3,
    homePopularPostLength: 3,
    // Viewing the same article within 4 hours does not increase view count.
    viewCountTimeLimit: 4,
  },
  oauth: {
    providers: ['google', 'github', 'naver', 'kakao'],
  },
  analytics: {
    googleAnalyticsId: 'G-W3YPJJJVS7', // e.g. G-XXXXXXX
  },
  comment: {
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    lazyLoad: true, // when true, comment will be loaded when user scrolls to comment box
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
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

export default siteMetadata
