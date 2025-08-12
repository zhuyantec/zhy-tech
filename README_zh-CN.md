# 科技公司官网模板
此模板是一个通用的科技公司官网模板，你可以通过修改文案、图片、颜色快速搭建属于自己的公司官网。

UI 基于[Business Tech Company UI Kit
](https://www.figma.com/community/file/1286806143648573757/business-tech-company-ui-kit)实现。

技术栈为：Next.js + Tailwind CSS，并支持国际化。


## 特性
- 使用Next.js TypeScript 开发
- Tailwind CSS 构建灵活简洁的样式
- 纯静态页面，Lighthouse 分数优秀
- 模块化、响应式、可扩展的组件
- 基于 i18n 的国际化

## 代码定制
主色调：在`src/styles/globals.css`修改主题色调

替换图片：在`public/images/`下替换

### 文案与国际化
本项目使用了 [next-i18next](https://www.i18next.com/) 进行国际化。
#### 新增语言
页面中根据页面 path 中的语言参数判断语言，如需新增语种，在`public/locales/`下新增对应语种的文件夹，例如：`public/locales/ja`。
目前仅支持中文和英文，所有翻译文件存储在`public/locales/zh`和 `public/locales/en`。

#### 修改文案
代码内使用翻译项键值查询到对应的翻译文案进行展示，如需修改，在`public/locales/`下查询到对应键值的文案进行修改即可。

在`public/locales/en`和`public/locales/zh`目录下，添加或修改对应页面的翻译文件，例如：
- `public/locales/en/contact.json` 和 `public/locales/zh/contact.json` 用于联系我们页面的翻译。
- `public/locales/en/about.json` 和 `public/locales/zh/about.json` 用于关于我们页面的翻译。
- `public/locales/en/aboutData.json` 和 `public/locales/zh/aboutData.json` 用于关于我们页面里工作人员信息的翻译。
- `public/locales/en/partners.json` 和 `public/locales/zh/partners.json` 用于合作伙伴页面文案的翻译。
- `public/locales/en/partnersData.json` 和 `public/locales/zh/partnersData.json` 用于合作伙伴页面内合作伙伴列表的翻译。
- `public/locales/en/contact.json` 和 `src/pages/en/contact.tsx` 用于联系我们页面的翻译。
- `public/locales/en/about.json` 和 `src/pages/en/about.tsx` 用于关于我们页面的翻译。
- `public/locales/en/partners.json` 和 `src/pages/en/partners.tsx` 用于合作伙伴页面的翻译。
- `public/locales/en/news.json` 和 `src/pages/en/news.tsx` 用于新闻中心页面的翻译。
- `public/locales/en/projects.json` 和 `public/locales/zh/projects.json` 用于项目页面中项目列表的翻译。

确保每个页面的翻译文件都包含了对应的翻译内容，以便在不同语言环境下正确显示。


## 环境变量

### Web3Forms 配置（联系表单）
此模板使用 Web3Forms 实现联系表单的邮件发送功能。要启用联系表单的邮件发送：

1. **获取 Web3Forms API Key**：
   - 访问 [Web3Forms](https://web3forms.com/)
   - 点击 "Get Access Key"
   - 输入您的邮箱地址
   - 检查邮箱获取 API Key

2. **配置环境变量**：
   在项目根目录创建 `.env.local` 文件并添加：
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your_api_key_here
   ```

3. **测试联系表单**：
   - 启动开发服务器：`npm run dev`
   - 访问联系页面
   - 填写并提交表单
   - 检查是否收到邮件

> 注意：Web3Forms平台有防垃圾邮件机制，测试时请使用真实的姓名和邮件。并且发送内容请尽量模拟真实情形，不要填写明显的测试内容。

### Plasmic CMS API 配置
此模板的新闻页面使用了PLASMIC CMS API 进行内容管理。
> 如果不需要此功能及页面，可以在环境变量填入 ignore，项目会自动跳过所有 news 相关的页面和链接。

Plasmic CMS API 配置及文档：https://docs.plasmic.app/learn/plasmic-cms-api-reference/

此模板使用了国际化，文章内容也需要对应的多语言版本，需要在 Plasmic 的设置页面配置 `Locales`:
![](https://cdnstatic.tencentcs.com/edgeone/pages/docs/tech-company-website-template-doc1.png)

回到 Model 页面创建 News 数据结构，详情如下：
![](https://cdnstatic.tencentcs.com/edgeone/pages/docs/tech-company-website-template-doc2.png)


## 本地开发
安装依赖：`npm install`
本地调试：`npm run dev`

## 部署
[![使用 EdgeOne Pages 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?template=tech-company-website-template)

