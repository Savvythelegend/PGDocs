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
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: '#',
              },
              {
                label: 'Discord',
                href: '#',
              },
              {
                label: 'X',
                href: '#',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/cloudnative-pg/cloudnative-pg/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Doc only site, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};
  
export default config;
