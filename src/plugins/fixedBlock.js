/* eslint-disable */

export function fixedBlock (el, defPos = 80, bottomPx = '1rem') {
  let block = el;

  let blockClassList = el.classList;
  let blockRect = el.getBoundingClientRect();

  let parentElement = block.parentElement;
  let parent = {
    height: parentElement.offsetHeight,
    bottom: parentElement.offsetTop + parentElement.getBoundingClientRect().height,
  };

  let blockData = {
    width: blockRect.width,
    height: blockRect.height,
    top: blockRect.top + window.pageYOffset,
    left: blockRect.left,
  };

  let windowWidth = window.innerWidth;
  let timer;
  let defTopPos = defPos;
  let mbPrevBlock = 0;
  let winWidth = 0;

  checkFix();

  window.addEventListener('resize', function() {
    clearTimeout(timer);
    timer = setTimeout(update, 50);
  });

  window.addEventListener('scroll', function() {
    checkFix();
  });

  function update() {
    unFixed();
    blockData.top = el.getBoundingClientRect().top + window.pageYOffset;
    blockData.width = el.getBoundingClientRect().width;
    blockData.height = el.getBoundingClientRect().height;
    blockData.left = el.getBoundingClientRect().left;
    windowWidth = window.innerWidth;
    checkFix();
  }

  function fixed() {
    blockClassList.add('fixed');
    parentElement.classList.add('is-active');
    blockClassList.remove('absolute');

    el.style.left = blockData.left + 'px';
    el.style.width = blockData.width + 'px';
    el.style.top = defTopPos + 'px';
    el.style.right = '';
    el.style.bottom = '';
  }

  function unFixed() {
    blockClassList.remove('fixed');
    parentElement.classList.remove('is-active');

    el.style.top = '';
    el.style.right = '';
    el.style.bottom = '';
    el.style.left = '';
    el.style.width = '';
  }

  function unFixed_bottom() {
    blockClassList.remove('fixed');
    blockClassList.add('absolute');
    parentElement.classList.add('is-active');

    el.style.top = '';
    el.style.right = '';
    el.style.bottom = bottomPx;
    el.style.left = '';
    el.style.width = blockData.width;
  }

  function checkFix() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (windowWidth > winWidth) {
      if (
        scrollTop >= blockData.top - defTopPos &&
        scrollTop + defTopPos < parent.bottom - blockData.height
      ) {
        fixed();
      } else {
        if (scrollTop + defTopPos > parent.bottom - blockData.height) unFixed_bottom();
        else unFixed();
      }
    }
  }
};
