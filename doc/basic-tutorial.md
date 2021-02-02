# 기본 정리
## next app 설치
- 노드 설치
- npm install -g yarn
- yarn create next-app sdi2nd-next

## next-with-apollo 설치
- https://github.com/lfades/next-with-apollo
- yarn add next-with-apollo apollo-boost @apollo/react-hooks graphql-tag graphql

### 페이지마다 apollo를 추가하는 방법
- lib/withApollo.js생성한다.
``` javascript
import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: 'https://mysite.com/graphql',
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);
```
- pages/index.js
``` javascript
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';
// import { getDataFromTree } from '@apollo/react-ssr';

const QUERY = gql`
  {
    title
  }
`;

const Index = () => {
  const { loading, data } = useQuery(QUERY);

  if (loading || !data) {
    return <h1>loading...</h1>;
  }
  return <h1>{data.title}</h1>;
};

export default withApollo(Index);
```
### 모든 페이지에 apollo를 추가하는 방법
- apollo를 모든 페이지에 추가하고 싶으면, _app.js에 아래와 같이 추가하면 된다.
``` javascript
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const App = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: 'https://mysite.com/graphql',
    cache: new InMemoryCache().restore(initialState || {})
  });
})(App);
```
### getInitialPros관련
- 각 페이지의 getInitialPropes에서 Apolo Client에 액세스하려면 다음과 같이 getInitialProps를 앱에 추가해 준다.
``` javascript
import App from 'next/app';

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
```
- getInitialProps가 있는 페이지는 다음과 같이 아폴로 클라이언트에 액세스할 수 있다.
``` javascript
Page.getInitialProps = ctx => {
  const apolloClient = ctx.apolloClient;
};
```
### withApollo API
Apollo는 2개의 매개변수를 수신하고, 첫 번째 매개변수는 아폴로 클라이언트를 반환하는 함수로서, 이 함수는 다음과 같은 속성을 가진 객체를 수신한다.
ctx - This is the context object sent by Next.js to the getInitialProps of your page. It's only available for SSR, in the client it will be undefined
initialState - If getDataFromTree is sent, this will be the initial data required by the queries in your page, otherwise it will be undefined
headers - This is ctx.req.headers, in the client it will be undefined.
Apollo와 함께 수신한 두 번째 선택적 파라미터는 다음과 같은 속성을 가진 객체이다.
render - A function that receives an object ({ Page, props }) with the current Page Component to be rendered, and its props. It can be used to wrap your pages with <ApolloProvider>. It's optional
getDataFromTree - implementation of getDataFromTree, defaults to undefined. It's recommended to never set this prop, otherwise the page will be a lambda without Automatic Static Optimization
onError - A function that will be called if getDataFromTree encounters errors. If not supplied errors will be silently ignored. It will be called with 2 parameters:
error - The Error object
ctx - The page context (NextPageContext)



## next js 따라하기
- https://nextjs.org/learn/basics/create-nextjs-app
### Navigate Between Pages
#### Client-Side Navigation
- Link는 동일한 Next.js 앱에서 두 페이지 사이의 Client-Side Navigation을 가능하게 한다.
- Client-Side Navigation은 페이지 전환이 자바스크립트를 사용하여 이루어져서 속도가 빠르다. 개발자 도구에서 css 배경을 노란색으로 변경한 후에도 두 페이지를 앞뒤로 이동하면 배경색이 유지됨을 확인할 수 있다.
- 만약 <링크 href="…" 대신 <a href="…"를 사용하고 이렇게 했다면, 브라우저가 전체 새로 고침을 하기 때문에 링크 클릭 시 배경색이 지워진다.
#### Code splitting and prefetching
next.js는 코드를 자동으로 분할하기 때문에 각 페이지는 해당 페이지에 필요한 것만 로드한다. 즉, 홈페이지를 렌더링할 때, 다른 페이지의 코드는 처음에 제공되지 않는다는 것을 의미한다.
이를 통해 수백 페이지를 추가해도 홈페이지는 빠르게 로딩할 수 있다. 요청한 페이지의 코드만 로드하면 페이지가 분리된다는 의미도 된다. 특정 페이지에 오류가 발생해도 나머지 애플리케이션은 계속 작동한다.
또한 Next.js의 프로덕션 빌드에서는 브라우저의 뷰포트에 링크 구성요소가 나타날 때마다 Next.js는 백그라운드에서 링크된 페이지에 대한 코드를 자동으로 프리페치한다. 링크를 클릭할 때쯤이면 대상 페이지의 코드는 이미 백그라운드에 로드되고 페이지 전환은 거의 즉각적으로 이루어지게 된다!

