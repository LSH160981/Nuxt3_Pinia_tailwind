import { a as useHead } from './server.mjs';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
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
  __name: "other",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u7BA1\u7406\u5458"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<h2${ssrRenderAttrs(_attrs)}>roles - \u7BA1\u7406\u5458</h2>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/roles/other.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
