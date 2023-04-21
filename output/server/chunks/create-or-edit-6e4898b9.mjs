import { u as useCounter } from './xxx-88517ecd.mjs';
import { useSSRContext, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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

const _sfc_main = {
  __name: "create-or-edit",
  __ssrInlineRender: true,
  props: {
    aaa: {
      type: String,
      // 类型
      default: "\u6CA1\u6709\u4F20\u53C2",
      // 默认值
      // 当然 default required 没有必要同时存在
      required: true
      // 必须传参
    },
    title: String
  },
  setup(__props) {
    const counter = useCounter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))} data-v-643df939><hr data-v-643df939><h2 data-v-643df939>create-or-edit</h2><h4 data-v-643df939>${ssrInterpolate(__props.aaa)}</h4><h4 data-v-643df939>${ssrInterpolate(__props.title)}</h4><hr data-v-643df939><p data-v-643df939>composables-Vuex:${ssrInterpolate(unref(counter))}</p><button class="btn btn-primary border" data-v-643df939>+1</button><button class="btn btn-primary border ml-2" data-v-643df939>+2</button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/create-or-edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreateOrEdit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-643df939"]]);

export { CreateOrEdit as default };
