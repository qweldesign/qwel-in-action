/**
 * Modal
 * © 2026 QWEL.DESIGN (https://qwel.design)
 * Released under the MIT License.
 * See LICENSE file for details.
 */

/**
 * モーダルウィンドウとして機能するギャラリー
 * 
 * 使い方:
 * _modal.scss をバンドルした css を読み込み,
 * ギャラリー本体に [data-gallery="modal"] 属性を付与し,
 * ギャラリーアイテムに [data-gallery-item] 属性を付与する
 * ギャラリーアイテムは img の親要素: li, figure などを指定すること 
 * 
 * オプション:
 * breakpoint: 指定のBP未満のビューポートでは発火しない
 */

export default class Modal {
  constructor(elem, options = {}) {
    // 指定のBP未満のビューポートでは発火しない
    const breakpoint = options.breakpoint || 600;
    if (window.innerWidth < breakpoint) return;

    // 要素
    this.elem = elem || document.querySelector('[data-gallery="modal"]');
    if (!this.elem) return;
    this.items = Array.from(this.elem.querySelectorAll('[data-gallery-item]'));
    if (!this.items.length) return;

    // 状態管理
    this.index = 0;

    // 各要素生成
    this.createModal();

    // イベント登録
    this.handleEvents();
  }

  createModal() {
    // .modal: body末尾に挿入されるラッパー要素
    this.modal = document.createElement('div');
    this.modal.classList.add('modal', 'is-hidden'); // opacity: 0
    this.modal.setAttribute('aria-hidden', 'true'); // visibility: hidden
    document.body.appendChild(this.modal);

    // .modal__container: モーダル本体
    this.container = document.createElement('div');
    this.container.classList.add('modal__container');
    this.modal.appendChild(this.container);

    // .modal__image: モーダル内の拡大表示する画像
    this.image = document.createElement('img');
    this.image.classList.add('modal__image', 'is-loaded');
    this.container.appendChild(this.image);

    // .modal__overlay: オーバーレイ (クリック操作で閉じる)
    this.overlay = document.createElement('div');
    this.overlay.classList.add('modal__overlay');
    this.modal.appendChild(this.overlay);

    // .modal__close: 閉じるボタン
    this.close = document.createElement('div');
    this.close.classList.add('modal__close');
    const closeIcon = document.createElement('div');
    closeIcon.classList.add('icon', 'icon--close', 'icon--lg');
    const closeSpan = document.createElement('span');
    closeSpan.classList.add('icon__span');
    closeIcon.appendChild(closeSpan);
    this.close.appendChild(closeIcon);
    this.modal.appendChild(this.close);

    // .modal__prev: 前へボタン
    this.prev = document.createElement('div');
    this.prev.classList.add('modal__prev');
    const prevIcon = document.createElement('div');
    prevIcon.classList.add('icon', 'icon--chevron-left', 'icon--lg');
    const prevSpan = document.createElement('span');
    prevSpan.classList.add('icon__span');
    prevIcon.appendChild(prevSpan);
    this.prev.appendChild(prevIcon);
    this.modal.appendChild(this.prev);

    // .modal__next: 次へボタン
    this.next = document.createElement('div');
    this.next.classList.add('modal__next');
    const nextIcon = document.createElement('div');
    nextIcon.classList.add('icon', 'icon--chevron-right', 'icon--lg');
    const nextSpan = document.createElement('span');
    nextSpan.classList.add('icon__span');
    nextIcon.appendChild(nextSpan);
    this.next.appendChild(nextIcon);
    this.modal.appendChild(this.next);
  }

  handleEvents() {
    this.items.forEach((item, i) => {
      item.addEventListener('click', () => {
        this.show(i);
      });
    });

    this.overlay.addEventListener('click', () => this.hide());
    this.close.addEventListener('click', () => this.hide());
    this.prev.addEventListener('click', () => this.show(this.index - 1));
    this.next.addEventListener('click', () => this.show(this.index + 1));
  }

  show(i) {
    this.index = (i + this.items.length) % this.items.length;
    const item = this.items[this.index];
    const img = item.querySelector('img');
    const src = img.getAttribute('src');

    // モーダルを開く
    this.modal.classList.remove('is-hidden');
    this.modal.setAttribute('aria-hidden', 'false');

    // 画像切り替え
    if (this.image.getAttribute('src')) {
      this.transitionEnd(this.image, () => {
        this.image.classList.remove('is-loaded');
      }).then(() => {
        this.image.setAttribute('src', src);
        this.image.classList.add('is-loaded');
      });
    } else {
      // 初期
      this.image.setAttribute('src', src);
      this.image.classList.add('is-loaded');
    }
  }

  hide() {
    this.transitionEnd(this.modal, () => {
      this.modal.classList.add('is-hidden');
    }).then(() => {
      this.modal.setAttribute('aria-hidden', 'true');
    });
  }

  transitionEnd(elem, func) {
    // CSS遷移の完了を監視
    let callback;
    const promise = new Promise((resolve) => {
      callback = () => resolve(elem);
      elem.addEventListener('transitionend', callback);
    });
    func();
    promise.then((elem) => {
      elem.removeEventListener('transitionend', callback);
    });
    return promise;
  }
}
