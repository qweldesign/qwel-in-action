// Vue
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.0/vue.esm-browser.prod.js';

// Action Core
import ActionCore from './js/action-core.js';

// Fader
import Fader from './js/fader.js';

// Modal
import Modal from './js/modal.js';

// Slider
import Slider from './js/slider.js';

/**
 * Auto Copyright
 * © 2026 QWEL.DESIGN (https://qwel.design)
 * Released under the MIT License.
 * See LICENSE file for details.
 */
class AutoCopyright {
  constructor(startYear, companyName, elem) {
    elem ||= document.querySelector('.footer__copyright');
    if (elem) elem.innerHTML = this.generate(startYear, companyName);
  }

  generate(startYear, companyName) {
    const currentYear = new Date().getFullYear();
    return `&copy; ${startYear} - ${currentYear} ${companyName}`;
  }
}

const data = {
  data() {
    return {
      sections: {
        feature: {
          id: 'feature',
          name: 'feature',
          items: [
            {
              heading: 'feature-1',
              src: './assets/sampleImg00.jpg'
            },
            {
              heading: 'feature-2',
              src: './assets/sampleImg01.jpg'
            },
            {
              heading: 'feature-3',
              src: './assets/sampleImg02.jpg'
            },
            {
              heading: 'feature-4',
              src: './assets/sampleImg03.jpg'
            }
          ]
        },
        about: {
          id: 'about',
          name: 'about',
          heading: 'Mission',
          excerpt: 'Our mission is ...',
          src: './assets/sampleImg01.jpg',
          more: 'read more'
        },
        service: {
          id: 'service',
          name: 'service',
          more: 'read more',
          items: [
            {
              date: '2025-04-01',
              heading: 'service-1',
              tags: ['news', 'info'],
              excerpt: 'Today is ...',
              src: './assets/sampleImg02.jpg'
            },
            {
              date: '2025-04-02',
              heading: 'service-2',
              tags: ['news'],
              excerpt: 'Today is ...',
              src: './assets/sampleImg03.jpg'
            },
            {
              date: '2025-04-03',
              heading: 'service-3',
              tags: ['info'],
              excerpt: 'Today is ...',
              src: './assets/sampleImg04.jpg'
            }
          ]
        },
        news: {
          id: 'news',
          name: 'news',
          more: 'read more',
          items: [
          {
              date: '2025-04-01',
              heading: 'news-1',
              tags: ['news', 'info'],
              excerpt: 'Today is ...',
              src: './assets/sampleImg03.jpg'
            },
            {
              date: '2025-04-02',
              heading: 'news-2',
              tags: ['news'],
              excerpt: 'Today is ...',
              src: './assets/sampleImg04.jpg'
            },
            {
              date: '2025-04-03',
              heading: 'news-3',
              tags: ['info'],
              excerpt: 'Today is ...',
              src: './assets/sampleImg05.jpg'
            }
          ]
        },
        team: {
          id: 'team',
          name: 'team',
          heading: 'Mission',
          excerpt: 'Our mission is ...',
          src: './assets/sampleImg04.jpg',
          more: 'read more'
        },
        access: {
          id: 'access',
          name: 'access',
          src: 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3227.2986434445115!2d135.99!3d36.013!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sja!2sjp!4v1768971157714!5m2!1sja!2sjp'
        },
        contact: {
          id: 'contact',
          name: 'contact',
          description: 'サンプルデモであるため、このフォームは機能しません。'
        }
      },
      social: {
        x: true,
        facebook: true,
        instagram: true,
        youtube: false
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      new ActionCore.Preset();
      new Fader();
      new Modal();
      new Slider();
      new AutoCopyright(2019, 'QWEL.DESIGN');
    }
  }
}

createApp(data).mount('#app');
