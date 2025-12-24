<template>
  <div class="viewer" :class="{ active: visible }" aria-hidden="true" @click="onBackdrop">
    <div class="viewer-inner">
      <!-- 加载遮罩 -->
      <div class="loading-mask" v-show="loading">
        <div class="spinner" aria-label="正在加载"></div>
      </div>

      <img
        ref="imgRef"
        :src="src"
        alt="预览"
        decoding="async"
        @load="onImgLoad"
        @error="onImgError"
      />

      <button class="close" @click="close">关闭 Esc</button>
      <div class="viewer-toolbar">
        <button class="tbtn" @click="fitView">适配</button>
        <button class="tbtn" @click="zoomIn">放大 +</button>
        <button class="tbtn" @click="zoomOut">缩小 -</button>
        <button class="tbtn" @click="resetView">重置</button>
        <a class="tbtn" :href="src" target="_blank" rel="noopener">原图</a>
      </div>
      <div class="hint">滚轮缩放（向前滚动放大），按住拖拽。双击重置。点击空白处关闭。</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const ZOOM_MAX = 24;
const ZOOM_MIN = 0.1;
const ZOOM_STEP_IN = 1.15;
const ZOOM_STEP_OUT = 0.87;

const visible = ref(false);
const src = ref('');
const loading = ref(false);              // 加载状态
const imgRef = ref<HTMLImageElement | null>(null);

const state = { scale: 1, tx: 0, ty: 0, drag: false, sx: 0, sy: 0, lx: 0, ly: 0 };
let raf: number | null = null;

function apply() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    if (imgRef.value) {
      imgRef.value.style.transform = `translate(${state.tx}px,${state.ty}px) scale(${state.scale})`;
      imgRef.value.style.transformOrigin = 'center center';
    }
    raf = null;
  });
}
function clampScale(s: number) { return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, s)); }
function resetView() { state.scale = 1; state.tx = 0; state.ty = 0; apply(); }
function fitView() { resetView(); }

async function open(newSrc: string) {
  visible.value = true;
  loading.value = true;     // 打开时进入加载
  src.value = newSrc;
  resetView();

  // 处理缓存命中：src 设置后，如果图片已缓存并且 complete 为真，手动触发完成
  await nextTick();
  const img = imgRef.value;
  if (img && img.complete) {
    // 有些浏览器 complete 但还没成功解码，尝试 decode
    try {
      await (img.decode?.() ?? Promise.resolve());
      onImgLoad();
    } catch {
      // decode 失败仍然交给 load/error 事件
    }
  }
}
function close() {
  visible.value = false;
  src.value = '';
  loading.value = false;
}

function onImgLoad() {
  loading.value = false;
}
function onImgError(e: Event) {
  loading.value = false;
  console.error('图片加载失败：', (e.target as HTMLImageElement)?.src);
}

function zoomAt(cx: number, cy: number, zoomIn: boolean) {
  const prev = state.scale;
  const next = clampScale(prev * (zoomIn ? ZOOM_STEP_IN : ZOOM_STEP_OUT));
  const rect = imgRef.value!.getBoundingClientRect();
  const ox = cx - (rect.left + rect.width / 2);
  const oy = cy - (rect.top + rect.height / 2);
  state.tx -= (ox * (next - prev)) / next;
  state.ty -= (oy * (next - prev)) / next;
  state.scale = next;
  apply();
}

function onWheel(e: WheelEvent) {
  e.preventDefault();
  const isZoomIn = e.deltaY < 0;  // 前滚放大
  zoomAt(e.clientX, e.clientY, isZoomIn);
}
function zoomIn() {
  const rect = imgRef.value!.getBoundingClientRect();
  zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
}
function zoomOut() {
  const rect = imgRef.value!.getBoundingClientRect();
  zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, false);
}

function onPointerDown(e: PointerEvent) {
  e.preventDefault();
  state.drag = true; state.sx = e.clientX; state.sy = e.clientY; state.lx = state.tx; state.ly = state.ty;
  imgRef.value!.setPointerCapture(e.pointerId);
}
function onPointerMove(e: PointerEvent) {
  if (!state.drag) return; state.tx = state.lx + (e.clientX - state.sx); state.ty = state.ly + (e.clientY - state.sy); apply();
}
function onPointerUp() { state.drag = false; }
function onDblClick(e: MouseEvent) { e.preventDefault(); resetView(); }

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close();
  if (visible.value) {
    if (e.key === '+') { zoomIn(); }
    if (e.key === '-') { zoomOut(); }
    if (e.key === '0') resetView();
  }
}
function onBackdrop(e: MouseEvent) {
  if (e.target === e.currentTarget) close();
}

onMounted(() => {
  const img = imgRef.value!;
  img.addEventListener('wheel', onWheel, { passive: false } as any);
  img.addEventListener('pointerdown', onPointerDown);
  img.addEventListener('pointermove', onPointerMove);
  img.addEventListener('pointerup', onPointerUp);
  img.addEventListener('pointercancel', onPointerUp);
  img.addEventListener('dblclick', onDblClick);
  document.addEventListener('keydown', onKey);
});
onBeforeUnmount(() => {
  const img = imgRef.value!;
  img.removeEventListener('wheel', onWheel as any);
  img.removeEventListener('pointerdown', onPointerDown);
  img.removeEventListener('pointermove', onPointerMove);
  img.removeEventListener('pointerup', onPointerUp);
  img.removeEventListener('pointercancel', onPointerUp);
  img.removeEventListener('dblclick', onDblClick);
  document.removeEventListener('keydown', onKey);
});

// 暴露方法给外层
defineExpose({ open, close });
</script>