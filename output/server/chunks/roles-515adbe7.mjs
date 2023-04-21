import { _ as __nuxt_component_0, b as __nuxt_component_1 } from './server.mjs';
import { u as useCounter } from './xxx-88517ecd.mjs';
import { u as useAppleStore } from './apple-fc04eaaf.mjs';
import { mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'ufo';
import 'defu';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const _sfc_main = {
  __name: "roles",
  __ssrInlineRender: true,
  setup(__props) {
    const counter = useCounter();
    const apple = useAppleStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      const _component_nuxt_page = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center" }, _attrs))}><h2>roles - \u89D2\u8272</h2><nav class="flex justify-center gap-3 text-xl p-3">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        "active-class": "rounded bg-violet-700 text-amber-400",
        to: "/roles/admin"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u8D85\u7EA7\u7BA1\u7406\u5458`);
          } else {
            return [
              createTextVNode("\u8D85\u7EA7\u7BA1\u7406\u5458")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, {
        "active-class": "rounded bg-violet-700 text-amber-400",
        to: "/roles/other"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u5176\u4ED6\u4EBA`);
          } else {
            return [
              createTextVNode("\u5176\u4ED6\u4EBA")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="bg-amber-400 rounded-2xl mx-16 p-3 text-2xl">`);
      _push(ssrRenderComponent(_component_nuxt_page, null, null, _parent));
      _push(`</div><div class="mt-3"><div>composables-Vuex \u6570\u636E:${ssrInterpolate(unref(counter))}</div><div>Pinia \u6570\u636E:${ssrInterpolate(unref(apple).foodNum)}</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/roles.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
