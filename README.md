# SPA Router 구현 과제

React와 History API를 이용하여 SPA Router 기능을 구현하는 과제입니다.

# 목차

- [실행 방법](#실행-방법)
- [요구사항](#요구사항)
- [구현 내용](#구현-내용)
  - [Router, Route](#router-route)
  - [useRouter](#userouter)
- [폴더 구조](#폴더-구조)

# 실행 방법

```javascript
// 설치
$ npm install
// 실행
$ npm run dev
```

# 요구사항

1.  해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.

- `/` → `root` 페이지
- `/about` → `about` 페이지

2. 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.

- 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)

3.  Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.

```javascript
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
)
```

4. 최소한의 push 기능을 가진 `useRouter Hook`을 작성한다.

```javascript
const {push} = useRouter()
```

# 구현 내용

## Router, Route

### Router

- [React Router 문서](https://reactrouter.com/en/main/router-components/router)에서는 Router를 다음과 같이 설명하고 있습니다.

> Router is the low-level interface that is shared by all router components (like BrowserRouter and StaticRouter). In terms of React, Router is a context provider that supplies routing information to the rest of the app.

리액트에서 라우터는 라우팅 정보를 나머지 앱에 공급하는 `context provider` 역할을 하는 것을 알 수 있습니다.
따라서 라우팅 정보를 `RouteContextProvider`를 만들어 관리하고, 정보를 공급할 `Children`을 Provider로 감싸는 `Router` 컴포넌트를 만들었습니다.

- `RouteContextProvider`에서는 `pathname`을 상태로 관리합니다.
- 뒤로가기 버튼을 누르면 `popstate`가 실행되어 `pathname`이 변경됩니다.

```javascript
// 📂 RouteContext.tsx
//...
const RouteContextProvider = ({children}: {children: ReactNode}) => {
  const [pathname, setPathname] = useState(location.pathname)

  useEffect(() => {
    const handlePathname = () => {
      setPathname(location.pathname)
    }
    addEventListener('popstate', handlePathname)
    return () => removeEventListener('popstate', handlePathname)
  }, [setPathname])

  return (
    <RouteState.Provider value={pathname}>
      <RouteDispatch.Provider value={setPathname}>{children}</RouteDispatch.Provider>
    </RouteState.Provider>
  )
}

export default RouteContextProvider

// 📂 Router.tsx
const Router = ({children}: {children: ReactNode}) => {
  return <RouteContextProvider>{children}</RouteContextProvider>
}
```

### Route

- `path`와 `component`를 인자로 받아 현재 경로와 일치하는 경로를 가진 컴포넌트를 반환합니다.

```javascript
// 📂 Route.tsx
const Route = ({path, component}: RouteProps) => {
  const pathname = useContext(RouteState)
  if (pathname === path) {
    return <Layout>{component}</Layout>
  }
}
```

## useRouter

경로를 인자로 받아 히스토리 스택에 경로를 저장하는 훅입니다.

- `history.pushState` 함수를 사용하면 페이지 이동 없이 경로를 스택으로 쌓아둘 수 있습니다.
- 경로를 저장하는 것만으로는 화면 이동이 일어나지 않기 때문에 현재 경로를 변경해주어 다른 페이지를 띄워줍니다.

```javascript
// 📂 useRouter.ts
import {useContext} from 'react'
import {RouteDispatch} from '../contexts/RouteContext'

export const useRouter = () => {
  const setPathname = useContext(RouteDispatch)

  const push = (path: string) => {
    setPathname(path)
    window.history.pushState({}, '', path)
  }

  return {push}
}
```

페이지에서 버튼을 클릭하면 해당 경로로 주소를 바꾸고, 페이지를 변경할 수 있습니다.

```javascript
// 📂 Nav.tsx
const {push} = useRouter()
...
<button onClick={() => push('/about')}>about</button>
...
```

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
</p>
