# メニューエディ 使用說明

メニューエディ v0.1.2 的 GitHub Pages 說明網站，包含日文、繁體中文及英文。

- 網站：https://kuroneko11375.github.io/menu-edi-guide/
- 商品頁：https://kuronekodev.booth.pm/items/8612192
- 網站預設語言：日文

本儲存庫僅提供操作文件、示範畫面與影片，不包含 Unity 工具原始碼或商品套件。商品取得方式及使用條件請參考 BOOTH 商品頁。

## 維護

在 `content.mjs` 修改三語內容，再使用 Node.js 執行：

```sh
node build.mjs
```

一併提交生成的 `index.html`、`zh.html`、`en.html`。GitHub Pages 使用 `main` 分支根目錄，`.nojekyll` 保留，不需要套件安裝或執行建置工作流。

## 素材與界線

操作畫面來自 v0.1.2 的 Unity 示範資料。影片使用實際編輯器狀態搭配說明框及停格，不代表即時執行速度或 VRChat 遊戲實測。影片為無音樂版。網站圖片與影片供本商品的操作說明使用。

支援版本及測試範圍記載於網站「相容環境」章節；網站新增不代表重新執行 Unity、建置或 VRChat 測試。

網站不載入外部字型、分析或追蹤程式。
