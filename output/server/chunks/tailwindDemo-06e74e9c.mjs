import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tailwindui1.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_tailwindui1 = __nuxt_component_0;
  _push(`<!--[--><div class="w-80 h-80 border-8 border-purple-600 border-solid mx-auto text-center text-yellow-400 hover:bg-lime-200 hover:text-white rounded-3xl shadow-2xl p-8 bg-[url(&#39;./assets/images/bg-lt.png&#39;)] bg-no-repeat"><h2 class="h-14 rounded-xl leading-10 bg-gradient-to-r from-cyan-500 via-violet-600 to-blue-700">tailwindDemo</h2></div>`);
  _push(ssrRenderComponent(_component_tailwindui1, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tailwindDemo/tailwindDemo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tailwindDemo = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { tailwindDemo as default };
