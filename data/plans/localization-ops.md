# 作業手順とテンプレート：ストアページの日本語チェック（受注から納品まで）

- 作成日: 2026-10-29
- タスク: T0006（前提: T0005 [localization-service.md](localization-service.md)）
- 表記: **【事実】** 出典で確認済み / **【推測】** 分析・仮説 / **【未確認】** 裏付けなし / **【仮定】** 計算のために置いた数字
- 位置づけ: 社内の作業手順書。ここにある英語のメッセージは**下書き**で、実際に顧客へ送るのは出品と受注が承認された後（外部送信は人間が行う）
- 品質基準（Q1〜Q6、重要度、納品の条件）は [localization-service.md §3](localization-service.md) を正とする。本書はそれを実行するための手順

---

## 0. 全体の流れ（1枚で）

| # | 工程 | 担当 | 入力 | 出力 | 目安（Standard）【仮定】 |
|---|---|---|---|---|---|
| S1 | 受注・要件の確認 | 人間 | 注文、購入者の回答 | 作業票（§1.2） | 15分 |
| S2 | 原文と日本語の受け取り・整形 | 人間＋仕組み | 英語の原文、現在の日本語 | 欄ごとの対応表（`source.md`） | （S1に含む） |
| S3 | 機械チェック | 仕組み（スクリプト） | `source.md` | 文字数・表記ゆれの一覧 | 5分 |
| S4 | AIでの下訳と指摘 | AI | `source.md`、S3の結果 | 用語集の案、指摘の候補、修正の下書き | （S3に含む） |
| S5 | 全文の確認 | **人間** | S4の結果、原文 | 採否を決めた指摘、最終の日本語 | 75分 |
| S6 | 通し読み | **人間** | 最終の日本語だけ | 最終の日本語（確定） | 15分 |
| S7 | 英語レポートの下書き | AI | 確定した修正 | レポートの下書き | 5分 |
| S8 | レポートの確認・納品 | **人間** | レポートの下書き | 納品物（§4） | 15分＋納品5分 |
| S9 | 修正対応・完了 | 人間（AIは補助） | 修正依頼 | 修正版、評価のお願い | 15分（平均） |

**原則**
- AIは「候補と下書き」まで。採否と最終の文は必ず人間が決める（[localization-service.md §4](localization-service.md)）。
- 文字数・全角半角・句読点などの機械的なチェックは**AIに数えさせない**。スクリプトで数える【推測】（LLMは文字数を正確に数えられないことが多いため）。
- 各工程の開始と終了の時刻を作業票に記録する（§6）。最初の10件で時間を計り、工程を見直すため。

---

## 1. 受注から納品までの手順

### S1. 受注・要件の確認（人間）

1. 注文が入ったら、**24時間以内**に受注のメッセージ（§5.2）を送る。Fiverrの注文時の質問（Requirements, §5.1）で答えが揃っていれば省略してよい。
2. 次の項目を確認し、作業票（§1.2）に書く。

| 確認項目 | 確認すること | 足りないとき |
|---|---|---|
| パッケージ | 注文のパッケージと、渡された欄が合っているか（[localization-service.md §1.1](localization-service.md)） | 欄が多い→アップグレードかExtrasを提案（§5.3） |
| ストア | Steam／App Store／両方 | 両方なら「2つ目のストア」のExtrasを案内 |
| 欄 | 対象の欄（§2.1）に入っているか | 対象外の欄（ゲーム本文・法務文書など）は断る（§5.3） |
| 語数 | 英語の原文の語数が上限以内か（スクリプトで数える） | 超過分は「200語ごとに10ドル」を案内 |
| 原文の言語 | 英語か | 英語以外なら断る |
| 日本語の有無 | 既存の日本語があるか | ない→新規の翻訳は対象外。カスタムオファーで個別見積もりか、AIで訳してから再注文を案内 |
| ストアのURL | 公開済みならURL。未公開ならジャンルと内容がわかる資料 | なくても進められる。ジャンル名の判断が難しければ質問 |
| 用語の希望 | ゲーム内の訳語表、固有名詞の読み、日本語の正式なタイトル | なければ用語集をこちらで作る（Standard以上） |
| 文体の希望 | です・ます調／体言止め、ターゲット層 | なければ既存の日本語の文体に合わせる |
| AIの利用 | 「AI不可」の希望がないか | 希望があれば、承認された方針に従う（現時点の案は「断る」。[localization-service.md §4](localization-service.md)） |
| 秘密情報 | 未発表の情報か、公開日 | 未発表なら、AIツールのデータの扱いを確認済みのものだけを使う（§2.0） |

3. 足りない情報があれば質問（§5.2）を送り、作業票の状態を「回答待ち」にする。Fiverrの納期の時計は注文の質問への回答で始まる【未確認】ため、質問はS1の中でまとめて1回で送る。
4. 範囲外の部分しかない注文は、作業を始めずに取り消しを相談する（§5.3）。**取り消しや返金の提案は人間が判断する。**

