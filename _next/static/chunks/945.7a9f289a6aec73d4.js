(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[945],{3616:e=>{var r;self,r=()=>(()=>{"use strict";var e={};return Object.defineProperty(e,"__esModule",{value:!0}),e.FitAddon=void 0,e.FitAddon=class{activate(e){this._terminal=e}dispose(){}fit(){let e=this.proposeDimensions();if(!e||!this._terminal||isNaN(e.cols)||isNaN(e.rows))return;let r=this._terminal._core;this._terminal.rows===e.rows&&this._terminal.cols===e.cols||(r._renderService.clear(),this._terminal.resize(e.cols,e.rows))}proposeDimensions(){if(!this._terminal||!this._terminal.element||!this._terminal.element.parentElement)return;let e=this._terminal._core,r=e._renderService.dimensions;if(0===r.css.cell.width||0===r.css.cell.height)return;let t=0===this._terminal.options.scrollback?0:e.viewport.scrollBarWidth,i=window.getComputedStyle(this._terminal.element.parentElement),o=parseInt(i.getPropertyValue("height")),n=Math.max(0,parseInt(i.getPropertyValue("width"))),a=window.getComputedStyle(this._terminal.element),l=o-(parseInt(a.getPropertyValue("padding-top"))+parseInt(a.getPropertyValue("padding-bottom")));return{cols:Math.max(2,Math.floor((n-(parseInt(a.getPropertyValue("padding-right"))+parseInt(a.getPropertyValue("padding-left")))-t)/r.css.cell.width)),rows:Math.max(1,Math.floor(l/r.css.cell.height))}}},e})(),e.exports=r()},1945:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>l});var i=t(4848),o=t(3616),n=t(6540),a=t(7856);let l=e=>{let{lastLogin:r,content:t,size:l}=e,s=(0,n.useRef)(null),c=(0,n.useRef)(null),u=(0,n.useRef)(null),h=new a.Terminal({cursorBlink:!0,cursorStyle:"bar",cursorWidth:8,fontFamily:"var(--font-mac)",fontSize:14,lineHeight:1.7,fontWeight:"bold",theme:{background:"#000",foreground:"#fff"}});return(0,n.useEffect)(()=>{let e=new o.FitAddon;h.loadAddon(e),s.current&&h.open(s.current),e.fit(),c.current=h,u.current=e},[]),h.write("Last login: ".concat(r," on ttys000 \r\n")),t.forEach(e=>{let{text:r}=e;h.write("".concat(r,"  \r\n"))}),h.write("Koushik@Koushiks-MacBook-Pro ~ % "),h.onKey(e=>{let{domEvent:r,key:t}=e,i=!r.altKey&&!r.ctrlKey&&!r.metaKey;switch(r.key){case"Enter":var o;let n=h.buffer.active.baseY+h.buffer.active.cursorY,a=null===(o=h.buffer.active.getLine(n))||void 0===o?void 0:o.translateToString().trim(),l=null==a?void 0:a.replace("Koushik@Koushiks-MacBook-Pro ~ %","").trim();console.log("command",l),"help"===l?(h.write("\r\n"),h.write("Available commands: \r\n"),h.write("help - Show available commands \r\n"),h.write("clear - Clear the terminal \r\n"),h.write("profile - Show my profile \r\n")):"clear"===l?h.clear():"profile"===l||"whoareyou"===l||"p"===l?(h.write("\r\n"),h.write("Name: Koushik \r\n"),h.write("Role: Software Engineer \r\n"),h.write("Location: Bangalore, India \r\n"),h.write("Email: kroy963@gmail.com")):(h.write("\r\n"),h.write("zsh: command not found: ".concat(l))),h.write("\r\nKoushik@Koushiks-MacBook-Pro ~ % ");break;case"Backspace":h.buffer.active.cursorX>33&&h.write("\b \b");break;default:i&&h.write(t)}}),(0,n.useEffect)(()=>{u.current&&c.current&&(u.current.fit(),c.current.refresh(0,c.current.rows-1))},[l]),(0,i.jsx)("div",{ref:s,style:{padding:"5px",width:"100%",height:"100%",borderRadius:"10px"},className:"font-[family-name:var(--font-mac)] overflow-auto scrollbar-none"})}}}]);