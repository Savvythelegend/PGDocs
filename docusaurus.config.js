// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/**
 * Docusaurus config for documentation:
 * - Main docs live in /docs and appear at the root path /
 */

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Documentation | CloudNativePG PostgreSQL Operator for K8s',
  tagline: 'PostgreSQL Operator for K8s',
  favicon: 'img/favicon.ico',

  // Enable compatibility with Docusaurus v4
  future: {
    v4: true,
  },

  // Production URL and base path
  url: 'https://Savvythelegend.github.io',  // ← Your username here
  baseUrl: '/pgdocs/',                      // ← Keep this

  // GitHub pages deployment config
  organizationName: 'Savvythelegend',        // ← Your username here
  projectName: 'pgdocs',       // ← Your repo name

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // Internationalization settings
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/cloudnative-pg/cloudnative-pg/tree/main/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/undraw_docusaurus_react.svg',
      navbar: {
        logo: {
          alt: 'My Site Logo',
          src: 'img/large_logo.svg',
        },
        items: [
          { to: '/docs/faq', label: 'FAQs', position: 'right' },
          {
            href: 'https://github.com/cloudnative-pg/cloudnative-pg/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              { label: 'Documentation', to: 'docs/' },
              { label: 'Quickstart Guide', to: '/docs/quickstart' },
              { label: 'Tutorials', to: '#' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Blog', to: '#' },
              { label: 'Releases', to: '/docs/release_notes' },
              { label: 'How to Contribute', to: 'https://github.com/cloudnative-pg/cloudnative-pg/blob/main/CONTRIBUTING.md' },
            ],
          },
          {
            title: 'CloudNativePG',
            items: [
              { html: `
                <a href="https://cloud-native.slack.com/archives/C08MAUJ7NPM" target="_self"><i class="fab fa-slack fa-2x"></i></a>
                <a href="https://x.com/CloudNativePg" target="_blank"><i class="fab fa-x-twitter fa-2x"></i></a>
                <a href="https://www.youtube.com/channel/UCTGH88W1BiuRRPTzJUDPJyA" target="_blank"><i class="fab fa-youtube fa-2x"></i></a>
                <a href="https://www.linkedin.com/company/cloudnative-pg" target="_blank"><i class="fab fa-linkedin fa-2x"></i></a>
                <a href="https://mastodon.social/@CloudNativePG" target="_blank"><i class="fab fa-mastodon fa-2x"></i></a>
                <a href="https://bsky.app/profile/cloudnativepg.bsky.social" target="_blank"><i class="fas fa-bug fa-2x"></i></a>
              ` },
              { html: '<a href="https://github.com/cloudnative-pg/cloudnative-pg/" target="_blank" rel="noopener"><button style="background: #ad94d4;color:#000513;padding:10px 30px;border:none;border-radius:25px;font-size:1.1em;margin-top:10px;">View on GitHub</button></a>' }
            ]
          }
        ],
      // Add link to the copyright title
      copyright: `<a href='/pgdocs' style='text-decoration:none;'><img src='img/large_logo.svg' alt='CloudNativePG Logo' style='height:45px;vertical-align:middle;margin-right:8px;filter:brightness(0) invert(1);'/></a> © ${new Date().getFullYear()} CloudNativePG`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};
  
export default config;