### 1.2 作業票（注文ごとに1枚）

```markdown
# 作業票 <注文番号>

- 購入者: <Fiverrのユーザー名>
- パッケージ: Basic / Standard / Premium（入門価格: はい/いいえ）
- Extras: <なし / 追加語数 / 特急 / 追加画像 / 追加用語 / 2つ目のストア>
- ストア: Steam / App Store
- 対象の欄: <例: 短い説明, About This Game>
- 英語の語数: <n>語（上限: <n>語）
- 納期: <YYYY-MM-DD HH:MM JST>（Fiverrの表示を正とする）
- 修正回数: 残り <n> 回
- 文体の指定: <です・ます / 体言止め / 既存に合わせる>
- 用語の資料: <あり（ファイル名） / なし>
- AIの利用: 可 / 不可（不可なら方針を確認）
- 秘密情報: <未発表 / 公開済み>
- 状態: 回答待ち / 作業中 / 納品済み / 修正中 / 完了

## 時間の記録
| 工程 | 開始 | 終了 | 分 | メモ |
|---|---|---|---|---|
| S1 受注・確認 | | | | |
| S3-S4 機械チェック・AI | | | | |
| S5 全文の確認 | | | | |
| S6 通し読み | | | | |
| S7-S8 レポート・納品 | | | | |
| S9 修正対応 | | | | |

## メモ（判断したこと・顧客とのやり取りの要点）
```

### S2. 原文と日本語の受け取り・整形（人間＋仕組み）

1. 受け取った原文と日本語を、**欄ごと**に次の形に整える（`source.md`）。Steamworksの編集画面のBBCode（`[h2]` `[list]` など）やHTMLのタグは残す。
2. 文の区切りが原文と日本語で対応しない場合は、段落単位で対応づける。

```markdown
## FIELD: steam_short_description | limit: 300 (unverified)
### EN
<英語の原文>
### JA
<現在の日本語>

## FIELD: steam_about | limit: none (unverified)
### EN
...
### JA
...
```

- 欄の名前と上限: [localization-service.md §2.1](localization-service.md) の表に従う。上限が【未確認】の欄は `(unverified)` を付ける。
- 受け取ったファイルは注文ごとのフォルダに保存し、**Gitに入れない**（購入者の未公開の文章を含むため）【推測】。保存場所と保存期間（例: 完了から90日で削除）は人間が決める【未確認】。

### S3. 機械チェック（仕組み）

スクリプトで次を出す。スクリプトは未作成で、次のタスクの候補とする（§7）。それまでは表計算ソフトの `LEN()` やテキストエディタの文字数表示で代用する。

| チェック | 方法 | 対応する品質基準 |
|---|---|---|
| 欄ごとの文字数 | Unicodeの文字数（コードポイント数）で数える。改行は1文字、BBCode・HTMLのタグは除いた数も併記 | Q3 |
| キーワード欄のバイト数 | UTF-8のバイト数も併記（日本語は1文字3バイト）。100バイトの扱いは【未確認】のため両方を示す | Q3 |
| 英語の語数 | 空白で区切って数える | 見積もり |
| 長音のゆれ | 「〜ー」で終わるカタカナ語と、「ー」を取った形の両方が出ていないか（例: サーバー／サーバ） | Q4 |
| 全角・半角 | 全角英数字（Ａ１）と半角英数字の混在、半角カナ（ｱ） | Q4・Q6 |
| 句読点 | 「、。」と「，．」の混在、文末の「.」 | Q4 |
| 記号 | 「！？」の全角半角、「〜」と「～」の混在、かっこの種類（「」『』“”） | Q4 |
| 数字の照合 | 原文と日本語に出てくる数字の一覧を並べる（人数・価格・年・%） | Q1 |
| 残った英語 | 日本語の中の英単語の一覧（意図したものか人間が判断） | Q1・Q2 |

### S4. AIでの下訳と指摘（AI）

§2のプロンプトを、次の順に使う。

1. **P1 用語集の作成** → 用語集の案
2. **P2 指摘の候補と修正の下書き**（P1の用語集、S3の結果を入れる）→ 指摘の一覧
3. （修正の下書きが文字数を超えた欄だけ）**P3 文字数に収める言い換え**

### S5. 全文の確認（人間）

1. **原文と現在の日本語を1文ずつ、全文読む**。AIの指摘を先に見ず、まず自分で読んで気になる箇所に印を付ける方が見落としを減らせる【推測】。最初の数件で両方の順番を試して決める。
2. AIの指摘を1件ずつ「採用 / 修正して採用 / 却下」に分ける。却下の理由は短くメモする（AIのプロンプトの改善に使う）。
3. AIが見落とした問題を足す。
4. 最終の日本語を決める。用語集を確定する。
5. §3のチェックリストの「S5」の項目を確認する。

