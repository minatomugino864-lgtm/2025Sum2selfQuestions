# 2025 Sum2self Questions (和 2025 年的自己聊聊天)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

> **嘿，这一年过得好吗？**
>
> 这是一个基于 Web 的互动小项目，邀请你花几分钟时间，通过回答 20 + 1 个关于过去一年的问题，与 2025 年的自己进行一场深度的对话。

## 📖 项目简介

**2025Sum2selfQuestions** 是一个专注于年度复盘与自我探索的网页应用。它不仅仅是一份问卷，更是一次心灵的旅程。

在这个快节奏的时代，我们往往来不及回顾就匆匆奔向下一站。本项目旨在通过精心设计的交互流程，引导用户回顾过去一年走过的路、爱过的人、掉过的泪以及那些藏在心底的碎碎念。

### ✨ 核心功能

*   **沉浸式问答**：提供 21 个关于过去一年的精选问题（包含 1 个 2026 展望附加题）。
*   **AI 智能分析**：(耐心等等才行哦) 系统将根据你的回答，利用 AI 生成一份专属的“年度人格画像”。
*   **总结海报**：在旅程的终点，为你生成一张可保存分享的“20问回答”，作为你成长的注脚。
*   **隐私安全**：所有数据主要在本地处理（如涉及云端 AI 接口会有明确提示），守护你的私密回忆。

## 🛠 技术栈

本项目基于现代前端工程化标准构建：

*   **核心框架**: [React](https://reactjs.org/)
*   **开发语言**: [TypeScript](https://www.typescriptlang.org/)
*   **构建工具**: [Vite](https://vitejs.dev/)
*   **样式/UI**: CSS Modules / Styled Components (根据实际代码调整)

## 🚀 快速开始

如果你想在本地运行该项目或进行二次开发，请按照以下步骤操作。

### 环境要求

*   [Node.js](https://nodejs.org/) (推荐 v16 或更高版本)
*   npm 或 yarn / pnpm

### 安装步骤

1.  **克隆仓库**

    ```bash
    git clone https://github.com/minatomugino864-lgtm/2025Sum2selfQuestions.git
    cd 2025Sum2selfQuestions
    ```

2.  **安装依赖**

    ```bash
    npm install
    # 或者使用 yarn
    yarn
    ```

3.  **启动开发服务器**

    ```bash
    npm run dev
    # 或者
    yarn dev
    ```

    启动后，浏览器通常会自动打开 `http://localhost:5173`。

4.  **构建生产版本**

    ```bash
    npm run build
    ```

## 📂 项目结构

```text
2025Sum2selfQuestions/
├── .github/             # GitHub Actions 工作流配置
├── index.html           # 入口 HTML 文件
├── index.tsx            # React 应用入口文件
├── package.json         # 项目依赖与脚本配置
├── tsconfig.json        # TypeScript 配置文件
├── vite.config.ts       # Vite 构建配置文件
└── metadata.json        # 项目元数据配置
```

## 📖 参考文献
[1] 鱿鱼雨. 用20个问题来回顾2025[EB/OL]. (2025-12-20)[2025-12-25]. http://xhslink.com/o/73N6CrPqBVe.

[2] 咩了个喵. 我用Gemini和20部电影回顾了我的2025[EB/OL]. (2025-12-24)[2025-12-25]. http://xhslink.com/o/8MCMMcf2Y79.

