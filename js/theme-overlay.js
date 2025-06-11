/**
 * 主题切换遮罩层效果
 * 在主题切换时显示平滑过渡遮罩，避免闪烁
 */

// 在文档加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 确保页面上有遮罩层元素
    initThemeOverlay();
    
    // 监听主题变更事件
    document.addEventListener('themeChanged', handleThemeChange);
});

// 初始化遮罩层
function initThemeOverlay() {
    // 检查是否已存在遮罩层
    let overlay = document.getElementById('page-transition-overlay');
    
    // 如果不存在，创建一个
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'page-transition-overlay';
        overlay.className = 'fixed inset-0 z-[9999]';
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'; // 浅色模式下半透明白色
        overlay.style.backdropFilter = 'blur(8px)';
        overlay.style.WebkitBackdropFilter = 'blur(8px)';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.pointerEvents = 'none';
        
        // 添加到文档中
        document.body.appendChild(overlay);
    }
    
    // 确保样式正确
    overlay.style.opacity = '0';
    overlay.style.visibility = 'visible';
    overlay.style.pointerEvents = 'none';
}

// 处理主题变更
function handleThemeChange(event) {
    const overlay = document.getElementById('page-transition-overlay');
    if (!overlay) return;
    
    // 获取新的主题
    const newTheme = event.detail.theme || document.documentElement.getAttribute('data-theme') || 'light';
    
    // 根据主题设置适合的半透明背景色
    if (newTheme === 'dark') {
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'; // 深色模式下半透明黑色
    } else {
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'; // 浅色模式下半透明白色
    }
    
    // 立即显示遮罩层（模糊效果）
    overlay.style.opacity = '1';
    overlay.style.backdropFilter = 'blur(8px)';
    overlay.style.WebkitBackdropFilter = 'blur(8px)';
    overlay.style.pointerEvents = 'auto';
    
    // 主题变化完成后延迟隐藏遮罩层
    setTimeout(() => {
        // 直接移除模糊效果
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    }, 1500); // 延长到1.5秒
    
    // 记录主题变化
    console.log('主题已切换为:', newTheme);
} 