### S6. 通し読み（人間）

1. **原文を見ずに**、修正後の日本語だけを、日本の購入者の目で読む。
2. スクリプトで文字数を数え直す。
3. §3のチェックリストの「S6」の項目を確認する。

### S7. 英語レポートの下書き（AI）

**P4 英語レポートの下書き**に、確定した修正の一覧（修正前・修正後・種類・重要度・人間のメモ）を入れる。

### S8. レポートの確認・納品（人間）

1. 英語の説明が修正の内容と合っているか、誤った説明・言い過ぎがないかを確認する。
2. §4のテンプレートに沿って納品物を作る。
3. §3のチェックリストの「S8」の項目をすべて確認する。
4. 納品のメッセージ（§5.4）を付けて、Fiverrの「Deliver Now」から納品する。

### S9. 修正対応・完了（人間）

1. 修正の依頼を受けたら、**24時間以内**に返信する（§5.5）。
2. 依頼を次のどれかに分ける。

| 分類 | 例 | 対応 | 修正回数 |
|---|---|---|---|
| A. こちらの誤り | 誤訳・見落とし・文字数超え | 直して再納品。お詫びを添える | **数えない** |
| B. 好みの変更 | 「もっとカジュアルに」「この語は英語のままに」 | 直して再納品。日本語として問題がある場合は理由を添えて代案も出す | 数える |
| C. 範囲外 | 原文の変更・文章の追加・別の欄 | 追加の注文（Extrasかカスタムオファー）を案内 | 対象外 |
| D. 同意できない | 「この訳は誤り」と言われたが、こちらが正しいと考える | 根拠を英語で説明し、購入者の判断に従う（購入者の作品のため）。ただしCriticalの問題（対応言語の誤りなど）を戻す場合は、リスクを書面で伝える | 数える |

3. 修正の回数が残っていない場合の依頼は、人間が受けるかどうかを判断する（軽微なものは受ける方が評価に有利【推測】）。
4. 完了後、評価のお願い（§5.6）を1回だけ送る。
5. 作業票の時間を記録し、状態を「完了」にする。

---

## 2. AI用プロンプト

### 2.0 使う前の確認

- 使うAIツールが**入力を学習に使わない設定**になっているかを確認してから、購入者の文章を入れる【未確認】（[localization-service.md §7](localization-service.md)）。
- 1注文につき新しい会話で始める（別の購入者の情報を混ぜない）。
- プロンプトの `{{…}}` は差し込む値。出力はすべて**候補**として扱う。

### P1. 用語集の作成

```text
あなたはゲームとアプリのローカライズ（英語→日本語）のレビュアーです。
次のストアページの英語の原文と、現在の日本語訳から、用語集の案を作ってください。

# 対象
- ストア: {{Steam / App Store}}
- ジャンル: {{例: ローグライクのデッキ構築}}
- 購入者から渡された訳語の指定: {{なし / 一覧}}

# 用語として拾うもの
1. 固有名詞（ゲーム名、キャラクター名、地名、勢力名、アイテム名、スキル名）
2. ゲームの仕組みの用語（例: perk, run, deck, crafting）
3. ジャンル名・機能名（例: roguelite, co-op, cross-save, controller support）
4. 同じ英語に対して、現在の日本語訳で2種類以上の訳が使われている語（表記ゆれ）

# 出力（Markdownの表のみ。前置きは不要）
| # | English | 現在の訳（出現した形をすべて） | 推奨の訳 | 種類 | 根拠・メモ |
- 種類: 固有名詞 / 仕組み / ジャンル・機能 / 一般
- 推奨の訳は、購入者の指定 > 日本のストアで一般的な言い方 > 現在の訳のうち多い方、の順で決める
- 日本で一般的かどうか確信がない場合は、根拠の欄に「要確認」と書く。確信のない一般論を事実のように書かない
- 固有名詞は、カタカナにするか英語のまま残すかの両案を示す
- 最大{{20 / 追加用語ありなら40}}語。重要な順に並べる

# 原文と現在の日本語（欄ごと）
{{source.md の内容}}

# 機械チェックで見つかった表記ゆれ（参考）
{{S3の結果の表記ゆれ部分}}
```

### P2. 指摘の候補と修正の下書き

