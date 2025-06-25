document.addEventListener("DOMContentLoaded",function(){console.log("前端模板促销通知脚本已加载");function n(){var e=window.location.pathname;if(e.endsWith("/")&&e!=="/"){e=e.slice(0,-1)}var t=e.split("/").filter(Boolean);console.log("当前路径:",e);console.log("路径段:",t);var o=["/archives","/cart","/checkout","/order","/payment"];for(var r=0;r<o.length;r++){if(e.startsWith(o[r])){console.log("当前路径在排除列表中，不显示通知");return false}}return true}var i=document.getElementById("new-article-notification");if(!n()){console.log("当前页面不需要显示通知");if(i){i.style.display="none";i.style.visibility="hidden";i.style.opacity="0"}return}console.log("初始化前端模板促销通知");var e=document.getElementById("close-notification");var s=document.getElementById("new-article-link");if(!i||!e||!s){console.error("Notification elements not found");return}if(e){e.addEventListener("mouseover",function(){this.style.transform="scale(1.1) rotate(90deg)"});e.addEventListener("mouseout",function(){this.style.transform="scale(1) rotate(0deg)"})}if(s){s.addEventListener("mouseover",function(){this.style.backgroundColor="var(--highlight-color)";this.style.color="white";this.style.transform="translateY(-2px)";this.style.boxShadow="0 4px 8px rgba(var(--highlight-color-rgb), 0.3)"});s.addEventListener("mouseout",function(){this.style.backgroundColor="transparent";this.style.color="var(--highlight-color)";this.style.transform="translateY(0)";this.style.boxShadow="none"});s.addEventListener("click",function(e){console.log("浏览按钮被点击，立即关闭通知");o()})}i.style.backdropFilter="blur(8px)";i.style.WebkitBackdropFilter="blur(8px)";i.style.border="1px solid rgba(var(--highlight-color-rgb), 0.2)";i.style.boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)";i.style.width="300px";i.style.maxWidth="300px";i.style.borderRadius="16px";i.style.position="fixed";i.style.bottom="100px";i.style.right="20px";i.style.zIndex="100";i.style.animation="float 4s ease-in-out infinite";var t=document.createElement("style");t.type="text/css";t.innerText=`
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
    `;document.head.appendChild(t);document.addEventListener("themeChanged",function(e){if(!n()){return}var t=i.querySelector(".flex.items-center .flex.flex-col h3");var o=i.querySelector(".flex.items-center .flex.flex-col span");var r=i.querySelector(".flex.items-center .flex.flex-col p");if(t){t.style.background="linear-gradient(90deg, var(--highlight-color), var(--accent-color))";t.style.WebkitBackgroundClip="text";t.style.backgroundClip="text"}if(o){o.style.color="var(--accent-color)"}if(r){r.style.color="var(--text-secondary)"}if(s){s.style.color="var(--highlight-color)";s.style.border="1px solid rgba(var(--highlight-color-rgb), 0.5)"}var l=i.querySelector(".w-10.h-10.rounded-full");if(l){l.style.background="linear-gradient(135deg, var(--highlight-color) 0%, var(--accent-color) 100%)"}});e.addEventListener("click",function(){o();console.log("通知被关闭按钮关闭")});function o(){if(i){i.style.display="none";i.style.visibility="hidden";i.style.opacity="0";console.log("通知已隐藏，不保存状态")}}setTimeout(function(){i.style.display="block";i.style.backgroundColor="transparent";i.classList.remove("bg-card","dark:bg-gray-800");i.style.animation="fadeIn 0.5s ease forwards, float 4s ease-in-out infinite 0.5s";i.style.visibility="visible";i.style.opacity="1";console.log("通知已显示，带有动画效果")},300)});