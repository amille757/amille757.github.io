// 测试脚本 - 直接显示浮窗通知
document.addEventListener('DOMContentLoaded', function() {
    console.log('测试通知脚本已加载');
    
    // 获取浮窗元素
    var notification = document.getElementById('new-article-notification');
    
    if (!notification) {
        console.error('找不到浮窗通知元素 #new-article-notification');
        return;
    }
    
    console.log('浮窗通知元素已找到');
    
    // 强制设置浮窗样式确保可见
    notification.style.display = 'block';
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
    notification.style.visibility = 'visible';
    notification.style.zIndex = '1000';
    
    // 打印浮窗通知的样式
    console.log('浮窗通知样式：', {
        display: window.getComputedStyle(notification).display,
        opacity: window.getComputedStyle(notification).opacity,
        transform: window.getComputedStyle(notification).transform,
        visibility: window.getComputedStyle(notification).visibility,
        zIndex: window.getComputedStyle(notification).zIndex,
        position: window.getComputedStyle(notification).position,
        bottom: window.getComputedStyle(notification).bottom,
        right: window.getComputedStyle(notification).right
    });
    
    // 设置关闭按钮点击事件
    var closeButton = document.getElementById('close-notification');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            console.log('关闭按钮被点击');
            notification.style.display = 'none';
        });
    }
    
    // 添加边框使浮窗更明显
    notification.style.border = '3px solid red';
}); 