```text
あなたはゲームとアプリのローカライズ（英語→日本語）のレビュアーです。
英語の原文と、現在の日本語訳（AI翻訳または機械翻訳）を照らし合わせて、問題の候補を挙げ、修正の下書きを作ってください。
あなたの出力は候補で、日本語ネイティブのレビュアーが1件ずつ採否を決めます。見落としより、候補が多めになる方を優先してください。ただし、誤りではない箇所を誤りと書かないでください。

# 対象
- ストア: {{Steam / App Store}}
- ジャンル・ターゲット: {{例: 一人用のローグライク、PCゲーマー}}
- 文体の指定: {{です・ます調 / 体言止め中心 / 現在の日本語に合わせる}}
- 用語集（確定版。これに合わせる）:
{{P1の結果を人間が確認したもの}}

# 見ること（種類のコード）
- Q1 誤訳: 意味の違い、抜け、余計な付け足し。数字・対応機種・対応言語・価格・発売日・プレイ人数は必ず原文と1つずつ照合する
- Q2 不自然な表現: 直訳調、主語「あなた」の多用、助詞の誤り、語順、カタカナ語の多用、英語の慣用句の直訳、敬語のちぐはぐ
- Q3 文字数: 欄の上限を超えている、または超えそうな修正。※文字数は別のスクリプトで数えるため、あなたは数えなくてよい。上限が厳しい欄（30文字など）では短い案も出す
- Q4 表記ゆれ: 用語集との不一致、長音、全角・半角の英数字、句読点、かっこ、「〜」
- Q5 日本のストアの慣習: 文体の混在、見出し・箇条書きの記号、日付と数字の書き方、日本で通じるジャンル名、日本の読者に伝わらない比喩や文化の言及
- その他: 誇大と受け取られうる表現（「世界一」「最高」など）は修正せず「要確認」として挙げる。法的な判断はしない

# 重要度
- Critical: 購入の判断を誤らせる（対応言語・機能・価格・人数などの誤り）、不快・不適切な表現
- Major: 意味が分からない、一目で機械翻訳と分かる、文字数の上限超え
- Minor: 意味は伝わるが、表記ゆれ・文体の乱れ・少し不自然
- Preference: 誤りではないが、より良い言い方がある

# 出力1: 指摘の一覧（Markdownの表）
| ID | 欄 | 原文（該当部分） | 現在の日本語 | 修正案 | 種類 | 重要度 | 理由（日本語で1〜2文） | 確信度（高/中/低） |
- IDは「欄の略号-連番」（例: SD-01, AB-03）
- 1つの文に複数の問題がある場合は1行にまとめ、種類を「Q1,Q2」のように並べる
- 確信度が低いものは理由に「要確認」と書く

# 出力2: 修正後の日本語の全文（欄ごと）
- 出力1の修正案をすべて反映した全文
- BBCode・HTMLのタグ、改行、見出しの構造は原文のまま残す
- 修正した箇所の直後に [ID] を付ける（例: 最大4人で協力プレイ[AB-03]）

# 出力3: 気づいたこと（3行以内）
- 文章全体の傾向（例: 主語の「あなた」が多い、文体が欄によって違う）

# 原文と現在の日本語（欄ごと）
{{source.md の内容}}

# 機械チェックの結果
{{S3の結果}}
```

### P3. 文字数に収める言い換え

```text
次の日本語を、意味を変えずに {{上限}} 文字以内に収める案を5つ出してください。
- 欄: {{App Storeのサブタイトル など}}
- 英語の原文: {{原文}}
- 現在の案: {{日本語}}（{{n}}文字。スクリプトで数えた値）
- 必ず残す語: {{例: ゲーム名, ローグライク}}
- 検索結果や一覧で前半しか見えない場合に備え、大事な語をできるだけ前に置く

出力は表のみ: | 案 | 日本語 | 削った・変えた要素 |
文字数はあなたが数えず、空欄でかまいません（スクリプトで数えます）。
```

### P4. 英語レポートの下書き

```text
You are writing a review report for a game/app developer who does NOT read Japanese.
Below is the list of corrections a native Japanese reviewer has FINALIZED for the developer's Japanese store page.
Write the report in clear, plain English.

Rules:
- Explain each change so a non-Japanese speaker understands WHAT was wrong and WHY the new version is better. Use a literal back-translation in quotes where helpful (e.g., the old text reads like "You can choose your fate", which sounds stiff in Japanese).
- Do not add, remove, or change any correction. Do not invent issues. If the reviewer's note is unclear, write [CHECK] instead of guessing.
- Do not claim sales, ranking, or approval outcomes.
- Keep each "Reason" to 1-2 sentences.
- Severity labels: Critical / Major / Minor / Preference (Preference = optional suggestion; mark "Optional").

Output (Markdown):
1. "Summary" — 3-5 sentences: overall quality of the original Japanese, the main types of problems, what was fixed.
2. "Changes" — table: | ID | Field | Before (JA) | After (JA) | Back-translation of After (EN) | Type | Severity | Reason (EN) |
   Type names: Mistranslation / Unnatural phrasing / Character limit / Inconsistency / Store conventions / Display
3. "Glossary" — table: | English | Japanese | Reading/Note |   (only if a glossary is provided)
4. "Notes" — items marked "needs your confirmation" by the reviewer, as questions to the developer.

Package: {{Basic / Standard / Premium}}
(For Basic, skip Severity and Back-translation columns and the Glossary.)

Finalized corrections:
{{S5で確定した指摘の一覧（ID, 欄, 修正前, 修正後, 種類, 重要度, 人間のメモ）}}

Glossary:
{{確定した用語集}}

Reviewer's notes / open questions:
{{人間のメモ}}
```

