// src/utils/domUtils.js

/**
 * 滚动到指定元素
 */
export function scrollToElement(element, offset = 100, container = null) {
  if (!element) return
  
  const scrollContainer = container || document.querySelector('.main-content') || window
  
  if (scrollContainer && scrollContainer !== window) {
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - offset
    
    scrollContainer.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  } else {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * 高亮错误字段
 */
export function highlightError(element, duration = 2000) {
  if (!element) return
  element.classList.add('input-error')
  setTimeout(() => {
    element.classList.remove('input-error')
  }, duration)
}

/**
 * 显示错误提示 Toast
 */
export function showError(message, duration = 3000) {
  console.error(message)
}