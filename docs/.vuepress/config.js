const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Vuepress Docs Boilerplate',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    locales: {
      repo: '',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
      '/': {
        nav: [
          {
            text: 'FP js',
            link: '/functional-programming/'
          },
          {
            text: 'imperative-declarative',
            link: '/imperative-declarative/'
          },
          {
            text: 'JavaScript',
            link: '/js/'
          },
          {
            text: 'Guide',
            link: '/guide/',
          },
          {
            text: 'Config',
            link: '/config/'
          },
          {
            text: 'VuePress',
            link: 'https://v1.vuepress.vuejs.org'
          }
        ],
        sidebar: {
          '/guide/': [
            {
              title: 'Guide',
              collapsable: false,
              children: [
                '',
                'using-vue',
              ]
            }
          ],
        }
      },
      '/es/': {
        nav: [
          {
            text: 'FP JS',
            link: '/es/functional-programming/'
          },
          {
            text: 'imperative-declarative',
            link: '/imperative-declarative/'
          },
          {
            text: 'JavaScript',
            link: '/es/js/'
          },
          {
            text: 'Guia',
            link: '/es/guide/',
          },
          {
            text: 'prog',
            link: '/es/imperative-declarative/',
          },
          {
            text: 'Configuracion',
            link: '/es/config/'
          },
          {
            text: 'VuePress',
            link: 'https://v1.vuepress.vuejs.org'
          }
        ],
        sidebar: {
          '/es/guide/': [
            {
              title: 'Guia',
              collapsable: false,
              children: [
                '',
                'using-vue',
              ]
            }
          ],
          '/es/js/': [
            {
              title: 'JavaScript',
              collapsable: false,
              children: [
                '',
                'functions',
              ]
            }
          ],
          '/es/imperative-declarative/': [
            {
              title: 'Declaracion imperativa vs declarativa',
              collapsable: false,
              children: [
                '',
                'functions',
              ]
            }
          ],
          '/es/functional-programming/': [
            {
              title: 'Functional Programming',
              collapsable: false,
              children: [
                '',
                'functions',
              ]
            }
          ],
        }
      }
    }
  },
    
  locales: {
    '/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/es/': {
      lang: 'es-CH',
      title: 'VuePress',
      description: 'Vue español'
    }
  },
  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
