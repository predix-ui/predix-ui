(function(){'use strict';window.PxMap=window.PxMap||{};PxMap.StaticIcon=class{constructor(a={}){return this.icon=this.createIcon(a),this.icon}createIcon(a={}){let{type:d='info',styleScope:b,color:c}=a;const e=this._generateStaticIconClasses(d,b);let f='',g='';c&&(f=`background-color: ${c};`,g=`border-color: ${c} transparent transparent;`);const h=`
        <div class="map-icon-static__wrapper">
          <i class="map-icon-static__body" style="${f}"></i>
          <i class="map-icon-static__descender" style="${g}"></i>
          <i class="map-icon-static__badge"></i>
        </div>
      `,i=L.point(23,31),j=L.point(7.6,31),k=L.point(1,-31);return L.divIcon({className:e,html:h,iconSize:i,iconAnchor:j,popupAnchor:k})}_generateStaticIconClasses(a,b){const c=['map-icon','map-icon-static','map-icon-static--with-badge'];return a&&a.length&&c.push(`map-icon-static--${a}`),b&&c.push(b),c.join(' ')}};PxMap.SymbolIcon=class{constructor(a={}){return this.icon=this.createIcon(a),this.icon}createIcon(a={}){let{type:d='info',icon:e='px-nav:favorite',styleScope:b,stroke:f='currentColor',fill:g='none',strokeWidth:h='2px',color:c}=a;const i=this._generateSymbolIconClasses(d,b);let j='',k='';c&&(j=`background-color: ${c};`,k=`border-color: ${c} transparent transparent;`);const l=`
      <div class="map-icon-symbol__wrapper">
        <i class="map-icon-symbol__body" style="${j}">
          <div class="map-icon-symbol__symbol--container flex flex--middle flex--center">
            <px-icon icon="${e}" style="stroke:${f}; fill:${g}; width:100%; height:100%; stroke-width:${h}"></px-icon>
          </div>
        </i>
        <i class="map-icon-symbol__descender" style="${k}"></i>
        <i class="map-icon-symbol__badge"></i>
      </div>
      `,m=L.point(40,56),n=L.point(19.6,57),o=L.point(1,-58);return L.divIcon({className:i,html:l,iconSize:m,iconAnchor:n,popupAnchor:o})}_generateSymbolIconClasses(a,b){const c=['map-icon','map-icon-symbol','map-icon-symbol--with-badge'];return a&&a.length&&c.push(`map-icon-symbol--${a}`),b&&c.push(b),c.join(' ')}};PxMap.ClusterIcon=class{constructor(a={}){return this.icon=this.createIcon(a),this.icon}createIcon(a={}){const{count:b,countByType:c,colorsByType:d,containerSize:f=50,pathSize:g=10,borderSize:h=0,className:i='',styleScope:e}=a,j=f-(0<h?2*h-0.5:0),k=L.point(f,f),l=this._generateClusterIconSVG(c,d,j,g),m=`map-icon-cluster ${i||''} ${e||''}`,n=`
        <div class="map-icon-cluster__container" style="width: ${f}px; height: ${f}px">
          <i class="map-icon-cluster__svg">${l}</i>
          <div class="map-icon-cluster__body">${b}</div>
        </div>
      `;return L.divIcon({iconSize:k,className:m,html:n})}_generateClusterIconSVG(a,b,c,d){const e=Object.keys(a),f=e.map((c)=>({type:c,count:a[c],color:b[c]}));f.sort((c,a)=>c.count-a.count);const g=[],h=[];let j,i,k,l;for(j=0,i=e.length;j<i;j++)k=e[j],l=a[k],g.push(a[k]),h.push(b[k]);return this.createPieChart(g,h,c,d)}createPieChart(a,b,c,d){const e=Px.d3.pie(),f=e(a),g=c/2,h=Px.d3.arc().outerRadius(g).innerRadius(g-d),i=(a,c)=>`<path d="${h(a)}" fill="${b[c]}" opacity="1"></path>`;return`
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="none" viewBox="0 0 ${c} ${c}">
            <g transform="translate(${g}, ${g})">
                ${((a)=>a.map(i).join(''))(f)}
            </g>
        </svg>
      `}}})();