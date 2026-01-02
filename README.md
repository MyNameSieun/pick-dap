<div id="top"></div>

<div align='center'>

<h1><b>프로젝트 제목</b></h1>
<h3><b>프로젝트 부제목</b></h3>

Notion: [프로젝트 노션 링크](https://)

</div>

<br>

## 0. 목차

1.  [공식 문서 모음](#1)
2.  [시작 가이드](#2)
3.  [브랜치 및 디렉토리 구조](#3)
4.  [Color 적용 방법](#4)
5.  [커밋 컨벤션](#5)
6.  [Package_npm](#6)
7.  [참고하면 좋을 자료](#7)

<br >

## <span id="1">📄 1. 공식 문서 모음</span>

- [shadcn/ui](https://ui.shadcn.com/docs/components)
- [lucide icon](https://lucide.dev/icons/)

<br>

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br>

## <span id="2">🛠️ 2. 시작 가이드</span>

### 2.1 Installation

```shell
# 1. 클론하기
$ git clone https://github.com/MyNameSieun/pick-dap.git .

# 2. 의존성 설치하기
$ npm i

# 3. 개발 서버 실행하기
$ npm run dev
```

<br>

### 2.2 브랜치 생성 가이드

① 브랜치 생성

- `feature/`로 시작하고 기능명을 붙이세요.
- e.g., `feature/login`, `feature/activityRecommend`

<br>

② 본인 브랜치에 push 후 `develop` 브랜치에 PR 보낸 후 카톡 남겨주세요.

<br>

③ PR 후 `develop` 브랜치에서 pull

<br>

④ main 브랜치는 건들지 말기

<br>

> 브랜치 활용 명령어

```shell
# 브랜치 생성
git branch feature/<기능명>

# 브랜치 이동
git switch feature/<기능명>

# 생성과 동시에 이동
git switch -c feature/<기능명>

# 브랜치 리스트 확인
git branch

# 브랜치 삭제 (삭제를 하기 위해선 다른 브랜치로 전환 후 삭제하셔야합니다.)
git branch -d <브랜치명>   # 안전 삭제
git branch -D <브랜치명>   # 강제 삭제
```

<br>

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br>

## 3. <span id="3">🗂️ 3. 브랜치 및 디렉토리 구조</span>

> 브랜치

- `main`
- `dev`
- `featuer/login`

<br>

> 디렉토리 구조

```shell

```

<br>

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br>

# 4. <span id="4">🎨 4. Color 적용 방법</span>

`tailwind.config.js` 파일에 프로젝트에서 사용할 색상을 정의해 뒀습니다.

```ts

```

<br>

Tailwind에서 추가한 색상을 아래와 같이 사용할 수 있습니다.

```tsx
<p class="text-careerForMe-main">커리어 포미 색</p>
```

```tsx
<div class="bg-careerForMe-red">배경 색</div>
```

```tsx
<button class="border-gray-medium border">테두리 색</button>
```

<br>

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br>

## <span id="5">🤝 5. 커밋 컨벤션</span>

커밋 메시지 형식: `[타입] - 하려는 내용`

| **타입** | **설명**                                          | **예시**                                              |
| -------- | ------------------------------------------------- | ----------------------------------------------------- |
| feat     | 기능 구현                                         | [feat] - 페인페이지 레이아웃 구현                     |
| rename   | 파일/폴더 이름 변경 및 이동                       | [rename] - `src/old-folder`를 `src/new-folder`로 이동 |
| script   | 라이브러리 추가                                   | [script] - `supabase` 라이브러리 추가                 |
| fix      | 버그 수정                                         | [fix] - `supabase` env 미연결 문제 해결               |
| chore    | 빌드 업무 수정, 패키지 매니저 설정 수정           | [chore] - .env 설정 변경                              |
| refactor | 코드 리팩토링                                     | [refactor] - 함수 분리 및 코드 정리                   |
| style    | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 | [style] - 버튼 스타일 수정                            |
| test     | 테스트 코드, 리팩토링 테스트 코드 추가            | [test] - 유저 로그인 기능 테스트 추가                 |
| docs     | 문서 수정                                         | [docs] - API 문서 업데이트                            |

<br>

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br>

## <span id="6">⚙️ 6. Package npm</span>

다음은 이 프로젝트에서 사용 중인 주요 라이브러리 목록입니다.

이미 설치되어 있으므로, 별도로 추가할 필요는 없습니다.

# npm

Story Book

```shell
npm create storybook@latest
```

Prettier plugin for Tailwind CSS 플러그인

```shell
npm i -D prettier prettier-plugin-tailwindcss
```

zustand

```shell
npm install zustand
```

shadcn/ui

```shell
npx shadcn@latest init
```

TanStack Query

```shell
npm i @tanstack/react-query
```

tanstack query devtools

```shell
npm i @tanstack/react-query-devtools
```

<br>

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br>

## <span id="7">7. 참고하면 좋을 자료</span>

- [[TanStack Query] Next.js SSR 환경에서는 어떻게 TanStack Query를 사용할까?](https://meowow.tistory.com/entry/TanStack-Query-Nextjs-SSR-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-TanStack-Query%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C)
- [[Stroybook] Next.js 프로젝트에 Storybook 도입하여 효율적으로 UI 관리하기](https://meowow.tistory.com/entry/Stroybook-Nextjs-%EA%B8%B0%EB%B0%98-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-shadcnui-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [[Lucide React] Tailwind CSS와 궁합이 좋은 Lucide icon 라이브러리](https://meowow.tistory.com/entry/Lucide-React-Tailwind-CSS%EC%99%80-%EA%B6%81%ED%95%A9%EC%9D%B4-%EC%A2%8B%EC%9D%80-Lucide-icon-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC)'
- [[Git] GitHub Issue 사용하여 협업하기](https://meowow.tistory.com/entry/Git-GitHub-Issue-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%ED%98%91%EC%97%85%ED%95%98%EA%B8%B0)
- [[Git] GitHub PR template 만들고 사용하기](https://meowow.tistory.com/entry/Git-GitHub-PR-template-%EB%A7%8C%EB%93%A4%EA%B3%A0-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
  ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-Storybook-%EB%8F%84%EC%9E%85%ED%95%98%EC%97%AC-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9C%BC%EB%A1%9C-UI-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)
- [[shadcn/ui] Tailwind 기반 디자인 시스템 shadcn/ui 사용하기](https://meowow.tistory.com/entry/shadcnui-Tailwind-%

<br>

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br>
