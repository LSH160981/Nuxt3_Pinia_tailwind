import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import { a as useHead } from './server.mjs';
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

const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-66e7a635><hr data-v-66e7a635><h2 data-v-66e7a635>\u521B\u5EFA\u5728 components \u4E0B\u7684\u5B50\u76EE\u5F55 \u4E5F\u662F\u5168\u5C40\u7EC4\u4EF6</h2><h2 data-v-66e7a635>\u4F7F\u7528\u7684\u65F6\u5019 \u8BF7\u7528\u9A7C\u5CF0\u547D\u540D\u6CD5</h2><h3 data-v-66e7a635>\u5C31\u80FD\u8BBF\u95EE\u5230\u8FD9\u4E2A deep dialog \u5168\u5C40\u7EC4\u4EF6\u5566</h3></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/deep/dialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-66e7a635"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-8b295db7><hr data-v-8b295db7><h1 data-v-8b295db7>\u5728 components \u4E0B\u521B\u5EFA\u7684 .vue \u9ED8\u8BA4\u5C31\u662F \u5168\u5C40\u7EC4\u4EF6</h1><h2 data-v-8b295db7>GlobalTest \u5168\u5C40\u7EC4\u4EF6 \u4E0D\u9700\u8981\u5F15\u5165</h2></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GlobalTest.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-8b295db7"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u9996\u9875"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DeepDialog = __nuxt_component_0;
      const _component_GlobalTest = __nuxt_component_1;
      _push(`<!--[--><h2>App\u9ED8\u8BA4\u663E\u793A\u7684\u6587\u4EF6</h2>`);
      _push(ssrRenderComponent(_component_DeepDialog, null, null, _parent));
      _push(ssrRenderComponent(_component_GlobalTest, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
