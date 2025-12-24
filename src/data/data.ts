// data.ts
export type ImageItem = {
  order?: number;
  file: string;
  preview?: string;
  title?: string;
};
export type ProjectItem = { order?: number; displayName?: string; images: ImageItem[] };

export const PORTFOLIO: { projects: Record<string, ProjectItem> } = {
  projects: {
    dfdz: {
      order: 1,
      displayName: '电网与调度场景',
      images: [
        { order: 7, file: 'integrated-home.png', preview: 'integrated-home_preview.jpg', title: '一体化首页' },
        { order: 2, file: 'main-distribution-home.png', preview: 'main-distribution-home_preview.jpg', title: '主配网首页' },
        { order: 3, file: 'distributed-pv-home.png', preview: 'distributed-pv-home_preview.jpg', title: '分布式光伏首页' },
        { order: 4, file: 'common-charts.png', preview: 'common-charts_preview.jpg', title: '常见图表' },
        { order: 5, file: 'orderly-power-usage-home.png', preview: 'orderly-power-usage-home_preview.jpg', title: '有序用电首页' },
        { order: 6, file: 'self-healing-evaluation-home.png', preview: 'self-healing-evaluation-home_preview.jpg', title: '自愈评价首页' },
        { order: 1, file: 'dispatch-system-home.png', preview: 'dispatch-system-home_preview.jpg', title: '调度系统首页' }
      ]
    },
    ipc: {
      order: 4,
      displayName: 'IPC 终端界面(未做完)',
      images: [
        { order: 3, file: 'list.png', preview: 'list_preview.png', title: '列表' },
        { order: 2, file: 'data-charts-page.png', preview: 'data-charts-page_preview.png', title: '数据图表页' },
        { order: 1, file: 'home.png', preview: 'home_preview.png', title: '首页' }
      ]
    },
    muon: {
      order: 3,
      displayName: 'MUON 电商页面（项目中断）',
      images: [
        { order: 4, file: 'product-detail-mobile.jpg', preview: 'product-detail-mobile_preview.jpg', title: '产品详情页-手机端' },
        { order: 3, file: 'product-detail.jpg', preview: 'product-detail_preview.jpg', title: '产品详情页' },
        { order: 2, file: 'home-mobile.jpg', preview: 'home-mobile_preview.jpg', title: '首页-手机端' },
        { order: 1, file: 'home.jpg', preview: 'home_preview.jpg', title: '首页' }
      ]
    },
    vanpowers: {
      order: 2,
      displayName: 'VANPOWERS 电商与经销',
      images: [
        { order: 8, file: 'product-collection.jpg', preview: 'product-collection_preview.jpg', title: '产品集合页' },
        { order: 4, file: 'product-page-mobile.jpg', preview: 'product-page-mobile_preview.jpg', title: '产品页-手机端' },
        { order: 3, file: 'product-page.jpg', preview: 'product-page_preview.jpg', title: '产品页面' },
        { order: 6, file: 'offline-dealer-page-mobile.jpg', preview: 'offline-dealer-page-mobile_preview.jpg', title: '线下经销商页面-手机端' },
        { order: 5, file: 'offline-dealer-page.jpg', preview: 'offline-dealer-page_preview.jpg', title: '线下经销商页面' },
        { order: 7, file: 'dealer-home.jpg', preview: 'dealer-home_preview.jpg', title: '经销商首页' },
        { order: 2, file: 'home-mobile.jpg', preview: 'home-mobile_preview.jpg', title: '首页-手机端' },
        { order: 1, file: 'home.jpg', preview: 'home_preview.jpg', title: '首页' }
      ]
    }
  }
};

// 保留显式排序；未提供 order 时按原始顺序
export function sortProjects(entries: [string, ProjectItem][]) {
  return entries
    .map(([k, v], i) => [k, { ...v, __idx: i }] as [string, ProjectItem & { __idx: number }])
    .sort((a, b) => {
      const ao = a[1].order ?? Number.MAX_SAFE_INTEGER;
      const bo = b[1].order ?? Number.MAX_SAFE_INTEGER;
      return ao === bo ? a[1].__idx - b[1].__idx : ao - bo;
    })
    .map(([k, v]) => [k, v] as [string, ProjectItem]);
}

export function sortImages(images: ImageItem[]) {
  return images
    .map((im, i) => ({ ...im, __idx: i }))
    .sort((x, y) => {
      const xo = x.order ?? Number.MAX_SAFE_INTEGER;
      const yo = y.order ?? Number.MAX_SAFE_INTEGER;
      return xo === yo ? x.__idx - y.__idx : xo - yo;
    })
    .map(({ __idx, ...rest }) => rest);
}

// 关键修复：用 BASE_URL 适配子路径部署，并清理可能的前导斜杠
export function assetUrl(projectKey: string, file: string) {
  const base = import.meta.env.BASE_URL || '/'; // dev: '/', prod: '/works/'
  const clean = (s: string) => s.replace(/^\/+/, '');
  // 如果文件名可能包含空格或中文，建议只对文件名做编码
  const encodedFile = encodeURIComponent(clean(file));
  return `${base}assets/${clean(projectKey)}/${encodedFile}`;
}

// 根据使用场景返回图片 URL：mode='preview' 用预览图，否则用原图
export function imageSrc(projectKey: string, img: ImageItem, mode: 'preview' | 'full' = 'preview') {
  const filename = mode === 'preview' ? (img.preview || img.file) : img.file;
  return assetUrl(projectKey, filename);
}
