/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer/app-drawer.html","a538e39bf60c9900d855313f041f4a7e"],["/bower_components/app-localize-behavior/app-localize-behavior.html","724815faa103810e7bd0054467d240d9"],["/bower_components/app-route/app-location.html","915d16de58312b589491248b8bf47201"],["/bower_components/app-route/app-route-converter-behavior.html","46b735fc8f32a74ddfdef5b6697a6715"],["/bower_components/intl-messageformat/dist/intl-messageformat.min.js","7399b33d4036b8fbaf5e7c780923501e"],["/bower_components/iron-ajax/iron-ajax.html","368e16755d86180f5c187ad8fa693302"],["/bower_components/iron-ajax/iron-request.html","39a0c4ed0257d3c820de80addd9e20fd"],["/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","9d237b4d4cf644a4dd37c60335c40ffd"],["/bower_components/iron-collapse/iron-collapse.html","c7742b45dcb1588aaccf3c0407c7bc22"],["/bower_components/iron-flex-layout/iron-flex-layout.html","80530e2b3f36e312de3f7fcb572195ca"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","8664686217598eca5ef6e335917b4f3e"],["/bower_components/iron-icon/iron-icon.html","093ad4ac9b3899dc51b3ecd6895c1462"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","62f9ba0c5e56babe7d51b0e7e66fbb28"],["/bower_components/iron-label/iron-label.html","b04fc03baff994403c10dc2f3c88c1cc"],["/bower_components/iron-location/iron-location.html","f1dce10105d3249607522580626b32a6"],["/bower_components/iron-location/iron-query-params.html","4a47baa157ea3fdd25d7cd1f2df4b60d"],["/bower_components/iron-media-query/iron-media-query.html","68909d114753991b22e832a46c779989"],["/bower_components/iron-meta/iron-meta.html","98151e38523179d9e0c3f2145ddc05fd"],["/bower_components/iron-pages/iron-pages.html","451c88e1c83c7d21e50b1b3ae6ed9b69"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","010350471b2567735a5df8cea781dd78"],["/bower_components/iron-selector/iron-multi-selectable.html","919e85334ed89a81b37d0e73f5747154"],["/bower_components/iron-selector/iron-selectable.html","0d6799c388e16c1ff097ce567ce748c4"],["/bower_components/iron-selector/iron-selection.html","8d1cfd8bf68d436a221860b1b5fc500e"],["/bower_components/iron-selector/iron-selector.html","c8946dcd397168b6ba3248f4ce7d0ca9"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","2407cbbce90cf583f6657bac37bae2f9"],["/bower_components/polymer/lib/elements/array-selector.html","e7400ead586196e010e88f863b2d50a3"],["/bower_components/polymer/lib/elements/custom-style.html","b3436952c46dc3fb996e935e3930ac0e"],["/bower_components/polymer/lib/elements/dom-bind.html","491de1014f4695e2cd03ca13a7a1ae01"],["/bower_components/polymer/lib/elements/dom-if.html","dd402e3b05e86738d64e4d55d44ded66"],["/bower_components/polymer/lib/elements/dom-module.html","68d0e0158bf0113ca41597ff4e303104"],["/bower_components/polymer/lib/elements/dom-repeat.html","0490d46e5a9677097df82c78f6f07801"],["/bower_components/polymer/lib/legacy/class.html","8338779de0ea434f40ed05579479d690"],["/bower_components/polymer/lib/legacy/legacy-element-mixin.html","159d955e5cf5b0c43144ead8624d5991"],["/bower_components/polymer/lib/legacy/mutable-data-behavior.html","f7f5600f014c197374ea3abc17c2f6e9"],["/bower_components/polymer/lib/legacy/polymer-fn.html","6a200e59141ca221922509551558878a"],["/bower_components/polymer/lib/legacy/polymer.dom.html","7448a798e73a0ceeeb738be9caa3b6bd"],["/bower_components/polymer/lib/legacy/templatizer-behavior.html","1b1e827b6551ef24865f7cd44b4779fb"],["/bower_components/polymer/lib/mixins/dir-mixin.html","1d62bcea5261bdccb034fdff9531ac98"],["/bower_components/polymer/lib/mixins/disable-upgrade-mixin.html","3514e064b4e4a95b6c5550247d84294d"],["/bower_components/polymer/lib/mixins/element-mixin.html","f2994eebe9d9033ffdfb5e3a21a9b40a"],["/bower_components/polymer/lib/mixins/gesture-event-listeners.html","b3addaa4d9ed492bfebb3450fb9f8a96"],["/bower_components/polymer/lib/mixins/mutable-data.html","966c16ad383384922754fb9545574d7e"],["/bower_components/polymer/lib/mixins/properties-changed.html","9ac5d3ddf0f3b9ac8df797b2f31bab87"],["/bower_components/polymer/lib/mixins/properties-mixin.html","c1988354e272ad2680c13daf84677635"],["/bower_components/polymer/lib/mixins/property-accessors.html","13944f7834a0ce67168a95ccf60f997b"],["/bower_components/polymer/lib/mixins/property-effects.html","cd8ac161371c4a2f42efe32705c0ba04"],["/bower_components/polymer/lib/mixins/template-stamp.html","cf0e8fcafc4a566c544fb5e5dc881b08"],["/bower_components/polymer/lib/utils/array-splice.html","651b65a59b5308e6cf810834900ec047"],["/bower_components/polymer/lib/utils/async.html","db3351a8b471ab9daeb17f0e84f84453"],["/bower_components/polymer/lib/utils/boot.html","945325f7bfe57422b18b1c1edc1c6a8e"],["/bower_components/polymer/lib/utils/case-map.html","4d949c6dc8b68dd6f01bf54f06b3f37c"],["/bower_components/polymer/lib/utils/debounce.html","46dc542bb921216654bc2c9632de08c7"],["/bower_components/polymer/lib/utils/flattened-nodes-observer.html","0047b0c3ada602bf75fa01bd01e065b1"],["/bower_components/polymer/lib/utils/flush.html","59432a8c1a4c4c954acbbce3548ecdf9"],["/bower_components/polymer/lib/utils/gestures.html","1be908db18bc81b7badb05f8af121a40"],["/bower_components/polymer/lib/utils/html-tag.html","d1a4b04b72e031cf55c562befaf1f374"],["/bower_components/polymer/lib/utils/import-href.html","dc8d73115ba4fd524cf0f772f37ae88e"],["/bower_components/polymer/lib/utils/mixin.html","ea73b9e358c3c9ba52bf1d664aef6deb"],["/bower_components/polymer/lib/utils/path.html","e3bc46f6e1382fb0d786ee3c4db53460"],["/bower_components/polymer/lib/utils/render-status.html","b5ae2f5b05f7e501316c6e44546a4430"],["/bower_components/polymer/lib/utils/resolve-url.html","270d213e0bddcb96de48fae1af86c614"],["/bower_components/polymer/lib/utils/settings.html","bc7fe071da84e6183806a4f73cce2045"],["/bower_components/polymer/lib/utils/style-gather.html","5faa6de5af7836c386bf5f621835a10f"],["/bower_components/polymer/lib/utils/templatize.html","cb791d6fabb82d31c2b349edb8274c44"],["/bower_components/polymer/lib/utils/unresolved.html","48732bcda92c5b9c591d75f7c036f7a5"],["/bower_components/polymer/polymer-element.html","729b4eaa971fffbd7c0f9d08ce011c0c"],["/bower_components/polymer/polymer.html","8657db55b321f3ab36b7cebed986d48f"],["/bower_components/promise-polyfill/Promise.js","6d72e76387d06f828797b0ce05a2feb7"],["/bower_components/promise-polyfill/promise-polyfill-lite.html","cc07ceb4765b61c77aee3f69d87bd620"],["/bower_components/px-alert-label/css/px-alert-label-styles.html","e25e853c47a4fe7d4bb78188e6a79ff5"],["/bower_components/px-alert-label/px-alert-label.html","a86248cfab37a0f0852eaee29d686f29"],["/bower_components/px-alert-message/css/px-alert-message-styles.html","4c490887dd5d2279d52913bbd4d1c774"],["/bower_components/px-alert-message/px-alert-message.html","e3735afa609a7c3fcadd56e0ac3a0f2f"],["/bower_components/px-dark-demo-theme/px-dark-demo-theme-styles.html","6e60c8727666c705843c9039467e262f"],["/bower_components/px-dark-theme/px-dark-theme-styles.html","c5ed4d8fd391c1a9eaeaf9bb3ef66ceb"],["/bower_components/px-demo/css/px-demo-content-helper-styles.html","149ed9027d89df5f98b44d674d34663b"],["/bower_components/px-demo/css/px-demo-styles.html","0570ed1db0ce10db8ba706b450f8cb49"],["/bower_components/px-demo/monogram-wdmk.png","cbe89427cbac5735ba8994e2fefab6f8"],["/bower_components/px-demo/px-demo-api-viewer.html","cc08f05a77ecc6be5a1941865ea5da9d"],["/bower_components/px-demo/px-demo-behaviors.html","b1c729db188f5f6b51dad2b1527464e9"],["/bower_components/px-demo/px-demo-code-editor.html","42a665ef50199db1118a331e8ab5c30a"],["/bower_components/px-demo/px-demo-collection.html","d1044e9bbc9871d2a3db7eccc5b7f8ac"],["/bower_components/px-demo/px-demo-component-snippet.html","1886b7da65258a88c339aa06f5316ad3"],["/bower_components/px-demo/px-demo-configs.html","dab1b39c3cf6f2c69190c0c15d3cbadb"],["/bower_components/px-demo/px-demo-footer.html","dedeeaf1e5121eaf4ccdcc4996b1d9a7"],["/bower_components/px-demo/px-demo-header.html","8468b53f8914ec4e48c718d37f7d3e2b"],["/bower_components/px-demo/px-demo-interactive.html","c97539b4a186ee85aaeeccaedbf76a18"],["/bower_components/px-demo/px-demo-props.html","b9b05e096c908a86106bb53cb32c7660"],["/bower_components/px-demo/px-demo-theme-switcher.html","57b7d6f067beedbdb913a030a0dcd360"],["/bower_components/px-demo/px-demo-theme-util.html","83c90fac14e6de0b979e303987e1cdce"],["/bower_components/px-demo/px-demo.html","4b7d9b2d5b13961811ea7b38206fd157"],["/bower_components/px-icon-set/px-icon-set-communication.html","019fc2e448334c957a798a553921c50c"],["/bower_components/px-icon-set/px-icon-set-document.html","4de53438e090014a5b53c1cd29b09967"],["/bower_components/px-icon-set/px-icon-set-feature.html","bd337c0303d6816e8642d030498797b3"],["/bower_components/px-icon-set/px-icon-set-navigation.html","fc08a502417ffc650dd288694f00d4ad"],["/bower_components/px-icon-set/px-icon-set-object.html","e734c37225f7da3bdfa453f4aeb9f998"],["/bower_components/px-icon-set/px-icon-set-utility.html","6e26c17034246b360a973284819cb466"],["/bower_components/px-icon-set/px-icon-set-vis.html","babe97dfa6a93906663feedc64253070"],["/bower_components/px-icon-set/px-icon-set.html","9fb51f79e4e1e195d1d123c82c8a8fae"],["/bower_components/px-icon-set/px-icon.html","6c94f54dee2f7cc9e3e5b3444d309b8d"],["/bower_components/px-spinner/css/px-spinner-styles.html","270ab579dcf334cd7addce22c3bb85b6"],["/bower_components/px-spinner/demo/px-spinner-demo.html","a40ed65cc3fc04df5451cb56e74683b4"],["/bower_components/px-spinner/px-modernizr.html","088c3ccdb499b115153f5ddc4bc16217"],["/bower_components/px-spinner/px-spinner.html","2f4f596e8a5ba8f997dd7468277d7e19"],["/bower_components/px-theme/px-theme-local-fonts-styles.html","463c7a17ec5abf285a2e62d377eb0b4a"],["/bower_components/px-theme/px-theme-styles.html","dca15ebbfcd6b33784800f45b2941f43"],["/bower_components/px-toggle/css/px-toggle-styles.html","9be9e62c5da9fa9f62478a0938b1ec58"],["/bower_components/px-toggle/demo/px-toggle-demo.html","d0dff1ddbb63422b64175adfd1a28d74"],["/bower_components/px-toggle/dist/px-toggle.js","6ec2d7929062c86b993b208be5939616"],["/bower_components/px-toggle/px-toggle.es6.js","3162b0145b80af144d8e24fd3fb0d963"],["/bower_components/px-toggle/px-toggle.html","f5657dbbc25de6a60572c4b3968e3c4e"],["/bower_components/px-typography-design/type/GEInspiraSans-Bold.woff","2e53145e77ccfd1ab1b30076782adb56"],["/bower_components/px-typography-design/type/GEInspiraSans.woff","a443694e5dd43b3ced15bee2a1a67366"],["/bower_components/shadycss/apply-shim.html","75f54922d2507d0c43bdf946149c38b1"],["/bower_components/shadycss/apply-shim.min.js","eabbd9af22a6d2c0fd46e56f50eefff8"],["/bower_components/shadycss/custom-style-interface.html","ceb0842ff6c53d8d13d6cf2345f41490"],["/bower_components/shadycss/custom-style-interface.min.js","9d7ccbd58300a6ef52a9108de2b6cb7f"],["/bower_components/webcomponentsjs/custom-elements-es5-adapter.js","a5043c1d0dd16d84558ee6cc2276212e"],["/bower_components/webcomponentsjs/webcomponents-loader.js","f7eb9862b1725aef7e59f8584c2a2efb"],["/css/predix-ui-hero-animation-icons-styles.html","b60493a790159ca7036ea553b914f0b0"],["/css/predix-ui-hero-animation-styles.html","1f7b95e93e954228fa46bec298c08429"],["/css/predix-ui-homepage-styles.html","0e1ee3c78f98f1199e15359d8b2d085b"],["/css/px-catalog-api-search-styles.html","f18d5e06a376d2af73232450656184ff"],["/css/px-catalog-code-snippet-styles.html","0b3adfd22036ef00fcca09e84fcfca91"],["/css/px-catalog-code-styles.html","30bf6c32315ba64fba4a3b4768632da6"],["/css/px-catalog-component-gallery-styles.html","b75f4431f24fb8f28da252b4053822d0"],["/css/px-catalog-footer-styles.html","307788d4b64e4c216f24111f6ac23d20"],["/css/px-catalog-page-styles.html","632be3ed75ea04e94437ce8af93e46b7"],["/css/px-catalog-styles.html","abe29dfab77fa96fcd4b6b6a7eb719b0"],["/css/px-catalog-theme-styles.html","8fed66cb2b5f6d102ac9f19f1dd6c7f7"],["/css/px-catalog-treenav-link-styles.html","3d0f6f1f8ea7529b16e5c89644c5847e"],["/css/px-catalog-treenav-styles.html","9c430a6d6bd392028055f0e1b014b503"],["/css/px-catalog-version-finder-styles.html","5db60b27e777e346fb4357c34b89abc3"],["/css/px-cla-styles.html","3e418eefe9312aa5a60d279423a08bba"],["/css/px-hero-image-styles.html","1a8866c8f8ded4773ed99f2b8e4fd030"],["/css/px-sb-list-styles.html","559ba811a1dcd7262681e41436e330b8"],["/css/px-sb-styles.html","5255cba5cff44a4c7c9ebce256154dda"],["/elements/px-catalog-api-search/lunr.js","e10bb62e9c1d5ad81f85d89fc71d0c93"],["/elements/px-catalog-api-search/px-catalog-api-search.html","fab1da5619d0986727cdcdda730cf4e4"],["/elements/px-catalog-code-snippet/px-catalog-code-snippet.html","318b65fccc9e2f92250dee03489084d4"],["/elements/px-catalog-code-snippet/px-catalog-prism.html","e4c31b2270083b145dd5d67b72e127cd"],["/elements/px-catalog-page/px-catalog-page-behavior.html","1b91cc7762b41f06020bb8d7f9b9c4f9"],["/elements/px-catalog-page/px-catalog-page-elements.html","106162cd7fae321fdab4229bce375408"],["/elements/px-catalog-router/px-catalog-router.html","fe6c2c3a3ec59b8e1b385945f2300e8a"],["/elements/px-catalog-treenav/px-catalog-treenav-link.html","cc16fd8f2aa7c77375409a210c7574db"],["/elements/px-catalog-treenav/px-catalog-treenav.html","faae344347900bd8d544297e43fdf1b8"],["/elements/px-catalog-version-finder/px-catalog-version-finder.html","7c24d82a7a92e802ea30cc1bf85f950c"],["/elements/px-catalog-version-finder/versions.json","4e1c4a84c97bf8cf31d04ed7b01ee221"],["/elements/px-catalog/pages.json","dd41e689c837c4eaf5ad0ccd35b766b5"],["/elements/px-catalog/px-catalog-page-viewer.html","f1e6abd5fc3f2718ff8447fd50ace64a"],["/elements/px-catalog/px-catalog-theme-switcher.html","8b092054e50b6406d692119eb73b2209"],["/elements/px-catalog/px-catalog.html","a92d1353a0a5d62477a067e3c521354a"],["/elements/px-demo-theme-switcher/css-parse.js","e8a8ced0df6afe29a0af0b21911e3f96"],["/elements/px-demo-theme-switcher/px-demo-theme-util.html","dbb991c151d4a4a432b512448defd964"],["/elements/px-demo-theme-switcher/style-properties.js","84cdfc680ec483d95ccb7dfad85dddcf"],["/elements/px-hero-image/predix-ui-hero-animation-airplane.html","76de91441d06c4387c5eb04c513a7c7b"],["/elements/px-hero-image/predix-ui-hero-animation-chart.html","0477a631c564d4df68e9f74bce3590f6"],["/elements/px-hero-image/predix-ui-hero-animation-clouds.html","621f609671e188c39778cc8bc25d532c"],["/elements/px-hero-image/predix-ui-hero-animation-gauge.html","504a4f0e28d84e851bd540d63e09e432"],["/elements/px-hero-image/predix-ui-hero-animation-turbine.html","333a5d992645354513a67f99e244e4b3"],["/elements/px-hero-image/predix-ui-hero-animation.html","c2c5fffcdbb70e715088444f6747f576"],["/elements/px-hero-image/px-hero-image.html","463326fc4bc8623c0848d3f8f42ddcbf"],["/elements/px-lazy-load/px-lazy-load-behavior.html","f2c067d660d52ea9c09d8258dcf6ddd3"],["/elements/px-site-notifications/px-sw-notification.html","55e3212b11ce42971ef9e42dc8f3f327"],["/index.html","f75c2557c019684a8fd2447075f3a4a4"],["/manifest.json","c9b10132c13ac81f601d08657fbb65ae"],["/pages/about/introduction.html","2ec0bafc34cd5343e02d7fb862f73ca8"],["/pages/about/release-notes.html","df04e172852034423360f72e47bdd708"],["/pages/about/resources.html","5fa37c1381f96da3f4e65d0e9eee8e5d"],["/pages/about/sample-app.html","1031e7ebcc074a53ccf0b821b8828507"],["/pages/about/start-designing.html","b9e5a90542d98dfe73f3f51470c3dfb9"],["/pages/about/start-developing.html","eb592e50bd26bedc13b16c8f996f2610"],["/pages/app-data.json","072f47dd4649db0343b734fbfdd016df"],["/pages/build-data.json","10345f3792348567c11b76f1d20af41e"],["/pages/component-gallery/component-data.json","1e82e8dfba997ab597abd449d9f27f42"],["/pages/component-gallery/component-gallery.html","5e6764cb2c87f08642c77f2f1aa2b589"],["/pages/component-gallery/repo-data.json","56ee44ebc84a16fbfc59230a4d8c3992"],["/pages/component-gallery/tile-data.json","a4179e221cd7c6a665e3229ffc3c5b9b"],["/pages/design/Predix_Iconography_Guidelines.pdf","fa95212f14ccd2718637cdce132859fe"],["/pages/design/color.html","be6fa14e308dbbe3493ce7250194178e"],["/pages/design/data-vis.html","fcccd3238e0d05e01da6c7c4dfce2430"],["/pages/design/design-principles.html","ecb041669d1b3bcf43bec7a9207e0632"],["/pages/design/elevation-layering.html","eb8b27124ee659076bc4320c36abd0b2"],["/pages/design/forms.html","379f72560786fa94d4d43130a1f87fb7"],["/pages/design/iconography.html","39fbbdd26e5bba70a92583d82947cda1"],["/pages/design/layout-examples.html","2c480ace38f140ac2bc7d8bd14703ef6"],["/pages/design/materiality.html","6f2f627a0e07efb5c1a42745c27524a3"],["/pages/design/mobile.html","8daf6fc4c41f82d859a398149eb9f170"],["/pages/design/navigation.html","cf38d003e3edc5b5afe9e702d5ad6b77"],["/pages/design/page-layout.html","f41df0ea72eb032009dc06ca5866f8da"],["/pages/design/typography.html","f0477528b848b64320e225c344dca55c"],["/pages/design/writing.html","bd37004c56ed407166f411856faf7d9f"],["/pages/develop/cla.html","c09c669ad7b6d36715f96e0f09ad2cf1"],["/pages/develop/context-browser.html","6f0f9159a902ff974a1d0767509a00ad"],["/pages/develop/contribution.html","a490a4b9e5c802c9c37c2d4f36b91962"],["/pages/develop/data-grid/cell-renderers.html","ebdf5152a405b27ddc68cd593ee27f8c"],["/pages/develop/data-grid/define-columns.html","a673cedcd38ef0c7f309448144a9b092"],["/pages/develop/data-grid/expandable-rows.html","d8a7e1ec35552abcc569f4c3a22d21ab"],["/pages/develop/data-grid/load-data.html","bbd5ef9ab3ff5268d546c032abe2ba81"],["/pages/develop/data-grid/overview.html","0152880de6b0dae1075b1bb21a5fa3f9"],["/pages/develop/datetime-changes.html","2b4e83d20f79d30764ce937e42f9c31f"],["/pages/develop/frameworks/angular.html","97d89b259d64c9f20e89f6c80a232ca4"],["/pages/develop/frameworks/vue.html","e92cdc4de9af29c5738c501c613a888e"],["/pages/develop/icons.html","ffc19f7dfc7a383680c0438eaf697cd2"],["/pages/develop/internationalization.html","6047245fd8de7e696dfadbee125ee2ab"],["/pages/develop/localizable-strings.html","fcd9e11395750a74b67fca2dd9b1a9b5"],["/pages/develop/map.html","ee3b3b133e8a29e29ce609c747dc8bea"],["/pages/develop/migrate/api-changes.html","ecfaa79bcca3a6b3266f151539f91578"],["/pages/develop/migrate/icons.html","8340ed517d044867b5b6e483f37e2ed9"],["/pages/develop/migrate/theme.html","5eb35dae5555d015c872fff5a3e3dcb3"],["/pages/develop/migrate/vis.html","48b8dbfe21e0f24da4e981da65f3f857"],["/pages/develop/mobile.html","6d6b838b721a422cbf35ad763feff901"],["/pages/develop/stacking-context.html","a3c6fd3ef7dc75999ecce993e4b3246d"],["/pages/develop/theme.html","a0d012e1fad5aafec5d61a5a038674b3"],["/pages/develop/transpile.html","371652c6c4de4d7d931fac32e39d55ca"],["/pages/develop/vis/annotations.html","89893fa6580c85e0c64167fe18fe438b"],["/pages/develop/vis/configure-axis.html","97de24e4199a0c55236dacf1d07c14a3"],["/pages/develop/vis/configure-charts.html","de4c00e81ef1e9a30f1572de9dbb1243"],["/pages/develop/vis/configure-toolbar.html","7e251712078ea8762957dc6303451662"],["/pages/develop/vis/configure-toolbar_data.json","b71c8fc843134875c54dea8a27d25324"],["/pages/develop/vis/crosshair.html","90f4db1e7ffac968bb009268bef4bfd7"],["/pages/develop/vis/framework-overview.html","a5477d40b283b694c0d67cfccce489fa"],["/pages/develop/vis/multi-axis.html","530c7581c8517ff3fc1a99a105faf1ca"],["/pages/develop/vis/terminology.html","1864df055cb05f1de8d5bba80d33bba5"],["/pages/develop/vis/web-workers.html","574f3d90313c7c058dfd392a80bd44be"],["/pages/home.html","47759e59f43d88d5a9f44be4907de2e7"],["/pages/tools/api-search.html","a71fefab5c36b1e6b14500bd0557d4b7"],["/pages/tools/version-finder.html","84f82de9e64e2cc883b9b7582082762f"],["/type/GEInspiraSans-Bold.eot","76ed48fc07259af776ed63253194a1bf"],["/type/GEInspiraSans-Bold.svg","c88faaefab3e7c6afc481190d77c3b94"],["/type/GEInspiraSans-Bold.svgz","a4800690c3ca1721bdd8b7f3bc498a6d"],["/type/GEInspiraSans-Bold.ttf","74d32c6b887369a416327bf803fc885f"],["/type/GEInspiraSans-Bold.woff","2e53145e77ccfd1ab1b30076782adb56"],["/type/GEInspiraSans-Bold.woff2","a85d4c51fda3747ae393555efec8bc69"],["/type/GEInspiraSans-BoldItalic.eot","1e01b72d96a3c6d2db320cabc0c2818e"],["/type/GEInspiraSans-BoldItalic.svg","906d7807743934e8eefc104d53900275"],["/type/GEInspiraSans-BoldItalic.svgz","e46f94795c4d4d94ba3daf9b21a45dc9"],["/type/GEInspiraSans-BoldItalic.ttf","4cd1a6d1c933bedec92b06025be3b9ed"],["/type/GEInspiraSans-BoldItalic.woff","f5222dfa3e2f8c6ab178130e79e5a938"],["/type/GEInspiraSans-BoldItalic.woff2","1928a59996e51036320718c0a1b7d427"],["/type/GEInspiraSans-Italic.eot","58cef27cba3b88704f9bdf83946b8c46"],["/type/GEInspiraSans-Italic.svg","7f7d36798d52af5fb69fa535b07baf32"],["/type/GEInspiraSans-Italic.svgz","583f3302fcde887ceb6c1697901dff94"],["/type/GEInspiraSans-Italic.ttf","16bf3a90afe693ca20d1d125303dd65a"],["/type/GEInspiraSans-Italic.woff","4389f2fffc6683de1defcbac2b264ac3"],["/type/GEInspiraSans-Italic.woff2","640ea5c2135498739950c4cffbbbcd8d"],["/type/GEInspiraSans.eot","268234e728bca77250a0a95fbfb8b66e"],["/type/GEInspiraSans.svg","83bd30add447f3ade981d09c19dbe8d7"],["/type/GEInspiraSans.svgz","9432299021b1db7e9f1084f8e4bdb67f"],["/type/GEInspiraSans.ttf","4e2e3ae31004c38b2b4d903bcbc942b0"],["/type/GEInspiraSans.woff","a443694e5dd43b3ced15bee2a1a67366"],["/type/GEInspiraSans.woff2","7fabd773b5033881cd909da1ca34b275"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([null], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("bower_components/**", toolbox.fastest, {});
toolbox.router.get("img/**", toolbox.fastest, {});