### P5. 修正依頼の整理（S9で必要なときだけ）

```text
次は、購入者からの修正依頼（英語）です。依頼を項目ごとに分け、それぞれを次のどれかに分類してください。
A: こちらの誤りの指摘 / B: 好みの変更 / C: 範囲外（原文の変更、文章の追加、別の欄） / D: こちらの修正への反対
出力は表のみ: | # | 依頼の要約（日本語） | 該当する欄・ID | 分類の案 | 判断に必要な確認 |
分類は案です。最終判断は人間が行います。

購入者の依頼:
{{メッセージ}}

納品した修正の一覧:
{{納品したレポートの表}}
```

### 2.6 プロンプトの改善

- S5で却下した指摘と、AIが見落とした問題を作業票のメモに残す。5件ごとに見直し、P2の「見ること」に具体例を足す【推測】。

---

## 3. 人間の最終確認のチェックリスト

納品する前に、すべてに印を付ける。1つでも付かない場合は納品しない（[localization-service.md §3.3](localization-service.md)）。

### S5 全文の確認

- [ ] 範囲内の日本語を、原文と照らして**全文**読んだ（AIの指摘の箇所だけでなく）
- [ ] 数字（人数・価格・年・%・時間）が原文と一致している
- [ ] 対応機種・対応言語・機能（コントローラー対応、オンライン、クロスセーブなど）が原文と一致している
- [ ] 抜けている文・余計に足された文がない
- [ ] 固有名詞と用語が用語集どおりで、全欄でそろっている
- [ ] 購入者から渡された訳語の指定に従っている
- [ ] AIの指摘を1件ずつ採否した（そのまま全部採用していない）
- [ ] AIの修正案が新しい誤りや不自然さを持ち込んでいない
- [ ] 誇大と受け取られうる表現は「要確認」としてレポートに書いた（法的な判断はしていない）
- [ ] 差別的・不快な表現、日本の読者に伝わらない文化の言及がない

### S6 通し読み（原文を見ずに）

- [ ] 日本の購入者として読んで、自然で、機械翻訳だと感じる箇所がない
- [ ] 文体（です・ます調／体言止め）が欄の中で統一されている
- [ ] 長音・全角半角・句読点・かっこ・「〜」がそろっている（スクリプトで再確認した）
- [ ] 半角カナ・文字化け・機種依存文字がない
- [ ] 見出し・箇条書きの記号とBBCode・HTMLのタグが崩れていない
- [ ] **すべての欄が上限の文字数に収まっている**（スクリプトで数え直した）。上限が【未確認】の欄には注記を付けた
- [ ] App Storeのキーワード: 区切り（カンマ）が正しく、文字数とバイト数の両方を書いた
- [ ] 短い欄では、大事な語が前の方にある
- [ ] （Premium）画像・字幕: はみ出し、不自然な改行、禁則、中国語のフォントでの表示、豆腐（□）を確認した

### S8 納品物

- [ ] すべての修正に英語の理由が付いている
- [ ] 英語の理由が実際の修正と合っている（AIの説明が言い過ぎ・誤りになっていない）
- [ ] [CHECK] の印がレポートに残っていない
- [ ] 修正前・修正後の対照表の「修正後」が、貼り付け用の全文と一致している
- [ ] 貼り付け用の全文から [ID] の印を消した
- [ ] パッケージの納品物がすべて入っている（Basic: 修正版・簡易レポート・文字数 / Standard: ＋重要度・用語集 / Premium: ＋画像・字幕の指摘とスクリーンショット）
- [ ] Preferenceの修正に「Optional」と書いた
- [ ] 購入者への確認事項（Notes）を書いた
- [ ] ファイル名に注文番号と日付が入っている
- [ ] 納品のメッセージにAIの利用と人間の確認について正しく書いている（「100%手作業」と書いていない）
- [ ] 時間を作業票に記録した

---

## 4. 納品物のテンプレート

### 4.1 ファイルの構成

| ファイル | 内容 | パッケージ |
|---|---|---|
| `<注文番号>_JA_final.txt` | 欄ごとの修正後の日本語（そのまま貼り付けられる形） | 全部 |
| `<注文番号>_review_report.pdf`（または `.md` / `.xlsx`） | 講評、対照表、文字数、用語集、確認事項 | 全部（内容はパッケージで違う） |
| `<注文番号>_screenshots.zip` | 指摘を書き込んだスクリーンショット | Premium |

