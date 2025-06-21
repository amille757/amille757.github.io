document.addEventListener("DOMContentLoaded",function(){console.log("New article notification script loaded");function r(){var e=window.location.pathname;if(e.endsWith("/")&&e!=="/"){e=e.slice(0,-1)}var t=e.split("/").filter(Boolean);console.log("Current path:",e);console.log("Path segments:",t);return e===""||e==="/"||e==="/index.html"||t.length===1&&t[0].toLowerCase()==="index.html"||t.length===1&&t[0].length===2||t.length===1&&t[0].length===5&&t[0].indexOf("-")===2}var a=document.getElementById("new-article-notification");if(!r()){console.log("Not on homepage, notification will not be displayed");if(a){a.style.display="none";a.style.visibility="hidden";a.style.opacity="0"}return}console.log("On homepage, initializing notification");var e=document.getElementById("close-notification");var i=document.getElementById("new-article-link");if(!a||!e||!i){console.error("Notification elements not found");return}var t=a.querySelector(".flex.items-center div h3");if(t){t.textContent=""}if(i){i.textContent=""}var l=a.querySelector(".flex.items-center");if(l){l.innerHTML="";l.style.padding="4px 0";var o=document.createElement("div");o.className="w-10 h-10 rounded-full flex items-center justify-center mr-3";o.style.background="linear-gradient(135deg, var(--highlight-color) 0%, var(--accent-color) 100%)";o.style.boxShadow="0 2px 8px rgba(var(--highlight-color-rgb), 0.4)";o.style.animation="pulse 2s ease-in-out infinite";var n=document.createElement("i");n.className="fas fa-star-half-alt";n.style.color="white";n.style.fontSize="1rem";o.appendChild(n);var s=document.createElement("div");s.className="flex flex-col";s.style.flex="1";var c=document.createElement("span");c.style.fontSize="0.7rem";c.style.fontWeight="700";c.style.color="var(--accent-color)";c.style.opacity="0.9";c.style.letterSpacing="0.6px";c.style.textTransform="uppercase";c.textContent="JUST PUBLISHED";var d=document.createElement("h3");d.className="font-bold";d.style.fontSize="1.1rem";d.style.lineHeight="1.2";d.style.marginBottom="2px";d.style.background="linear-gradient(90deg, var(--highlight-color), var(--accent-color))";d.style.WebkitBackgroundClip="text";d.style.backgroundClip="text";d.style.WebkitTextFillColor="transparent";d.textContent="Fresh Content";var y=document.createElement("p");y.className="mt-1";y.style.fontSize="0.8rem";y.style.lineHeight="1.3";y.style.color="var(--text-secondary)";y.textContent="Discover our latest insights and articles";s.appendChild(c);s.appendChild(d);s.appendChild(y);l.appendChild(o);l.appendChild(s);var h=document.createElement("div");h.className="ml-2";var g=document.createElement("button");g.id="close-notification";g.className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300";g.style.transition="all 0.2s ease";g.style.transform="scale(1)";g.innerHTML='<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';g.addEventListener("mouseover",function(){this.style.transform="scale(1.1) rotate(90deg)"});g.addEventListener("mouseout",function(){this.style.transform="scale(1) rotate(0deg)"});h.appendChild(g);l.appendChild(h);e=g}if(i){i.style.backgroundColor="transparent";i.style.color="var(--highlight-color)";i.style.border="1px solid rgba(var(--highlight-color-rgb), 0.5)";i.textContent="Explore Now";i.style.fontSize="0.9rem";i.style.padding="0.5rem 0";i.style.marginTop="0.75rem";i.style.fontWeight="600";i.style.letterSpacing="0.5px";i.style.transition="all 0.3s ease";i.style.borderRadius="8px";i.addEventListener("mouseover",function(){this.style.backgroundColor="var(--highlight-color)";this.style.color="white";this.style.transform="translateY(-2px)";this.style.boxShadow="0 4px 8px rgba(var(--highlight-color-rgb), 0.3)"});i.addEventListener("mouseout",function(){this.style.backgroundColor="transparent";this.style.color="var(--highlight-color)";this.style.transform="translateY(0)";this.style.boxShadow="none"});i.addEventListener("click",function(e){console.log("Explore button clicked, closing notification immediately");m()})}a.style.backdropFilter="blur(8px)";a.style.WebkitBackdropFilter="blur(8px)";a.style.border="1px solid rgba(var(--highlight-color-rgb), 0.2)";a.style.boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)";a.style.width="280px";a.style.maxWidth="280px";a.style.borderRadius="16px";a.style.position="fixed";a.style.bottom="100px";a.style.right="20px";a.style.zIndex="100";a.style.animation="float 4s ease-in-out infinite";var f=document.createElement("style");f.type="text/css";f.innerText=`
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
    `;document.head.appendChild(f);document.addEventListener("themeChanged",function(e){if(!r()){return}var t=a.querySelector(".flex.items-center .flex.flex-col h3");var l=a.querySelector(".flex.items-center .flex.flex-col span");var o=a.querySelector(".flex.items-center .flex.flex-col p");if(t){t.style.background="linear-gradient(90deg, var(--highlight-color), var(--accent-color))";t.style.WebkitBackgroundClip="text";t.style.backgroundClip="text"}if(l){l.style.color="var(--accent-color)"}if(o){o.style.color="var(--text-secondary)"}if(i){i.style.color="var(--highlight-color)";i.style.border="1px solid rgba(var(--highlight-color-rgb), 0.5)"}var n=a.querySelector(".w-10.h-10.rounded-full");if(n){n.style.background="linear-gradient(135deg, var(--highlight-color) 0%, var(--accent-color) 100%)"}});e.addEventListener("click",function(){m();console.log("Notification closed by close button")});function m(){if(a){a.style.display="none";a.style.visibility="hidden";a.style.opacity="0";console.log("Notification hidden without saving state")}}setTimeout(function(){a.style.display="block";a.style.backgroundColor="transparent";a.classList.remove("bg-card","dark:bg-gray-800");a.style.animation="fadeIn 0.5s ease forwards, float 4s ease-in-out infinite 0.5s";a.style.visibility="visible";a.style.opacity="1";console.log("Notification displayed with animation - only on homepage")},300)});