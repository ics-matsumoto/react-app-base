## サンプルアプリのポイント

- 簡単なTodoListアプリです
  - モックAPIから取得したTODO一覧とTODO詳細を表示します
  - 現時点では更新系機能は未実装です
- データの非同期取得とキャッシュ制御の仕組みを導入しています
  - 非同期処理をわかりやすくするため、モックAPIは2sの遅延を入れています
  - 例として、TODO一覧は一度取得したデータを保持し、TODO詳細は都度取得する動作としています
  - 画面遷移時に初期化処理を行ったり、キャッシュを破棄したりする制御を組み込んでいます

## 技術選定と基本的な利用方針の検討

このプロジェクトで利用しているライブラリとその選定基準を記録として残しておきます。

### ステート管理

Recoilを使用します。Redux Tool Kit(RTK)(でもほぼ同じことができることは確認していますが、下記の観点でRecoilを採用します。

- Action → Reducerの流れにボイラープレートが多い
  - RTKを利用することである程度隠蔽できますが、Reduxを十分理解していないとブラックボックスになり正しい運用が難しいと考えました
- 単一ステートを作成するメリットがない
  - Reduxではスライスによる分割を行っても、selector等のステートを触る場所でルートのステートが露出します
  - selectorの使用するステートの影響範囲が曖昧になるため、ストアの拡張が難しくなります
  - Recoilの場合はステートを局所化できるため、ページスコープ・機能スコープのステートを安全に利用できます
- Suspendを前提とした設計がなされている
  - 非同期のselectorを用いることでAPIアクセスが容易になると期待できます

以下の方針で運用することを考えています

- APIアクセスやアプリ全体の共有状態をsrc/statesに集約する（reduxの場合と基本は同じ）
  - APIアクセスについては非同期のselectorで実装し、atomにデータを保持しない方針とする
  - 更新系APIもselectorのsetで実装する
- 各ページや機能で必要な情報は細かい粒度のselectorを多数実装し、画面/コンポーネントでは単にそれを表示するだけにする
  - コンポーネントにロジックを持ち込まない
  - selectorは自動でメモ化されるため、細かい理由度でselectorを書くことでパフォーマンスもあげやすくなる
- 画面/機能等の単位でローカルなステートを持つことを禁止しない
  - 単純な状態であればuseStateでも構いませんが、useStateとhooksで独自のステート管理を作り込むならRecoilで局所的なステートを作る方が健全と考えます

参考

- [【LINE証券 FrontEnd】Recoilを使って安全快適な状態管理を手に入れた話](https://engineering.linecorp.com/ja/blog/line-sec-frontend-using-recoil-to-get-a-safe-and-comfortable-state-management/)
- [Facebook製の新しいステート管理ライブラリ「Recoil」を最速で理解する](https://blog.uhy.ooo/entry/2020-05-16/recoil-first-impression/)
- [React ステート管理 比較考察](https://blog.uhy.ooo/entry/2021-07-24/react-state-management/)

### スタイリング

以下の候補を検討した結果、Emotionを採用します。

候補：
- CSS Modules
- [Tailwind](https://tailwindcss.com/)
- [Vanilla-Extract](https://vanilla-extract.style/)
- [Styled Components](https://styled-components.com/)
- [Linaria](https://github.com/callstack/linaria)
- [Emotion](https://emotion.sh/docs/introduction)

各個の評価についてはほぼ、『[Vite+React+TypeScriptで、CSSスタイルについて調べて、Emotionに流れ着いた](https://zenn.dev/longbridge/articles/78b5018315c876)』と同じ意見です。

以下、本プロジェクトの性質とICSとしての観点で評価を残しておきます：

#### CSS Modules

pros:
- ICSで実績がある
- 生のCSS/SCSSがかける
- 開発環境にあまり手を入れずに使える
- パフォーマンスは良い

cons:
- webpackのローダーはすでにメンテナンスモードになっており、今後の見通しが不明
- コンポーネントの分割が難しくなり、肥大化しやすい
  - SCSSと組み合わせて使うとネストが容易なため顕著に影響が出る
  - コンポーネントのDOM構造を変えると壊れやすい
- 使われていないスタイルの検出が難しい

#### Tailwind

pros:
- 人気がある。Reactでの利用実績が多い。情報が多い
- 記述量が減りそう

cons:
- ICSではCSS Modulesを含め、生のCSSに近い書き方の実績が多いため、学習コストが高い
- ユーティリティではあるものの、独自の記法を持ち込むため、一度採用すると乗り換えできない
- 提供されたデザインを実装するやりかたの場合、メリットを活かしにくい

#### Vanilla-Extract

pros:
- CSS Modulesのコアコントリビューターが開発しており、正当後継の感がある
- TSの型が効く
- パフォーマンスは良い
- コンポーネントからの利用方法かCSS Modulesとほぼ同じ

cons:
- スタイルの書き方がオブジェクト方式に限定されるため、やや書きにくい
  - JSでStyleを書くのと同様の方式

```ts
const style = {padding: '10%'};
```

- 静的なCSSにコンパイルされるため、動的なスタイリングはできない
- スタイルを`*.css.ts`という別なファイルに書く必要がある
  - コンポーネントを小さく分割していくときには弊害となりやすい

#### Styled Components

pros:
- グローバルで見るとデファクト？ツールやIDEのサポートが厚い
- 動的なスタイルを自由に書ける
- スタイル部分はCSSリテラルで生のCSSと同じような書き方ができる

```ts
const StyledButton = styled.a`
  display: inline-block;
  border-radius: 3px;
  color: white;
  border: 2px solid white;
```

cons:
- 「スタイルをつけたコンポーネント」を作るコンセプトなので、スタイルをつける要素の分だけコンポーネントができる
- tsxのテンプレートに独自命名のスタイル付きコンポーネントのタグがあふれるため、可読性が悪い
  - 正しい命名をすればその限りではないが、命名自体が負荷になる
- 動的なのでパフォーマンスはやや落ちる

#### Linaria

pros:
- Styled Componentsを静的にしたものなので、パフォーマンスは良い
- Styled Componentsのエコシステムにある程度そのまま乗れる（IDEのサポート等）

cons:
- 動的なスタイリングに工夫が必要
- まだ導入事例が少ない

#### Emotion

pros:
- Styled Componentsと似ているが、スタイルをコンポーネントと分離できる（一緒にもできる）
- Styled Componentsのエコシステムに大部分そのまま乗れる（IDEのサポート等）
- スタイル部分を切り出して書けば、ほぼCSS Modulesと同じ感触になる
- 動的かつTSなので、部分的に値を変えたり関数を挟んだりもできる
- 日本での導入事例が多そう

cons:
- 動的なのでパフォーマンスはやや落ちる


ICSではCSS-in-JSの知見がまだないことと、今回のプロジェクトでは大きな画面を頻繁に書き換えるようなパフォーマンスにシビアな要件はあまりないと思われることから、柔軟で使いやすいEmotionが良いと考えます。

### UIライブラリ

以下の観点からUIライブラリは使用しません

- デザインが提供される
- 新しいUIフレームワークの学習はコストが高い
- 柔軟性やパフォーマンスの点で壁にぶつかりやすい
- 一度入れると外せない

代わりに、モーダルやアコーディオン等の複雑なUIに限定してヘッドレスUIの[Radix](https://www.radix-ui.com/)の導入を検討します

- デザインは自前で実装しつつ、UIの構造や振る舞いだけを利用できる
  - キー操作等のアクセシビリティの考慮があらかじめ実装されている
- ライブラリのコンポーネントをそのまま利用するのではなく、自前でスタイルをつけたものをexportする形になるので影響を限定できる
  - 将来的に辞めたくなったら、モーダルやアコーディオンの実装だけ自前で用意すればRadix依存を消せる

### ルーティング

React Locationを利用します。
`@/components/app/AppRouter.tsx`でルーティングを定義します。

ページコンポーネントは`@/components/pages/`に格納します。

#### ページ遷移時の初期化処理

各ページでは、必要な場合にローダーをhooksの形でexportできます。このローダーで最初のページレンダリング前に必要な初期化処理を行うことができます。

下記はTodoの詳細ページのコンポーネントです。ローダーを使用して、URLから取得したパラメーターをRecoilのステートにセットしています。

コンポーネント側では`useMatch`を使用して取得したローダーの処理結果が存在すれば初期化処理が完了しているとみなすことができます。これにより、初回レンダリングで古い状態を描画してしまう問題を回避できます。

```tsx
export const DetailPage: VFC = () => {
  const { data: loaded } = useMatch(); 
  return (
    <>
      <AppHeader />
      {loaded && <TodoDetail />}
    </>
  );
};

export const useDetailPageLoader = () => {
  const setId = useSetRecoilState(todoDetailCurrentIdAtom);
  const loader = async (match: RouteMatch) => {
    setId(Number(match.params.id));
  };
  return loader;
};
```

#### ページ遷移ごとのAPI再fetch

Recoilを使用してAPIをfetchする場合、デフォルトで取得結果がメモ化されるため、2度目以降同じデータを参照してもfetchは1度しか走りません。この動作は効率ですが、APIによっては、主に画面遷移をトリガーとして古いデータを無効としたいケースがあります。これを実現するため、画面遷移ごとにインクリメントする`currentPageIndex`を用意しています。fetch APIを叩くRecoilのselectorを`currentPageIndex`に依存させることで、画面遷移時に自動でキャッシュが破棄されるようになります。

サンプルアプリではTodoの詳細取得APIでこの機能を利用しています：

```ts
export const todoDetailSelector = selector({
  key: 'states/todoDetailSelector',
  get: async ({ get }) => {
    // 画面遷移ごとに再fetchするためにUse a Request IDパターンを使用する
    // @see https://recoiljs.org/docs/guides/asynchronous-data-queries/#use-a-request-id
    get(currentPageIndex);

    const id = get(todoDetailCurrentIdAtom);
    if (id === undefined) {
      return;
    }

    return await fetchTodoDetail(id);
  },
});

```

### ディレクトリ構成

サンプルアプリの主なディレクトリ構成を示します：

```
src
├── assets ... 画像等の静的なアセット
├── components
│   ├── app ... ルーター等のアプリの共通的なコンポーネント
│   ├── features ... 機能ごとのディレクトリ
│   │   ├── header
│   │   ├── login
│   │   ├── tododetail
│   │   └── todolist
│   │       ├── TodoList.tsx ... 外部に提供する機能のコンポーネント
│   │       ├── hooks ... 機能の内部で使用するhooks
│   │       ├── parts ... 機能の内部で使用するコンポーネント
│   │       └── states ... 機能の内部で使用するstate
│   ├── pages ... ページコンポーネントのディレクトリ
│   │   ├── detail
│   │   ├── login
│   │   └── top
│   │       └── TopPage.tsx
│   └── presentations ... 再利用可能かつプレゼンテーショナルな（propsのみで表示される）コンポーネント
│       ├── basicButton
│       ├── blockingModal
│       └── loading
├── consts ... 定数/設定
├── externals ... 外部リソース
│   └── apis ... fetch/post等のAPI
├── states ... グローバルなRecoilのatom/selector
├── types ... アプリ全体で使用する型
└── ultils ... アプリ固有の知識を必要としない汎用の関数
```

#### ディレクトリ構成の方針

- ページコンポーネントはページ全体の構成を記述するのにとどめ、具体的な機能は`features`に分割します
  - `feature`はひとまとまりの機能に関連するコンポーネントやロジックの単位です
  - `feature`にはコンポーネント・hooks・state・その他のロジックを含むことができます
    - コンポーネントのない`feature`があっても構いません
  - 外部（ページ等`feature`の外）に公開するコンポーネントやhooks等は`feature`のディレクトリの直下におきます
- コンポーネントは細か目に分割します
  - 目安として150行を超える場合は分割できないか検討してください
  - ロジックはコンポーネントに直接書かず、hooksやRecoilのselectorに書いてコンポーネントから利用します
  - 一度しか使用しないスタイルは原則コンポーネントの内部に書きます
    - 別ファイルに分割しても構いませんが、スタイルを含めたコンポーネントが150行程度に収まる状態が理想です
- ストアの状態に依存しないコンポーネントは積極的に`presentations`に切り出してください
- ultilsにアプリドメインのロジックが入らないよう注意してください
  - アプリドメインのロジックは`feature`とするか、`eature`を超えて共通化したいものがあれば、`src/logics`等のディレクトリを作成することを検討してください

### Lint/Format

以下の方針でESLint・Prettier・Stylelintを使用します。

- gtsやその他の「全部入り」プラグインの利用は避け、標準/フレームワーク公式のrecommendedなプラグインに必要なルールを足す方式とします
- import順や{}の有無など、自動補正できるものはerrorではなくwarnとしています
  - 全部errorにするとコーディング中に画面が真っ赤になりがちなので、errorは「その場で認識して手動で直すべきもの」を主としたいです
- TODO: コミット時またはプッシュ時にlintをかけ、エラーがある場合はブロックします

### テスト

（未定）

## 開発の始め方

### エディターの設定：VS Codeの場合

下記のプラグインを追加してください

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)



