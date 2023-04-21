import { ref, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import CreateOrEdit from './create-or-edit-6e4898b9.mjs';
import './xxx-88517ecd.mjs';
import './server.mjs';
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
import './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const title = ref("faster you can");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h2>users-\u9ED8\u8BA4\u663E\u793A\u7684\u7EC4\u4EF6</h2>`);
      _push(ssrRenderComponent(CreateOrEdit, {
        aaa: "123456",
        title: unref(title)
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