- レポートの形式（PDF／スプレッドシート）は、最初の数件で購入者の反応を見て決める【推測】。対照表が長いときはスプレッドシートの方が読みやすい。

### 4.2 貼り付け用の全文（`_JA_final.txt`）

```text
=== Japanese store page — final text ===
Order: <注文番号> / Delivered: <YYYY-MM-DD>
Paste each block into the matching field. Text between the lines only.

---------- [Steam] Short description (<n> characters) ----------
<修正後の日本語>

---------- [Steam] About This Game (<n> characters) ----------
<修正後の日本語。BBCodeのタグを含む>

---------- [App Store] Subtitle (<n> / 30 characters) ----------
<修正後の日本語>
```

### 4.3 レビューレポート（英語）

```markdown
# Japanese Store Page Review — <Game/App name>

- Order: <注文番号>
- Package: <Basic / Standard / Premium>
- Store: <Steam / App Store>
- Fields reviewed: <list>
- Source: English original (<n> words) / Existing Japanese provided by you
- Reviewed by: native Japanese reviewer (AI tools were used to help find possible issues; every change was decided and checked by a human)
- Date: <YYYY-MM-DD>

## 1. Overall assessment

**Before:** <例: The Japanese was understandable but read clearly as machine translation in about half of the sentences. Two factual errors would have misled buyers (player count and supported languages).>

**After:** <例: All Critical and Major issues are fixed. The text now reads like a natural Japanese store page and fits every character limit.>

| Severity | Found | Fixed | Optional suggestions |
|---|---|---|---|
| Critical | <n> | <n> | - |
| Major | <n> | <n> | - |
| Minor | <n> | <n> | - |
| Preference | <n> | - | <n> |

**Main patterns we found** (to help with future updates and in-game text):
1. <例: Overuse of "あなた" (you). Japanese usually drops the subject; repeating "you" sounds stiff and foreign.>
2. <例: The same term was translated in two ways (ダンジョン / 迷宮). We unified it as ダンジョン.>
3. <...>

## 2. Character count

| Field | Limit | Before | After | Status |
|---|---|---|---|---|
| Steam: Short description | 300 (*1) | <n> | <n> | OK |
| App Store: Subtitle | 30 | <n> | <n> | OK |
| App Store: Keywords | 100 (*2) | <n> chars / <n> bytes | <n> chars / <n> bytes | Please confirm |

*1 Steam does not publish an exact limit; 300 is based on the editor counter reported by third parties.
*2 Counted as Unicode characters. Please paste into App Store Connect to confirm it fits, as the exact counting rule for Japanese is not confirmed.

## 3. Changes (Before / After / Reason)

| ID | Field | Before (JA) | After (JA) | After, back-translated (EN) | Type | Severity | Reason |
|---|---|---|---|---|---|---|---|
| SD-01 | Short description | 4人以上で協力プレイ | 最大4人で協力プレイ | "Co-op for up to 4 players" | Mistranslation | Critical | The old text said "4 or more players", the opposite of your original. |
| AB-03 | About This Game | あなたはあなたの運命を選ぶことができます。 | 運命を選ぶのは、あなた自身だ。 | "Your fate is yours to choose." | Unnatural phrasing | Major | Literal translation of "You can choose your fate"; repeating "you" sounds robotic in Japanese. |
| AB-07 | About This Game | 迷宮 | ダンジョン | "dungeon" | Inconsistency | Minor | Unified with the term used elsewhere on the page (see Glossary). |
| AB-10 | About This Game | <...> | <...> | <...> | Store conventions | Preference (Optional) | <...> |

（Basicは「After, back-translated」と「Severity」の列を省く）

## 4. Glossary  （Standard / Premium）

| English | Japanese | Note |
|---|---|---|
| <Term> | <訳語> | <例: Katakana reading of the character name. Use this in the game too for consistency.> |

## 5. Display issues  （Premium）

| # | Image / Subtitle | Issue | Suggested text / fix | Screenshot |
|---|---|---|---|---|
| D-01 | Screenshot 3 | Line break splits a word (禁則) | <改行位置の案> | screenshot_03.png |
| D-02 | Capsule image | Characters rendered in a Chinese font (e.g., 直, 骨 look different) | Use a Japanese font such as Noto Sans JP | capsule.png |

## 6. Items that need your confirmation

1. <例: The original says "Coming 2027". Is a more specific date planned? Japanese store pages often show "2027年発売予定".>
2. <例: "The best roguelike ever" was kept as 史上最高のローグライク. Superlatives like this may need evidence under Japanese advertising rules; please judge whether to keep it. (This is not legal advice.)>

## 7. Scope notes

- Not included: in-game text, legal review, ASO ranking, image editing.
- Revisions: <n> left in this package. Changes to the English original or new text are handled as a new order.
```

---

## 5. 顧客とのやり取りに使う英語のメッセージテンプレート

