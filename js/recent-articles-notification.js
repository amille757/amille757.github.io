document.addEventListener('DOMContentLoaded', function() {
    console.log('New article notification script loaded');
    
    // 更准确地检查当前是否在首页
    function isHomePage() {
        // 获取当前路径
        var path = window.location.pathname;
        
        // 移除末尾的斜杠
        if (path.endsWith('/') && path !== '/') {
            path = path.slice(0, -1);
        }
        
        // 移除前面的语言路径，如果存在
        var segments = path.split('/').filter(Boolean);
        
        // 调试输出
        console.log('Current path:', path);
        console.log('Path segments:', segments);
        
        // 检查是否为首页
        // 1. 路径为空或者只有 / 
        // 2. 路径只包含 index.html
        // 3. 路径只包含语言代码 (如 /zh-cn/)
        return path === '' || 
               path === '/' || 
               path === '/index.html' || 
               (segments.length === 1 && segments[0].toLowerCase() === 'index.html') ||
               (segments.length === 1 && segments[0].length === 2) || // 语言代码，如 /en/
               (segments.length === 1 && segments[0].length === 5 && segments[0].indexOf('-') === 2); // 语言-地区代码，如 /zh-cn/
    }
    
    // 获取浮窗元素
    var notification = document.getElementById('new-article-notification');
    
    // 如果不是首页，确保通知不可见然后退出
    if (!isHomePage()) {
        console.log('Not on homepage, notification will not be displayed');
        if (notification) {
            notification.style.display = 'none';
            notification.style.visibility = 'hidden';
            notification.style.opacity = '0';
        }
        return;
    }
    
    console.log('On homepage, initializing notification');
    
    // 获取其他元素
    var closeButton = document.getElementById('close-notification');
    var linkElement = document.getElementById('new-article-link');
    
    if (!notification || !closeButton || !linkElement) {
        console.error('Notification elements not found');
        return;
    }
    
    // 先设置内容，再显示通知，避免闪烁
    // 设置标题和按钮文本
    var titleElement = notification.querySelector('.flex.items-center div h3');
    if (titleElement) {
        titleElement.textContent = ''; // 先清空，避免闪烁
    }
    
    if (linkElement) {
        linkElement.textContent = ''; // 先清空，避免闪烁
    }
    
    // 重新设计浮窗内容和排版
    // 首先清空原有内容区域
    var contentContainer = notification.querySelector('.flex.items-center');
    if (contentContainer) {
        contentContainer.innerHTML = '';
        contentContainer.style.padding = '4px 0'; // 增加内边距
        
        // 创建新的图标容器
        var iconContainer = document.createElement('div');
        iconContainer.className = 'w-10 h-10 rounded-full flex items-center justify-center mr-3';
        iconContainer.style.background = 'linear-gradient(135deg, var(--highlight-color) 0%, var(--accent-color) 100%)';
        iconContainer.style.boxShadow = '0 2px 8px rgba(var(--highlight-color-rgb), 0.4)';
        iconContainer.style.animation = 'pulse 2s ease-in-out infinite';
        
        // 添加图标
        var icon = document.createElement('i');
        icon.className = 'fas fa-star-half-alt';
        icon.style.color = 'white';
        icon.style.fontSize = '1rem';
        iconContainer.appendChild(icon);
        
        // 创建文本容器
        var textContainer = document.createElement('div');
        textContainer.className = 'flex flex-col';
        textContainer.style.flex = '1';
        
        // 添加副标题
        var subtitle = document.createElement('span');
        subtitle.style.fontSize = '0.7rem';
        subtitle.style.fontWeight = '700';
        subtitle.style.color = 'var(--accent-color)';
        subtitle.style.opacity = '0.9';
        subtitle.style.letterSpacing = '0.6px';
        subtitle.style.textTransform = 'uppercase';
        subtitle.textContent = 'JUST PUBLISHED';
        
        // 添加标题 - 去掉滑动效果，保留渐变色
        var title = document.createElement('h3');
        title.className = 'font-bold';
        title.style.fontSize = '1.1rem';
        title.style.lineHeight = '1.2';
        title.style.marginBottom = '2px';
        title.style.background = 'linear-gradient(90deg, var(--highlight-color), var(--accent-color))';
        title.style.WebkitBackgroundClip = 'text';
        title.style.backgroundClip = 'text';
        title.style.WebkitTextFillColor = 'transparent';
        // 移除动画效果
        title.textContent = 'Fresh Content';
        
        // 添加描述
        var description = document.createElement('p');
        description.className = 'mt-1';
        description.style.fontSize = '0.8rem';
        description.style.lineHeight = '1.3';
        description.style.color = 'var(--text-secondary)';
        description.textContent = 'Discover our latest insights and articles';
        
        // 组装文本容器
        textContainer.appendChild(subtitle);
        textContainer.appendChild(title);
        textContainer.appendChild(description);
        
        // 将图标和文本添加到内容容器
        contentContainer.appendChild(iconContainer);
        contentContainer.appendChild(textContainer);
        
        // 添加关闭按钮
        var closeButtonContainer = document.createElement('div');
        closeButtonContainer.className = 'ml-2';
        
        var newCloseButton = document.createElement('button');
        newCloseButton.id = 'close-notification';
        newCloseButton.className = 'text-gray-400 hover:text-gray-500 dark:hover:text-gray-300';
        newCloseButton.style.transition = 'all 0.2s ease';
        newCloseButton.style.transform = 'scale(1)';
        newCloseButton.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
        
        // 添加悬停效果
        newCloseButton.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1) rotate(90deg)';
        });
        
        newCloseButton.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        closeButtonContainer.appendChild(newCloseButton);
        contentContainer.appendChild(closeButtonContainer);
        
        // 更新关闭按钮引用
        closeButton = newCloseButton;
    }
    
    // 修改"查看文章"按钮的文本和样式
    if (linkElement) {
        linkElement.style.backgroundColor = 'transparent';
        linkElement.style.color = 'var(--highlight-color)'; // 使用高亮色作为文字颜色
        linkElement.style.border = '1px solid rgba(var(--highlight-color-rgb), 0.5)'; // 添加半透明边框
        linkElement.textContent = 'Explore Now';
        linkElement.style.fontSize = '0.9rem'; // 保持按钮字体大小
        linkElement.style.padding = '0.5rem 0'; // 增加按钮内边距
        linkElement.style.marginTop = '0.75rem'; // 增加上边距
        linkElement.style.fontWeight = '600'; // 加粗字体
        linkElement.style.letterSpacing = '0.5px'; // 增加字间距
        linkElement.style.transition = 'all 0.3s ease'; // 添加过渡效果
        linkElement.style.borderRadius = '8px'; // 增加圆角
        
        // 添加悬停效果
        linkElement.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'var(--highlight-color)';
            this.style.color = 'white';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(var(--highlight-color-rgb), 0.3)';
        });
        
        linkElement.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'transparent';
            this.style.color = 'var(--highlight-color)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // 修改链接点击事件，点击后立即关闭浮窗，但不保存状态
        linkElement.addEventListener('click', function(e) {
            console.log('Explore button clicked, closing notification immediately');
            hideNotification();
            // 不阻止默认行为，允许导航到归档页面
        });
    }
    
    // 添加玻璃拟态效果
    notification.style.backdropFilter = 'blur(8px)';
    notification.style.WebkitBackdropFilter = 'blur(8px)';
    notification.style.border = '1px solid rgba(var(--highlight-color-rgb), 0.2)';
    notification.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    
    // 调整浮窗宽度，使其更宽一些
    notification.style.width = '280px'; // 增加宽度到280px
    notification.style.maxWidth = '280px'; // 确保最大宽度也相应增加
    notification.style.borderRadius = '16px'; // 增加圆角
    
    // 设置浮动样式，不固定在特定位置
    notification.style.position = 'fixed'; // 使用固定定位，但允许滚动时保持在视口中
    notification.style.bottom = '100px'; // 距离底部100px
    notification.style.right = '20px'; // 距离右侧20px
    notification.style.zIndex = '100'; // 确保在其他元素之上
    
    // 添加浮动动画效果
    notification.style.animation = 'float 4s ease-in-out infinite';
    
    // 创建动画样式
    var styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @keyframes float {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0px);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // 监听主题变化事件，确保颜色适配
    document.addEventListener('themeChanged', function(e) {
        // 再次检查是否在首页，如果不在首页则不更新样式
        if (!isHomePage()) {
            return;
        }
        
        var title = notification.querySelector('.flex.items-center .flex.flex-col h3');
        var subtitle = notification.querySelector('.flex.items-center .flex.flex-col span');
        var description = notification.querySelector('.flex.items-center .flex.flex-col p');
        
        if (title) {
            title.style.background = 'linear-gradient(90deg, var(--highlight-color), var(--accent-color))';
            title.style.WebkitBackgroundClip = 'text';
            title.style.backgroundClip = 'text';
        }
        
        if (subtitle) {
            subtitle.style.color = 'var(--accent-color)';
        }
        
        if (description) {
            description.style.color = 'var(--text-secondary)';
        }
        
        if (linkElement) {
            linkElement.style.color = 'var(--highlight-color)';
            linkElement.style.border = '1px solid rgba(var(--highlight-color-rgb), 0.5)';
        }
        
        // 更新图标容器的渐变背景
        var iconContainer = notification.querySelector('.w-10.h-10.rounded-full');
        if (iconContainer) {
            iconContainer.style.background = 'linear-gradient(135deg, var(--highlight-color) 0%, var(--accent-color) 100%)';
        }
    });
    
    // 点击关闭按钮 - 立即关闭浮窗，但不保存状态
    closeButton.addEventListener('click', function() {
        hideNotification();
        console.log('Notification closed by close button');
    });
    
    // 隐藏通知 - 立即移除元素，但不保存状态
    function hideNotification() {
        if (notification) {
            notification.style.display = 'none';
            notification.style.visibility = 'hidden';
            notification.style.opacity = '0';
            // 移除保存关闭状态到本地存储的代码
            // localStorage.setItem('notification_closed', 'true');
            console.log('Notification hidden without saving state');
        }
    }
    
    // 延迟显示通知，确保所有内容已经准备好
    setTimeout(function() {
        // 确保浮窗通知是可见的，并设置为透明背景
        notification.style.display = 'block';
        notification.style.backgroundColor = 'transparent'; // 设置透明背景
        notification.classList.remove('bg-card', 'dark:bg-gray-800'); // 移除背景色类
        
        // 使用淡入动画显示
        notification.style.animation = 'fadeIn 0.5s ease forwards, float 4s ease-in-out infinite 0.5s';
        notification.style.visibility = 'visible';
        notification.style.opacity = '1';
        
        console.log('Notification displayed with animation - only on homepage');
    }, 300); // 延迟300毫秒，确保DOM已完全准备好
}); 