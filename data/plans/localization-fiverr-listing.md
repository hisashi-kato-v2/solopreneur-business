# Fiverrの出品文（英語）とギャラリー画像の構成案

- 作成日: 2026-10-29
- タスク: T0007（前提: T0005 [localization-service.md](localization-service.md)、T0004 [localization-validation.md](../research/localization-validation.md)、T0006 [localization-ops.md](localization-ops.md)）
- 表記: **【事実】** 出典で確認済み / **【推測】** 分析・仮説 / **【未確認】** 裏付けなし

> ## ⚠ 公開前に人間の承認が必要
> 本書は**下書き**です。Fiverrへの出品（アカウント作成・公開・契約）は**人間の承認を得てから、人間が行います**。Task Runnerは出品も外部への送信も行っていません。
> 公開の前に、最低でも §0 の「公開前に決めること・確かめること」をすべて済ませてください。

---

## 0. 公開前に決めること・確かめること

| # | 項目 | なぜ必要か | 状態 |
|---|---|---|---|
| A1 | **出品アカウントの持ち主が、日本語ネイティブで、実際に全文を読む本人か** | 出品文は一人称で「I'm a native Japanese speaker」「I read 100% of your text myself」と書いている。最終確認者は未定（[localization-service.md §7](localization-service.md)）。本人でない場合はこの2文を書き換える必要がある。偽るとアカウント停止の対象になりうる【事実】（[Using AI on Fiverr](https://help.fiverr.com/hc/en-us/articles/34998793899665-Using-AI-on-Fiverr-Guidelines-for-freelancers-and-clients)） | 【未確認】人間が決める |
| A2 | 使うAIツールが**入力を学習に使わない設定か** | FAQ Q9で、その設定を前提にした文を書いた。確認できないなら、Q9は「代替案」の文に差し替える | 【未確認】 |
| A3 | 「AI不可」の注文を断るか、+50%で受けるか | 出品文は「注文前にメッセージをください」とだけ書き、どちらにも対応できるようにした。決まったらFAQ Q1に1文足す | 未定（人間の承認） |
| A4 | 価格（入門価格20/50/100ドルで始めるか） | [localization-service.md §1.3](localization-service.md) の案に従って入門価格で記入した | 人間の承認 |
| A5 | 各欄の文字数の上限 | タイトル80文字、説明1,200文字、タグ5個は検索結果の抜粋で確認【事実】（[Fiverr Help: Creating a Gig](https://help.fiverr.com/hc/en-us/articles/360010451397-Creating-a-Gig)、[Fiverr Community](https://community.fiverr.com/forums/topic/340594-how-many-characters-we-should-use-for-the-fiverr-gig-description)）。パッケージ名・パッケージ説明・FAQ・タグ1個あたりの上限は確認できず【未確認】。短めに書いたが、入力画面のカウンターで最終確認する | 一部【未確認】 |
| A6 | Fiverrの規約の本文（外部の連絡先、評価の依頼、画像の決まり） | 自動取得が403で拒否され、本文を読めていない（[localization-validation.md](../research/localization-validation.md) 冒頭） | 【未確認】人間がブラウザで確認 |
| A7 | カテゴリーの選び方 | §1の候補はFiverrの一覧ページのURL（`/gigs/game-localization` など）から推測したもの | 【未確認】出品画面で選ぶ |

---

## 1. 基本情報（Overview）

### 1.1 タイトル（Gig title）

```
I will review your AI translated Japanese Steam or App Store page
```

- 65文字（"I will" を含む）。上限80文字【事実】（上記A5の出典）。
- Fiverrは「&」「/」「"」「+」などの記号を避けるよう案内しているため、「Steam / App Store」とは書かず「or」でつないだ【事実】（同上）。
- 検索結果では50〜59文字前後で切れるという情報があるため、重要な語（review, AI translated, Japanese, Steam）を前半に置いた【推測】（第三者の情報）。

**予備のタイトル案**（A/Bの比較用）
```
I will proofread your machine translated Japanese game store page
I will check and fix your Japanese Steam or App Store description
```

### 1.2 カテゴリー【未確認】

- 第1候補: Writing & Translation ＞ Localization（ゲーム・アプリのローカライズ）
- 第2候補: Writing & Translation ＞ Proofreading & Editing
- 選んだカテゴリーによって、パッケージの比較表の項目（例: "Words included"）が変わる可能性がある【未確認】。

### 1.3 検索タグ（5個）

| 優先 | タグ | 文字数 | ねらい |
|---|---|---|---|
| 1 | `japanese proofread` | 18 | 一覧ページ [Japanese Proofread](https://www.fiverr.com/gigs/japanese-proofread) と同じ語【事実】 |
| 2 | `game localization` | 17 | 一覧ページ [Game Localization](https://www.fiverr.com/gigs/game-localization)【事実】 |
| 3 | `app localization` | 16 | 一覧ページ [App Localization](https://www.fiverr.com/gigs/app-localization)【事実】 |
| 4 | `steam localization` | 18 | 競合にストアページ専用の出品が見つからない（[localization-validation.md §6.2](../research/localization-validation.md)）。検索量は【未確認】 |
| 5 | `japanese review` | 15 | 既存の訳のレビューを探す人向け【推測】 |

- 入れ替え候補: `machine translation`（19）、`post editing`（12）、`japanese localization`（21。1個あたりの上限が20文字なら入らない【未確認】）。
- タグに「Steam」を入れるが、ロゴは使わず、文字で対象ストアを示すだけにする（§6）。

---

## 2. 説明文（Description）— そのまま貼る部分

```
Used AI or machine translation for your Japanese Steam or App Store page? I'm a native Japanese speaker, and I'll check every line against your English original.

WHAT I CHECK
- Mistranslations: features, player count, supported languages, dates
- Unnatural phrasing that reads like machine translation
- Inconsistent terms, names and punctuation
- Japanese store conventions and tone
- Character limits for each field

WHAT YOU GET
- Corrected Japanese text, ready to paste
- An English report: what I changed and why
- Severity levels and a glossary (Standard and Premium)

HOW I WORK
I use AI tools to suggest possible issues. I read 100% of your text myself and make every final decision. I never deliver raw AI output. If you need a no-AI workflow, please message me before ordering.

NOT INCLUDED
In-game text, voice, translation from scratch, image editing, legal text, logging in to your store account. Steam tags are translated by Steam automatically.

I can't promise sales or rankings. I do promise that no critical or major issue I find is left in the delivered text, and every change comes with a reason in English.
```

- 文字数: 約1,150文字（手で数えた概算）。上限1,200文字【事実】。**入力画面のカウンターで確認し、超えたら最後の段落の2文目を削る。**
- A1が「本人ではない」となった場合の差し替え:
  - 1段落目 → `A native Japanese speaker will check every line against your English original.`
  - HOW I WORK → `A native Japanese speaker reads 100% of your text and makes every final decision.`
- 最後の段落の「no critical or major issue I find is left」は、[localization-service.md §3.3](localization-service.md) の納品条件（Critical・Majorをゼロにする）に合わせた。「見つけたものは残さない」と書き、「誤りがゼロ」とは約束していない。

---

## 3. パッケージ（Scope & Pricing）

### 3.1 3つのパッケージ

| 項目 | Basic | Standard | Premium |
|---|---|---|---|
| パッケージ名 | `Short Fields Check` | `Full Store Page Review` | `Store Page Plus Visuals` |
| 説明（貼る文） | `Up to 150 English words. Steam short description, or App Store name, subtitle, promo text, keywords.` | `Up to 800 English words. Full Steam or App Store page text, severity report, glossary (20 terms).` | `Up to 1,500 words, plus text in up to 10 screenshots and 3 min of trailer subtitles. Annotated images.` |
| 納期 | 2 days | 3 days | 5 days |
| 修正回数 | 1 | 2 | 3 |
| 価格（入門） | **$20** | **$50** | **$100** |
| 価格（通常。評価10件か8週間で変更） | $25 | $60 | $120 |

- 説明はどれも100文字前後。パッケージ説明の上限は【未確認】（A5）。超える場合は、末尾の項目（Basicの「keywords」、Premiumの「Annotated images.」）から削り、削った内容は説明文かFAQで補う。
- 価格・量・納期・修正回数は [localization-service.md §1.1](localization-service.md) のまま。

### 3.2 比較表のチェック項目（カテゴリーで出る項目に合わせて設定）【未確認】

| 項目（例） | Basic | Standard | Premium |
|---|---|---|---|
| Proofreading（原文との照合） | ✓ | ✓ | ✓ |
| Character count per field | ✓ | ✓ | ✓ |
| English change report | ✓（simple） | ✓（with severity） | ✓（with severity） |
| Glossary | – | ✓ | ✓ |
| Screenshot / subtitle check | – | – | ✓ |

### 3.3 追加オプション（Gig Extras）

| 名前（貼る文） | 価格 | 説明（貼る文） |
|---|---|---|
| `Extra 200 words` | $10 | `For text over your package's word limit.` |
| `Extra fast delivery` | Basic +$10 / Standard +$20 / Premium +$40 | 24時間で納品（Fiverrの標準の特急オプションで設定）。**週の作業時間に余裕がない時期はオフにする** |
| `Extra screenshot` | $3 | `Each image over the 10 included in Premium.` |
| `Extra 20 glossary terms` | $5 | `More terms added to your glossary.` |
| `Second store page` | $40 | `Same game on both Steam and App Store. Standard scope for the second page.` |

---

## 4. FAQ — そのまま貼る部分

各回答は300文字以内を目安にした（FAQの上限は【未確認】）。

**Q1. Do you use AI?**
> Yes, as a helper. AI tools suggest possible issues and draft the English report. I read every line myself, decide what to change, and write the final Japanese. I never deliver raw AI output. If you need a no-AI workflow, please message me before ordering.

（A3が決まったら1文足す。断る場合: `I don't offer a no-AI workflow at the moment.` ／受ける場合: `A no-AI workflow is available as a custom offer at a higher price.`）

**Q2. My game has no Japanese text yet. Can you translate it?**
> This gig reviews existing Japanese text. You can make a first draft with a translation tool and then order a review, or message me and I'll tell you if I can make a custom offer.

**Q3. Do you check in-game text or UI?**
> Not in this gig. It covers store page text only (and screenshots and trailer subtitles in Premium). Please message me if you need help with in-game text.

**Q4. Do you review Steam tags?**
> No. Steam translates tags into each language automatically, so you don't need Japanese tags. For the App Store, the keywords field is included.

**Q5. How do you count words?**
> I count the words in your English original for the fields you choose. If your text is over the package limit, please add "Extra 200 words". Not sure? Send me the text before ordering and I'll tell you which package fits.

**Q6. Will my text fit the store's character limits?**
> I'll keep each field within the store's limit and show the character count. Please paste the text into Steamworks or App Store Connect once to confirm, because the store's own editor is the final check.

**Q7. Will this increase my sales, downloads or ranking?**
> I can't promise that. Sales and rankings depend on many things outside the text. What I do promise: the Japanese reads naturally, matches your English, and every change is explained.

**Q8. Do you need access to my Steamworks or App Store Connect account?**
> No. I deliver the corrected text and you paste it in yourself. Please don't share your login details.

**Q9. Is my unreleased text kept confidential?**
> Yes. I use your text only for your order and don't share it. The AI tools I use are set so that your text is not used to train them. If your text must not go into any AI tool, tell me before ordering.

（**A2が確認できるまでは使わない。** 確認できない場合の代替文: `Yes. I use your text only for your order and don't share it. If your text must not go into any AI tool, please tell me before ordering.`）

**Q10. What counts as a revision?**
> A revision is a change to the text I delivered, based on your feedback. If I made a mistake, fixing it doesn't count as a revision. New or changed English text after delivery is a new order.

**Q11. My game is on both Steam and the App Store.**
> Order the package for one store and add "Second store page" ($40). Much of the text is usually shared, so the second page costs less.

**Q12. Can you deliver faster?**
> Yes, when "Extra fast delivery" is shown, I can deliver in 24 hours. If it isn't shown, my schedule is full for rush orders.

---

## 5. 購入者への質問（Requirements）— そのまま貼る部分

[localization-ops.md §5.1](localization-ops.md) をもとに、Fiverrの形式（自由記述・選択式・添付）と必須かどうかを付けた。形式の名前はFiverrの画面で確認する【未確認】。

| # | 質問（貼る文） | 形式 | 必須 |
|---|---|---|---|
| 1 | `Which store and fields should I review? (e.g., Steam: short description and About This Game. App Store: name, subtitle, promotional text, keywords, description, What's New)` | Free text | 必須 |
| 2 | `Please upload or paste the English original and your current Japanese text for each field. A spreadsheet or a document with one section per field works best. Please keep any BBCode or HTML tags as they are.` | Free text ＋ attachment | 必須 |
| 3 | `Store page URL (if already public), or a short description of the game or app and its target players.` | Free text | 必須 |
| 4 | `Do you have Japanese terms I should follow? (e.g., character names, item names, the official Japanese title, an in-game glossary) If not, I'll create a glossary for you (Standard and Premium).` | Free text ＋ attachment | 任意 |
| 5 | `Preferred tone` — 選択肢: `Polite and standard (most common on Japanese stores)` / `Casual` / `Match the current Japanese` | Multiple choice | 任意 |
| 6 | `Is this text confidential or not yet announced? If yes, please tell me the announcement date.` | Free text | 必須 |
| 7 | `I use AI tools as a helper, and I review 100% of the text myself. Is that OK?` — 選択肢: `Yes, that's fine` / `No, I need a no-AI workflow (please message me first)` | Multiple choice | 必須 |
| 8 | `Anything else I should know? (e.g., a sale or launch deadline, words that must stay in English)` | Free text | 任意 |

- 質問7は、Fiverrの「AIを使ってほしくない購入者は注文前か開始時に伝える」という決まりに対応するため追加した【事実】（[Using AI on Fiverr](https://help.fiverr.com/hc/en-us/articles/34998793899665-Using-AI-on-Fiverr-Guidelines-for-freelancers-and-clients)）。「No」が選ばれたら、AIを使う前に作業を止め、A3の方針で対応する。**ops側（§5.1）にもこの質問を足す必要がある。**
- 質問8の例に「Discordで連絡」などを書かない（外部の連絡先を求めない。[localization-ops.md §5](localization-ops.md)）。

---

## 6. ギャラリー画像の構成案

### 6.1 共通の決まり

| 項目 | 内容 | 区分 |
|---|---|---|
| サイズ | 推奨1280×769px（最小712×430px）と言われる。画像は最大3枚、PDFは2つまで | 【未確認】（記憶にもとづく。出品画面で確認） |
| 使う素材 | **架空のゲーム**（例: 「Lantern Depths」、ローグライクの探索ゲーム）の文章を自作して使う。実在のゲームのストアページ、他社の文章・画像は使わない | 権利の侵害を避けるため |
| ロゴ | SteamやAppleのロゴ、App Storeのバッジは使わない。「Steam」「App Store」は文字で書くだけ | 商標の扱いが分からないため【推測】 |
| 書かないこと | 実在しない顧客の声・評価、「100% accurate」「Guaranteed」などの保証、売上や順位の数字、連絡先（メール・SNS） | §7 |
| 文字 | 英語を主に、日本語は修正前後の例だけ。サムネイル（小さく表示）でも読めるよう、1枚の文字は少なくする | 【推測】 |
| 注記 | 例の画像の下に小さく `Sample with a fictional game` と入れる | 架空の例であることを明示 |

### 6.2 画像1（カバー。検索結果に出る）

```
┌───────────────────────────────────────────────┐
│  Japanese Store Page Review                   │ ← 大きく
│  for Steam and App Store                      │
│                                               │
│  BEFORE (machine translation)                 │
│  「あなたはあなたの運命を選ぶことができます」   │ ← 赤の下線
│  AFTER (native review)                        │
│  「運命は、あなたが選ぶ。」                     │ ← 緑
│                                               │
│  Native Japanese reviewer · Report in English │ ← 小さく
└───────────────────────────────────────────────┘
```

- ねらい: 「既存の訳を直す」商品だと一目で分かる。翻訳を新しく作る出品（競合の多数）との違いを見せる【推測】。
- 「Native Japanese reviewer」はA1が本人の場合のみ。

### 6.3 画像2（修正前後の比較。何を直すかを見せる）

3つの例を縦に並べる。各例は「英語の原文 → 修正前 → 修正後 → 英語の理由」。

| 種類 | English | Before | After | Reason（画像に書く英語） |
|---|---|---|---|---|
| Mistranslation（Critical） | Co-op for up to 4 players | 4人以上で協力プレイ | 最大4人で協力プレイ | "以上" means "4 or more". Buyers would expect 5+ players. |
| Unnatural（Major） | You can choose your own destiny. | あなたはあなたの運命を選ぶことができます。 | 運命は、あなたが選ぶ。 | Literal translation. Repeating "you" sounds machine-made in Japanese. |
| Character limit（Major） | App Store subtitle | 31文字の例 | 30文字以内に短縮した例 | Over the 30-character limit for the subtitle. |

- 例1と例2は [localization-service.md §3.1](localization-service.md) の例をそのまま使う。
- 例3の具体的な文は画像の制作時に作る。App Storeのサブタイトルの30文字の上限は【事実】（[App Store Connect: App information](https://developer.apple.com/help/app-store-connect/reference/app-information/)）。ただし日本語の数え方は【未確認】のため、画像には「31 characters」とだけ書き、数え方の説明は入れない。

### 6.4 画像3（納品物の見本。何が届くかを見せる）

```
┌───────────────────────────────────────────────┐
│  What you get                                 │
│                                               │
│  ① Corrected Japanese   ② English report     │
│   (ready to paste)       ┌───────────────────┐│
│                          │Field│Sev.│Before│ ││
│                          │After│Reason       ││
│                          └───────────────────┘│
│  ③ Glossary (Std+)      ④ Annotated          │
│                            screenshot (Prem.) │
│                                               │
│  Delivery: 2 / 3 / 5 days                     │
└───────────────────────────────────────────────┘
```

- レポートの表は [localization-ops.md](localization-ops.md) の納品テンプレート（§4付近の Summary・Changes・Glossary）の形に合わせ、架空のゲームの内容で埋める。
- ④の注釈つきスクリーンショットは、架空のゲーム画面（自作の簡単な画像）に「はみ出し」「中国語のフォントの字形」などの指摘を書き込んだもの。

### 6.5 PDF（任意）

- `Sample_Report_Lantern_Depths.pdf`: 架空のゲームのStandard相当の納品物の見本（2〜3ページ）。購入者が英語のレポートの中身を確かめられる【推測】。
- 制作は、最初のサンプル試行（[localization-ops.md §7](localization-ops.md) の「公開されている英語のページをAIで訳して試す」）と同時に行うと手間が少ない。ただし見本に載せる文章は**自作の架空の文**にする（公開ページの文章は載せない）。

### 6.6 動画

- 最初は作らない。必要になったらCEOが判断する。

---

## 7. 誇大表現・約束できない保証の確認

### 7.1 使っていない表現

| 表現 | 使わない理由 |
|---|---|
| "100% accurate" / "perfect" / "error-free" | 人間の確認でも見落としはありうる。約束できない |
| "Guaranteed" / "boost your sales" / "rank higher" / "more downloads" | 売上・順位は約束しない（[localization-service.md §3.3](localization-service.md)） |
| "100% manual" / "human-only" / "no AI" | AIを補助に使うため。偽るとアカウント停止の対象になりうる【事実】（[Using AI on Fiverr](https://help.fiverr.com/hc/en-us/articles/34998793899665-Using-AI-on-Fiverr-Guidelines-for-freelancers-and-clients)） |
| "Professional translator" / "X years of experience" / "certified" | 担当者の経歴が未確定【未確認】。経歴が確定したら、事実の範囲で足してよい |
| "Store approval guaranteed" | ストアの審査は約束しない |
| "Unlimited revisions" | 修正回数はパッケージごとに決めている |
| 架空の顧客の声・実績数 | 実績がまだない。捏造になる |
| "Best" / "No.1" / "the only" | 競合の調査は検索の範囲内に限られる【推測】 |

### 7.2 書いた主張とその根拠

| 主張（出品文の中） | 根拠・条件 |
|---|---|
| I'm a native Japanese speaker / I read 100% of your text myself | **A1が本人であることが条件**。そうでなければ§2の差し替え文を使う |
| I never deliver raw AI output | 作業手順で人間が全文を確認する（[localization-service.md §4](localization-service.md)）。Fiverrの条件でもある【事実】 |
| Character limits for each field / keep each field within the limit | 機械で文字数を数える手順あり（[localization-ops.md](localization-ops.md)）。日本語の数え方が【未確認】の欄があるため、Q6で「ストアの編集画面で最終確認を」と案内した |
| no critical or major issue I find is left | 納品条件（[localization-service.md §3.3](localization-service.md)）。「見つけたもの」に限定 |
| Steam translates tags automatically | 【事実】（[Steamworks: Steam Tags](https://partner.steamgames.com/doc/store/tags)） |
| The AI tools I use are set so that your text is not used to train them（Q9） | **A2の確認が条件**。未確認なら代替文 |
| 24-hour delivery（Extra） | 予定が空いているときだけオンにする |
| Much of the text is usually shared（Q11） | 【推測】。「usually」に留めた |
| the Japanese reads naturally, matches your English（Q7） | 納品条件のMajor（一目で機械翻訳と分かる・意味が分からない）をゼロにする基準に対応。結果（売上）の約束はしていない |

---

## 8. CEOへの報告

1. **出品文の一人称の主張は、担当者が決まるまで確定できない**（A1）。出品アカウントの名義人と実際の最終確認者が違う場合、「I」で書いた主張は使えない。担当者の決定を出品の前提条件にすることを提案する。
2. Requirementsに**AIの利用への同意を確かめる質問（質問7）**を足した。[localization-ops.md §5.1](localization-ops.md) にも同じ質問を足す必要がある。
3. FAQ Q9（AIの学習に使わない）は、AIツールの選定と設定の確認が済むまで公開できない（A2）。

## 9. 必要な人間の承認

- **Fiverrへの出品（アカウント作成・公開・契約）。本書の文案・価格・タグ・画像の確定を含む。公開は人間が行う。**
- 出品アカウントの名義人と最終確認者の決定（A1）
- 「AI不可」の注文の扱い（A3）
- 使うAIツールの選定（有料なら支出の承認）と、学習に使わない設定の確認（A2）
- ギャラリー画像とPDF見本の制作（外部のツールや有料素材を使う場合は支出の承認）

## 出典

- [Fiverr Help: Creating a Gig](https://help.fiverr.com/hc/en-us/articles/360010451397-Creating-a-Gig)（検索結果の抜粋。タイトル80文字・"I will"を含む・記号を避ける・タグ5個）
- [Fiverr Community: Gig descriptionの文字数](https://community.fiverr.com/forums/topic/340594-how-many-characters-we-should-use-for-the-fiverr-gig-description)（説明1,200文字）
- [Fiverr Help: Using AI on Fiverr](https://help.fiverr.com/hc/en-us/articles/34998793899665-Using-AI-on-Fiverr-Guidelines-for-freelancers-and-clients)（[localization-validation.md §3](../research/localization-validation.md) 経由）
- [Steamworks: Steam Tags](https://partner.steamgames.com/doc/store/tags) / [App Store Connect: App information](https://developer.apple.com/help/app-store-connect/reference/app-information/)（[localization-service.md](localization-service.md) 経由）
- その他の価格・範囲・品質基準は [localization-service.md](localization-service.md)、手順・Requirementsの元は [localization-ops.md](localization-ops.md)
