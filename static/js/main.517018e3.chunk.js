(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){"use strict";a.r(t);var r=a(2),n=a(3),s=a(5),o=a(4),u=a(6),l=a(0),i=a.n(l),c=a(8),m=a.n(c),h=a(1),f=a.n(h);a(17);function d(e,t,a){for(var r=((parseInt(e,16)+t*a)%16777216).toString(16);r.length<6;)r="0"+r;return r}function v(e){var t=[];if(e.length<=1)return e;for(var a=0;a<e.length;a++)a+1<=e.length&&e[a]===e[a+1]?(t.push(2*e[a]),a++):t.push(e[a]);return t}function p(e){var t=e.value?e.value:0,a=d("ffffff",14596231,Math.floor(t/2));"extreme"===e.mode&&(a=d("ffffff",16007990,t));var r={backgroundColor:"#"+a};return i.a.createElement("button",{className:"square",style:r},e.value)}var g=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(n.a)(t,[{key:"renderSquare",value:function(e){return i.a.createElement(p,{value:this.props.squares[e],mode:this.props.mode})}},{key:"render",value:function(){for(var e=this.props.number,t=[],a=0;a<e;a++){for(var r=[],n=0;n<e;n++){var s=a*e+n;r.push(this.renderSquare(s))}t.push(i.a.createElement("div",{className:"board-row"},r))}return i.a.createElement("div",null,t)}}]),t}(i.a.Component),y=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(o.a)(t).call(this,e))).state={squares:a.startBoard(1,2,"normal"),number:2,display:2,score:0,mode:"normal"},f.a.config({left:function(){a.leftOrRight("left")},right:function(){a.leftOrRight("right")},up:function(){a.upOrDown("up")},down:function(){a.upOrDown("down")}}),a}return Object(u.a)(t,e),Object(n.a)(t,[{key:"upOrDown",value:function(e){var t=this.state.squares.slice(),a=t.reduce(function(e,t){return e+t}),r=this.arrayToColumn(t);"up"===e?r=r.map(this.moveUp):"down"===e&&(r=r.map(this.moveDown)),t=this.columnToArr(r);var n=(t=this.addRandom(t,Math.floor(this.state.number/2),this.state.mode)).reduce(function(e,t){return e+t});this.setState({squares:t,score:this.state.score+(n-a)})}},{key:"leftOrRight",value:function(e){var t=this.state.squares.slice(),a=this.arrayToRow(t);"left"===e?a=a.map(this.moveUp):"right"===e&&(a=a.map(this.moveDown)),t=this.rowToArr(a),t=this.addRandom(t,Math.floor(this.state.number/2),this.state.mode),this.setState({squares:t})}},{key:"arrayToColumn",value:function(e){for(var t=[],a=Math.sqrt(e.length),r=0;r<a;r++){for(var n=[],s=0;s<a;s++)n.push(e[r+a*s]);t.push(n)}return t}},{key:"arrayToRow",value:function(e){for(var t=[],a=Math.sqrt(e.length),r=0;r<a;r++){for(var n=[],s=0;s<a;s++)n.push(e[r*a+s]);t.push(n)}return t}},{key:"columnToArr",value:function(e){for(var t=[],a=e.length,r=0;r<a;r++)for(var n=0;n<a;n++)t.push(e[n][r]);return t}},{key:"rowToArr",value:function(e){for(var t=[],a=e.length,r=0;r<a;r++)for(var n=0;n<a;n++)t.push(e[r][n]);return t}},{key:"moveDown",value:function(e){var t=e.length;for(e=(e=v(e=(e=e.filter(function(e){return null!=e})).reverse())).reverse();e.length!==t;)e.unshift(null);return e}},{key:"moveUp",value:function(e){var t=e.length;for(e=v(e=e.filter(function(e){return null!=e}));e.length!==t;)e.push(null);return e}},{key:"startBoard",value:function(e,t,a){var r=Array(t).fill(null);return r=this.addRandom(r,e,a)}},{key:"randomValue",value:function(e){var t=Math.random();return"normal"===e?t<.5?2:4:"extreme"===e?t<.5?1:3:void 0}},{key:"addRandom",value:function(e,t,a){for(var r=[],n=0;n<e.length;n++)e[n]||r.push(n);for(;t>0&&r.length>0;){var s=this.randomIndex(r.length);e[r[s]]=this.randomValue(a),t--,r.splice(r[s],1)}return e}},{key:"randomIndex",value:function(e){return Math.floor(Math.random()*(e-1))}},{key:"componentDidUpdate",value:function(e,t){this._input.focus()}},{key:"calculateStatus",value:function(){var e=!1,t=this.state.squares;if(0===t.filter(function(e){return null==e}).length){e=[];var a=this.arrayToRow(t);a=a.map(v);for(var r=0;r<a.length;r++)if(a[r].length<this.state.number){e.push(!1);break}var n=this.arrayToColumn(t);n=n.map(v);for(var s=0;s<n.length;s++)if(n[s].length<this.state.number){e.push(!1);break}e=0===e.length}return[e,t.reduce(function(e,t){return e+t})]}},{key:"handleSize",value:function(e){var t=parseInt(e.target.value);if(isNaN(t)&&this.setState({display:""}),t>0){var a=Math.pow(t,2),r=Math.floor(t/2);this.setState({number:t,display:t,squares:this.startBoard(r,a,this.state.mode)})}}},{key:"gameMode",value:function(e){var t=Math.floor(this.state.number/2),a=Math.pow(this.state.number,2);if("normal"===e){if("extreme"===this.state.mode){var r=this.startBoard(t,a,"normal");this.setState({mode:"normal",squares:r})}}else if("extreme"===e&&"normal"===this.state.mode){var n=this.startBoard(t,a,"extreme");this.setState({mode:"extreme",squares:n})}}},{key:"render",value:function(){var e=this,t=this.state.number,a=this.state.display,r=this.calculateStatus(),n="col-6",s="col-6";return"normal"===this.state.mode?n+=" active":"extreme"===this.state.mode&&(s+=" active"),r[0]?i.a.createElement("div",{className:"game"},i.a.createElement("div",{className:"game-board"},i.a.createElement(g,{squares:this.state.squares,number:t,mode:this.state.mode})),i.a.createElement("div",{class:"userControls"},i.a.createElement("div",{class:"status"},"No more moves."),i.a.createElement("div",{class:"status"},"Final Score:"+this.state.score),i.a.createElement("div",{class:"row slider"},i.a.createElement("div",{class:"col-4"},"Board Size: "),i.a.createElement("input",{type:"range",min:"2",max:"10",value:a,class:"slider",onChange:function(t){return e.handleSize(t)}})),i.a.createElement("div",{class:"row"},i.a.createElement("div",{class:"col-4 arrowKeys"},"Arrow Keys: "),i.a.createElement("input",Object.assign({class:"col-4",type:"text"},f.a.events,{tabIndex:"1",autofocus:"true",ref:function(t){return e._input=t}}))),i.a.createElement("div",{class:"row"},i.a.createElement("p",{class:n,onClick:function(){return e.gameMode("normal")}},"Normal"),i.a.createElement("p",{class:s,onClick:function(){return e.gameMode("extreme")}},"Extreme")))):i.a.createElement("div",{className:"game"},i.a.createElement("div",{className:"game-board"},i.a.createElement(g,{squares:this.state.squares,number:t,mode:this.state.mode})),i.a.createElement("div",{class:"userControls"},i.a.createElement("div",{class:"status"},"Score: "+this.state.score),i.a.createElement("div",{class:"row slider"},i.a.createElement("div",{class:"col-4"},"Board Size: "),i.a.createElement("input",{type:"range",min:"2",max:"10",value:a,class:"slider",onChange:function(t){return e.handleSize(t)}})),i.a.createElement("div",{class:"row"},i.a.createElement("div",{class:"col-4 arrowKeys"},"Arrow Keys: "),i.a.createElement("input",Object.assign({class:"col-4",type:"text"},f.a.events,{tabIndex:"1",autofocus:"true",ref:function(t){return e._input=t}}))),i.a.createElement("div",{class:"row"},i.a.createElement("p",{class:n,onClick:function(){return e.gameMode("normal")}},"Normal"),i.a.createElement("p",{class:s,onClick:function(){return e.gameMode("extreme")}},"Extreme"))))}}]),t}(i.a.Component);m.a.render(i.a.createElement(y,null),document.getElementById("root"))},17:function(e,t,a){},9:function(e,t,a){e.exports=a(10)}},[[9,2,1]]]);
//# sourceMappingURL=main.517018e3.chunk.js.map