**共通の決まり**
- やり取りはすべてFiverrの中で行う。メール・Discordなど外での連絡先を求めない／渡さない（Fiverrの規約で制限がある【推測】。条文は出品前に確認する【未確認】）。
- 支払いの話は、Fiverrの機能（Extras、カスタムオファー）だけを使う。
- 返信は24時間以内を目安とする。時差のため、日本時間で送った時刻を意識しない書き方にする（"today" より "within 24 hours"）。
- `<…>` は差し込む値。送る前に人間が読み直す。

### 5.1 注文時の質問（Fiverrの Requirements に設定する）

> 1. **Which store and fields should I review?** (e.g., Steam: short description + About This Game / App Store: name, subtitle, promotional text, keywords, description, What's New)
> 2. **Please upload or paste the English original and your current Japanese text for each field.** A spreadsheet or a document with one section per field works best. Please keep any BBCode/HTML tags as they are.
> 3. **Store page URL** (if already public), or a short description of the game/app and its target players.
> 4. **Do you have existing Japanese terms we should follow?** (e.g., character names, item names, the official Japanese title, in-game glossary). If not, I will create a glossary for you (Standard and Premium).
> 5. **Preferred tone** (optional): polite and standard (most common on Japanese stores) / casual / match the current Japanese.
> 6. **Is this text confidential or not yet announced?** If yes, please tell me the announcement date.
> 7. **Anything else I should know?** (e.g., deadlines for a sale or launch, words that must stay in English)

### 5.2 受注時のあいさつ・追加の質問

**A. 情報が揃っているとき**

> Hi <name>,
>
> Thank you for your order! I've received your English original and Japanese text for <fields> (<n> words in English), and everything I need is here.
>
> I'll deliver the corrected Japanese and the review report by <date in buyer's timezone if known, otherwise "the delivery date shown on the order">.
>
> If you have any notes in the meantime (preferred terms, things that must stay in English), just send them here.
>
> Best regards,
> <seller name>

**B. 確認が必要なとき（1回でまとめて聞く）**

> Hi <name>,
>
> Thank you for your order! Before I start, I have <n> quick question(s) so the review matches your needs:
>
> 1. <例: I received the Japanese for the short description, but not for "About This Game". Could you send it, or should I review the short description only?>
> 2. <例: The character "Ash" appears as アッシュ and エッシュ. Do you have a preferred spelling from the game? If not, I'll recommend one.>
> 3. <...>
>
> I'll start as soon as I hear back. If anything is unclear, feel free to ask.
>
> Best regards,
> <seller name>

### 5.3 範囲を超える・範囲外のとき

**A. 語数や欄がパッケージを超えるとき**

> Hi <name>,
>
> Thank you for sending the text! The English original is about <n> words, which is above the <limit>-word limit of the <package> package.
>
> Two options:
> 1. I review the first <limit> words only (<fields>), or
> 2. I send you an extra offer for the additional <n> words (<price> USD), and review everything.
>
> Please let me know which you prefer.
>
> Best regards,
> <seller name>

**B. 対象外の依頼のとき**

> Hi <name>,
>
> Thank you for your interest! Unfortunately, <in-game text / legal documents / voice scripts / translation from languages other than English> is outside what I offer, because I can't guarantee the quality I promise for it.
>
> <いずれか>
> - What I can do: review the Japanese for <fields in scope>. Would you like me to go ahead with those?
> - If you don't have Japanese text yet, you can create a first draft with an AI or machine translation tool and order a review, or I can send you a custom quote for that.
>
> Best regards,
> <seller name>

（取り消しが必要なときは、Fiverrの取り消しの手続きを使う。送る前に人間が判断する）

### 5.4 納品

> Hi <name>,
>
> Your Japanese store page review is ready. Attached:
>
> - **<file>_JA_final.txt** — the corrected Japanese for each field, ready to paste.
> - **<file>_review_report** — what was changed and why, with character counts<, a glossary, and display notes>.
>
> **Summary:** <例: I made 18 changes. Two were important: the player count said "4 or more" instead of "up to 4", and the supported languages didn't match your original. Everything now reads naturally and fits the character limits.>
>
> **Please check:**
> - <例: Section 6 of the report has 2 questions for you (release date wording, a superlative claim).>
> - <例: Please paste the keywords into App Store Connect to confirm they fit — the counting rule for Japanese characters isn't officially documented.>
>
> Suggestions marked "Optional" are up to you. If you'd like any changes, you have <n> revision(s) included — just reply here.
>
> Thank you for working with me!
>
> Best regards,
> <seller name>

### 5.5 修正依頼への返答

**A. こちらの誤り（回数に数えない）**

> Hi <name>,
>
> Thank you for catching that, and I'm sorry for the mistake. You're right — <例: "online co-op" was missing from the short description>. I've fixed it and checked the rest of the text again for similar issues.
>
> Updated files are attached. This doesn't count as one of your revisions.
>
> Best regards,
> <seller name>

**B. 好みの変更（回数に数える）**

> Hi <name>,
>
> Thanks for the feedback! I've updated the text as requested:
>
> - <例: Changed the tone of the short description to be more casual.>
> - <例: Kept "Roguelite" in English in the title area.>
>
> <必要なときだけ> One note: <例: in the About section, writing "Roguelite" in English mid-sentence is less common on Japanese stores, so I kept ローグライト there. Happy to change it too if you prefer.>
>
> Updated files are attached. You have <n> revision(s) left.
>
> Best regards,
> <seller name>

**C. 範囲外（原文の変更・文章の追加）**

> Hi <name>,
>
> Thanks for sending the updated text! Since the English original has changed / this is new text (<n> words), it's outside the revision of the original order — revisions cover changes to the text I reviewed.
>
> I can review it for <price> USD with delivery in <n> days. I'll send you an offer here if that works for you.
>
> Best regards,
> <seller name>

**D. こちらの修正に同意してもらえないとき**

> Hi <name>,
>
> Thank you for your comment — let me explain my reasoning on <ID>, and then the final choice is yours.
>
> - Your version: <日本語> — reads like "<back-translation>".
> - My version: <日本語> — reads like "<back-translation>".
> - Why I changed it: <理由>
>
> <Criticalの場合のみ> Please note that the earlier version says <例: "4 or more players">, which could mislead buyers about the game.
>
> If you'd still like to use your version, just let me know and I'll update the files.
>
> Best regards,
> <seller name>

**E. 納期の延長をお願いするとき（使わないのが原則）**

> Hi <name>,
>
> I'm writing to ask for a short extension of <n> day(s) for your order. <理由: 例: Your answer about the character names came in yesterday, and I'd like to apply it carefully across all fields.> I'll send an extension request through Fiverr — please accept it if that works for you. If you need the delivery by the original date, let me know and I'll prioritize it.
>
> Best regards,
> <seller name>

### 5.6 評価のお願い（完了後に1回だけ）

> Hi <name>,
>
> Thank you again for your order — I hope your Japanese store page does well!
>
> If you have a moment, I'd really appreciate it if you could share your honest feedback about this order on Fiverr. It helps me improve and helps other developers decide.
>
> When you update your store page or start on in-game text, feel free to message me anytime.
>
> Best regards,
> <seller name>

- 「5つ星をお願いします」と書かない。評価と引き換えの値引き・特典を出さない。Fiverrは評価の操作を禁じている【推測】（条文は出品前に確認【未確認】）。
- 評価が付いた後の返信（Seller response）は、低い評価のときこそ短く丁寧に、事実だけを書く【推測】。

---

## 6. 記録と改善

| 記録すること | 置き場所 | 使い道 |
|---|---|---|
| 工程ごとの時間 | 作業票 | 最初の10件で [localization-service.md §5](localization-service.md) の作業時間【仮定】を実測に置き換える |
| AIの指摘の採用率・見落とし | 作業票のメモ | P2の改善（§2.6） |
| 修正依頼の分類（A〜D） | 作業票 | Aが多ければチェックリストを見直す。Cが多ければ出品ページの説明を見直す |
| よく出る問題の型 | 本書に追記 | P2の「見ること」とチェックリストに反映 |

- 注文の記録のうち、購入者の文章そのものはGitに入れず、時間・件数・分類だけを残す【推測】。

---

## 7. 決まっていないこと・CEOへの報告

| 項目 | 状態 | 次の手 |
|---|---|---|
| 機械チェック（S3）のスクリプト | 未作成 | 次のタスクの候補（Unicodeの文字数、UTF-8のバイト数、語数、長音・全角半角・句読点のゆれ、数字の照合）。出品前に作れば、時間の短縮に効く【推測】 |
| 使うAIツールと、入力データの扱い | 【未確認】 | ツールの選定と設定の確認（有料なら支出の承認） |
| 購入者の文章の保存場所と保存期間 | 未定 | 人間が決める |
| Fiverrの規約（外部の連絡、評価のお願い、納期の時計が始まる条件） | 【未確認】 | 出品前に規約とヘルプを確認するタスクを入れる |
| レポートの形式（PDF／スプレッドシート） | 未定 | 最初の数件で決める |
| 「AI不可」の注文の扱い | 未定（案は「断る」） | 人間の承認（[localization-service.md §9](localization-service.md)） |
| 実際の作業時間 | 【仮定】 | 公開されている英語のストアページをAIで訳したサンプルで、本書の手順を1回通して試すと、出品前に時間とテンプレートの使い勝手を確かめられる【推測】 |

- 本書のメッセージのテンプレートは下書き。送るのは受注後で、送る操作は人間が行う。出品や外部への送信は行っていない。
