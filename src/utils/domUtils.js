// src/utils/domUtils.js

/**
 * 滚动到指定元素
 */
export function scrollToElement(element, offset = 100) {
  if (!element) return
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

/**
 * 高亮错误字段
 */
export function highlightErrorField(element, duration = 2000) {
  if (!element) return
  const originalBorder = element.style.border
  const originalBoxShadow = element.style.boxShadow
  const originalBackgroundColor = element.style.backgroundColor
  element.style.border = '2px solid #ff4d4f'
  element.style.boxShadow = '0 0 0 4px rgba(255, 77, 79, 0.3)'
  element.style.backgroundColor = '#fff1f0'
  setTimeout(() => {
    element.style.border = originalBorder
    element.style.boxShadow = originalBoxShadow
    element.style.backgroundColor = originalBackgroundColor
  }, duration)
}

/**
 * 高亮错误字段（别名）
 */
export function highlightError(element, duration = 2000) {
  return highlightErrorField(element, duration)
}

/**
 * 显示错误提示 Toast
 */
export function showError(message, duration = 3000) {
  return showToast(message, 'error', duration)
}

/**
 * 显示 Toast 提示
 */
export function showToast(message, type = 'error', duration = 3000) {
  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.textContent = message
  Object.assign(toast.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '12px 24px',
    borderRadius: '4px',
    color: 'white',
    fontSize: '14px',
    zIndex: '9999',
    backgroundColor: type === 'error' ? '#ff4d4f' : type === 'success' ? '#52c41a' : '#faad14',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'opacity 0.3s',
    opacity: '1'
  })
  document.body.appendChild(toast)
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, duration)
}

/**
 * 获取第一个可见的错误元素
 */
export function getFirstErrorElement(validationErrors, vm) {
  const firstErrorField = Object.keys(validationErrors)[0]
  if (!firstErrorField) return null
  const element = vm.$refs[firstErrorField]
  return element || null
}

/**
 * 聚焦到指定元素
 */
export function focusElement(element) {
  if (!element) return
  if (typeof element.focus === 'function') {
    element.focus()
  } else if (element.querySelector) {
    const input = element.querySelector('input, select, textarea')
    if (input && typeof input.focus === 'function') {
      input.focus()
    }
  }
}

/**
 * 清除所有错误高亮
 */
export function clearAllErrorHighlights(container) {
  if (!container) return
  const errorElements = container.querySelectorAll('.input-error')
  errorElements.forEach(el => {
    el.classList.remove('input-error')
  })
}