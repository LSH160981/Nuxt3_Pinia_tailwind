import { p as publicAssetsURL, b as buildAssetsURL } from './renderer.mjs';
import { ref, withAsyncContext, useSSRContext } from 'vue';
import { u as useFetch } from './fetch-16ffc645.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import 'vue-bundle-renderer/runtime';
import 'h3';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import './server.mjs';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _imports_0 = "" + publicAssetsURL("aaa.jpg");
const _imports_1 = "" + buildAssetsURL("s.7a5889f9.png");
const _sfc_main = {
  __name: "about",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const result = ref("");
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("https://v.api.aa1.cn/api/tiangou/index.php", {
      method: "GET",
      // lazy: true,
      onRequest({ resquest, options }) {
      },
      onResponse({ resquest, options, response }) {
        result.value = response._data.replace(/\<\/?[a-z]+\>/g, "");
        console.log("\u4E00\u79D2\u540E\u5237\u65B0\u6587\u5B57");
      }
    }, "$c6wy8KmN8o")), __temp = await __temp, __restore(), __temp);
    if (!pending.value) {
      setTimeout(() => {
        refresh();
      }, 2e3);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="w-15 flex justify-center items-center gap-2"><h1 class="text-center text-3xl text-violet-600 py-4">\u524D\u7AEF\u90A3\u4E9B\u4E8B\u60C5</h1><button class="btn btn-warning">refresh</button></div><div class="flex flex-row justify-center"><img${ssrRenderAttr("src", _imports_0)} width="200"><img${ssrRenderAttr("src", _imports_1)} class="ml-3" width="275"></div><div class="rounded-xl mt-2 p-3 text-center bg-violet-300 mx-40"><p>${ssrInterpolate(result.value)}</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
