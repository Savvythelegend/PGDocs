// sidebars.js
const sidebars = {
  tutorialSidebar: [
    'index',
    'before_you_start',
    'use_cases',
    'architecture',
    'installation_upgrade',
    'quickstart',
    {
      type: 'category',
      label: 'CNCF Projects Integrations',
      items: ['cncf-projects/external-secrets', 'cncf-projects/cilium'],
    },
    {
      type: 'category',
      label: 'Appendixes',
      items: ['appendixes/object_stores'],
    },
  ],
};
module.exports = sidebars;