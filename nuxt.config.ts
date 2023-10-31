import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NEXTAUTH_URL ?? '',
    },
  },
  ssr: false,

  imports: {
    dirs: [
      'composables/**',
    ],
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth',
    '@sidebase/nuxt-pdf',
  ],
  plugins: [
    { src: '~/plugins/timeInterval', mode: 'client' },
    { src: '~/plugins/db', mode: 'client' },
  ],
  auth: {
    baseURL: `${process.env.NUXT_PUBLIC_API_BASE_URL}/id`,
    session: {
      enableRefreshPeriodically: false,
      enableRefreshOnWindowFocus: false,
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
    provider: {
      type: 'local',
      pages: {
        login: '/login',
      },
      token: {
        signInResponseTokenPointer: '/data',
        maxAgeInSeconds: 100000,
      },
      sessionDataType: {
        id: 'string',
        name: 'string',
        username: 'string',
        created_at: 'string',
        stores: '{ id: number, name: string, whatsapp_number: string, tax_percentage: number, sale_lower_price_permission: boolean, whatsapp_number: string, currency: string, address: string }[]',
        warehouses: '{ id: number, name: string }[]',
        permissions: '{ id: number, name: string }[]',
        roles: '{ id: number, name: string, permissions: { id: number, name: string }[] }[]'
      },
    },
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/styles/global.scss',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      // routes: ['/'],
      // ignore: ['/hi'],
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: false,
  },

  quasar: {
    plugins: [
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',

      // Disable dark mode
      // 'Dark',
    ],
    extras: {
      font: 'roboto-font',
      fontIcons: ['material-icons'],
    },
  },

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'id', name: 'Indonesia', file: 'id.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'id',
    strategy: 'prefix_except_default',
  },
})
