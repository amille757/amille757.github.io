/**
 * 根据北京时间自动切换主题
 * 白天(6:00-18:00): 浅色主题
 * 晚上(18:00-6:00): 深色主题
 */

function setThemeBasedOnBeijingTime() {
  // 检查当前会话中是否有用户手动设置的主题
  const sessionTheme = sessionStorage.getItem('user-theme');
  
  // 如果会话中有保存的主题，则使用该主题
  if (sessionTheme) {
    setTheme(sessionTheme, false);
    return;
  }
  
  // 获取当前UTC时间
  const now = new Date();
  
  // 转换为北京时间 (UTC+8)
  const beijingHours = (now.getUTCHours() + 8) % 24;
  
  // 定义白天时段 (6:00-18:00)
  const isDaytime = beijingHours >= 6 && beijingHours < 18;
  
  // 根据时间设置主题
  if (isDaytime) {
    setTheme('light', false);
  } else {
    setTheme('dark', false);
  }
  
  // 输出调试信息
  console.log(`主题自动切换: 当前北京时间 ${beijingHours}时，设置为${isDaytime ? '浅色' : '深色'}主题`);
}

/**
 * 设置主题并更新UI
 * @param {string} theme - 'light' 或 'dark'
 * @param {boolean} isManual - 是否是手动切换
 */
function setTheme(theme, isManual = true) {
  // 设置主题
  document.documentElement.setAttribute('data-theme', theme);
  
  // 如果是手动切换，保存到sessionStorage
  // sessionStorage在同一会话的所有页面间共享，但会在浏览器关闭后清除
  if (isManual) {
    sessionStorage.setItem('user-theme', theme);
    console.log('用户手动设置主题:', theme);
  }
  
  // 更新主题图标
  updateThemeIcons(theme);
  
  // 确保深色模式下页面背景全黑
  if (theme === 'dark') {
    document.documentElement.style.backgroundColor = '#121212';
    if (document.body) {
      document.body.style.backgroundColor = '#121212';
    }
  } else {
    document.documentElement.style.backgroundColor = '';
    if (document.body) {
      document.body.style.backgroundColor = '';
    }
  }
  
  // 触发主题变更事件，通知遮罩层脚本
  var themeChangeEvent = new CustomEvent('themeChanged', { 
    detail: { theme: theme } 
  });
  document.dispatchEvent(themeChangeEvent);
  
  // 显示通知（仅在手动切换时）
  if (isManual && typeof showNotification === 'function') {
    showNotification(theme === 'dark' ? '已切换到深色模式' : '已切换到浅色模式');
  }
}

/**
 * 更新所有主题切换图标
 * @param {string} theme - 当前主题
 */
function updateThemeIcons(theme) {
  var themeIcons = document.querySelectorAll('.theme-toggle i');
  themeIcons.forEach(function(icon) {
    if (theme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
}

/**
 * 初始化主题设置
 * 首先检查sessionStorage中是否有保存的主题，否则根据北京时间自动设置
 */
function initTheme() {
  setThemeBasedOnBeijingTime();
  
  // 绑定主题切换按钮事件
  bindThemeToggleEvent();
}

/**
 * 绑定主题切换按钮事件
 */
function bindThemeToggleEvent() {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      // 切换主题并标记为手动设置
      setTheme(targetTheme, true);
      
      // 触发自定义事件，通知其他脚本主题已更改
      var themeChangeEvent = new CustomEvent('themeChanged', { 
        detail: { theme: targetTheme } 
      });
      document.dispatchEvent(themeChangeEvent);
    });
  }
}

// 全局通知函数（如果layout.ejs中没有定义）
if (typeof showNotification !== 'function') {
  window.showNotification = function(message, duration = 2000) {
    var notification = document.createElement('div');
    notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm z-[9999] transition-all duration-300';
    notification.style.backgroundColor = 'var(--bg-card)';
    notification.style.color = 'var(--text-color)';
    notification.style.border = '1px solid var(--border-color)';
    notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    notification.innerText = message;
    
    document.body.appendChild(notification);
    
    // 确保元素已添加到DOM后再添加opacity过渡效果
    setTimeout(function() {
      notification.style.opacity = '1';
    }, 10);
    
    setTimeout(function() {
      notification.style.opacity = '0';
      setTimeout(function() {
        document.body.removeChild(notification);
      }, 300);
    }, duration);
  };
}

// 页面加载时初始化主题
document.addEventListener('DOMContentLoaded', initTheme);

// 每小时检查一次时间变化，自动更新主题
setInterval(function() {
  // 仅当用户在当前会话没有手动设置主题时，才执行自动切换
  if (!sessionStorage.getItem('user-theme')) {
    setThemeBasedOnBeijingTime();
  }
}, 3600000); // 每小时检查一次(3600000毫秒)