### Assets, Metadata
- Next.js는 public 폴더에서 이미지와 같은 정적 파일을 제공할 수 있다. public 폴더 내부의 파일은 페이지와 유사한 응용프로그램의 루트로부터 참조될 수 있다.
- `next/link`에 Head 태그를 이용하여 head Metadata를 사용할 수 있다.

### Pre-rendering and Data Fetching
- Next.js는 모든 페이지를 pre-rendering한다. 이것은 Next.js가 클라이언트 쪽 JavaScript에 의해 모든 것을 수행하는 대신 미리 각 페이지에 대해 HTML을 생성한다는 것을 의미하며, 렌더링 및 SEO 성능을 향상할 수 있다.
- 생성된 각 HTML은 해당 페이지에 필요한 최소한의 JavaScript 코드와 연관되어 있으며, 페이지가 브라우저에 의해 로드되면 자바스크립트 코드가 실행되어 페이지가 완전히 인터랙티브하게 된다.(이 과정을 하이드레이션이라고 한다.)
#### Static Generation
- Static Generation은 빌드 시간에 HTML을 생성하는 사전 렌더링 방법이다. 사전 갱신된 HTML은 각 요청에 재사용된다.
#### Server-side Rendering
- 서버측 렌더링은 각 요청에 따라 HTML을 생성하는 사전 렌더링 방법이다.
#### Per-page Basis
- Next.js를 페이지마다 pre-rendering을 선택할 수 있다. 대부분의 페이지에 Static Generation을 사용하고 다른 페이지에는 Server-side Rendering을 사용하여 "하이브리드" Next.js 앱을 만들 수 있다.
#### Static Generation with Data
- `getStaticProps`를 이용하여 static generation을 할 수 있다.
- `getStaticProps`는 생산 시 빌드 타임에 실행되며, 함수 내부에서는 외부 데이터를 가져와 페이지에 props으로 보낼 수 있다.
    - https://nextjs.org/learn/basics/data-fetching/implement-getstaticprops
- `getStaticProps`는 sever-side에서만 실행됨으로 fetch나 db read가 가능하다.
- In development (npm run dev or yarn dev), getStaticProps runs on every request.
- In production, getStaticProps runs at build time.
- getStaticProps page 파일에서만 호출이 가능하다.
#### Fetching Data at Request Time
- 빌드 시간 대신 요청 시간에 데이터를 가져와야 하는 경우 `Server-side Rendering`을 해야 한다.
- `getServerSideProps`를 사용하여 작업을 수행할 수 있다.
- `getServerSideProps`는 요청 시 호출되며, context에 요청별 매개변수가 포함되어 있다.
- 이 함수는 서버가 모든 요청을 처리해야 하기 때문에 속도가 느리므로, 잘 선택해야 한다.
``` javascript
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

### Dynamic Routes
- https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data

### API Routes
- https://nextjs.org/learn/basics/api-routes/creating-api-routes
- API Routes를 사용하면 Next.js 앱 내에 API Endpoint를 만들 수 있다. 다음과 같은 형식을 가진 pages/api 디렉토리 내에 함수를 작성하면 된다.