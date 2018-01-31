(function(){'use strict';window.PxMapBehavior=window.PxMapBehavior||{},PxMapBehavior.PopupImpl={properties:{closeOnControlInteract:{type:Boolean,value:!1}},addInst(a){if(a&&a.getPopup&&a.getPopup()!==this.elementInst){a.bindPopup(this.elementInst);const b=this._handleControlClick.bind(this,a);this.bindEvents({controlclick:b},a._mapToAdd)}},removeInst(a){a&&a.getPopup&&a.getPopup()===this.elementInst&&a.unbindPopup(this.elementInst)},_handleControlClick(a){this.closeOnControlInteract&&a&&a.closePopup&&a.closePopup()}},PxMapBehavior.Popup=[PxMapBehavior.Layer,PxMapBehavior.PopupImpl],PxMapBehavior.InfoPopupImpl={properties:{title:{type:String,observer:'shouldUpdateInst'},description:{type:String,observer:'shouldUpdateInst'},imgSrc:{type:String,observer:'shouldUpdateInst'}},createInst(a){return new PxMap.InfoPopup(a)},updateInst(a,b){let c={};a.title!==b.title&&(c.title=b.title),a.description!==b.description&&(c.description=b.description),a.imgSrc!==b.imgSrc&&(c.imgSrc=b.imgSrc),Object.keys(c).length&&this.elementInst.updateSettings(c)},getInstOptions(){return{title:this.title,description:this.description,imgSrc:this.imgSrc,styleScope:this.isShadyScoped()?this.getShadyScope():void 0}}},PxMapBehavior.InfoPopup=[PxMapBehavior.Popup,PxMapBehavior.InfoPopupImpl],PxMapBehavior.DataPopupImpl={properties:{title:{type:String,observer:'shouldUpdateInst'},data:{type:Object,value:function(){return{}},observer:'shouldUpdateInst'}},canAddInst(){return this.data&&'object'===typeof this.data&&Object.keys(this.data).length},createInst(a){return new PxMap.DataPopup(a)},updateInst(a,b){let c={};a.title!==b.title&&(c.title=b.title),a.dataHash!==b.dataHash&&(c.data=b.data),Object.keys(c).length&&this.elementInst.updateSettings(c)},getInstOptions(){let a=this._getValidData();return{title:this.title,data:a,dataHash:JSON.stringify(a),styleScope:this.isShadyScoped()?this.getShadyScope():void 0}},_getValidData(){return'object'===typeof this.data?this.data:(console.log(`PX-MAP CONFIGURATION ERROR:
          You entered an invalid \`data\` attribute for ${this.is}. You must pass a valid object.
          An attribute of type \`${typeof this.data}\` was passed.`),{})}},PxMapBehavior.DataPopup=[PxMapBehavior.Popup,PxMapBehavior.DataPopupImpl],window.PxMap=window.PxMap||{};class a extends L.Popup{constructor(a={}){return super(),this._createPopup(a),this}onAdd(a){if(a.__addShadyScope&&!Polymer.Element){var b=this.getPane(),c=b.appendChild;b.appendChild=function(c){a.__addShadyScope(c,!1);let e=Polymer.dom(b);e.appendChild(c)}}L.Popup.prototype.onAdd.call(this,a),a.__addShadyScope&&!Polymer.Element&&(b.appendChild=c)}_updateContent(){if(this._map&&this._map.__addShadyScope&&this._content.length){var a=this._contentNode,b={innerHTML:null};this._contentNode=b}L.DivOverlay.prototype._updateContent.call(this),this._map&&this._map.__addShadyScope&&this._content.length&&('string'===typeof b.innerHTML&&(Polymer.dom(a).innerHTML=b.innerHTML),this._contentNode=a)}_createPopup(a={}){this.settings=a;const{title:b,description:c,imgSrc:d,styleScope:e}=a,f=this._generatePopupContent(b,c,d),g=`map-popup-info ${e||''}`;this.initialize({className:g,maxWidth:400,minWidth:300}),this.setContent(f)}_generatePopupContent(a,b,c){let d=(a,...b)=>b.length&&b[0]!==void 0?a.call(this,...b):'';return`
        <section class="map-box-info">
          ${d((a)=>`
        <div class="map-box-info__image">
          <img src="${a}" />
        </div>
      `,c)}
          <div class="map-box-info__content">
            ${d((a)=>`
        <p class="map-box-info__title">${a}</p>
      `,a)}
            ${d((a)=>`
        <p class="map-box-info__description">${a}</p>
      `,b)}
          </div>
        </section>
      `}updateSettings(a={}){Object.assign(this.settings,a);const{title:b,description:c,imgSrc:d,styleScope:e}=this.settings,f=this._generatePopupContent(b,c,d);this.setContent(f),this.update()}}PxMap.InfoPopup=a;class b extends L.Popup{constructor(a={}){return super(),this._createPopup(a),this}onAdd(a){if('object'===typeof this.settings.data&&0!==Object.keys(this.settings.data).length){if(a.__addShadyScope&&!Polymer.Element){var b=this.getPane(),c=b.appendChild;b.appendChild=function(c){a.__addShadyScope(c,!1),Polymer.dom(b).appendChild(c)}}L.Popup.prototype.onAdd.call(this,a),a.__addShadyScope&&!Polymer.Element&&(b.appendChild=c)}}_updateContent(){if(this._map&&this._map.__addShadyScope&&this._content.length){var a=this._contentNode,b={innerHTML:null};this._contentNode=b}L.DivOverlay.prototype._updateContent.call(this),this._map&&this._map.__addShadyScope&&this._content.length&&('string'===typeof b.innerHTML&&(Polymer.dom(a).innerHTML=b.innerHTML),this._contentNode=a)}_createPopup(a={},b={}){this.settings=a;const{title:c,data:d,styleScope:e}=a,f=this._generatePopupContent(c,d),g=`map-popup-data ${e||''}`;this.initialize({className:g,maxWidth:400,minWidth:300}),this.setContent(f)}_generatePopupContent(a,b){let c=(a,...b)=>b.length&&b[0]!==void 0?a.call(this,...b):'',d=(a,b)=>`
        <div class="map-data-box__table__cell"><p>${a}</p></div>
        <div class="map-data-box__table__cell"><p>${b}</p></div>
      `;return`
        <section class="map-box-data">
          ${c((a)=>`
        <div class="map-data-box__header">
          <h3 class="map-data-box__header__text">${a}</h3>
        </div>
      `,a)}
          ${c((a)=>{let b=Object.keys(a).reduce((b,c)=>b.concat([d(c,a[c])]),[]).join('');return`
          <div class="map-data-box__table">
            ${b}
          </div>
        `},b)}
        </section>
      `}updateSettings(a={}){Object.assign(this.settings,a);const{title:b,data:c}=this.settings,d=this._generatePopupContent(b,c);this.isOpen()&&0===Object.keys(c).length&&this._close(),this.setContent(d),this.update()}}PxMap.DataPopup=b})();