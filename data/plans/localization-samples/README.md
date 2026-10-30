# ポートフォリオ用サンプル（修正前・修正後の見本）

- 作成日: 2026-10-29
- タスク: T0008（前提: [localization-service.md](../localization-service.md)、[localization-ops.md](../localization-ops.md)）
- 表記: **【事実】** 出典で確認済み / **【推測】** 分析・仮説 / **【未確認】** 裏付けなし
- 状態: **下書き。公開していない。** 公開（Fiverrの出品ページ・ポートフォリオへの掲載）には、人間の確認（§4）と公開の承認が必要

---

## 1. 中身

| ファイル | 作品（すべて架空） | ストア・欄 | 見せたいこと | 集計（Critical / Major / Minor / Preference） |
|---|---|---|---|---|
| [sample1-mosswick-vaults.md](sample1-mosswick-vaults.md) | Mosswick Vaults（ローグライトのデッキ構築・最大2人の協力） | Steam：短い説明、About This Game | 人数（「最大2人」→「2人以上」）と対応言語（簡体字→繁体字）の誤り、"run" "vault" の誤訳、慣用句の直訳 | 2 / 9 / 4 / 0 |
| [sample2-ninefold-bellworks.md](sample2-ninefold-bellworks.md) | Ninefold Bellworks（手描きのメトロイドヴァニア・発売前） | Steam：短い説明、About This Game | 数字の誤り（3秒→30秒、20時間以上→20時間）、名前の誤訳（Wren→ミソサザイ）、"tight" などの多義語、発売予定の書き方 | 1 / 8 / 5 / 1 |
| [sample3-murmlet-focus-timer.md](sample3-murmlet-focus-timer.md) | Murmlet: Focus Timer（集中タイマーのアプリ） | App Store：名前、サブタイトル、プロモーションテキスト、キーワード、説明 | 否定の抜け（「アカウント不要」→「必要」）、"focus"＝「焦点」の誤訳、キーワード欄の区切りとバイト数、文字数の上限 | 1 / 7 / 5 / 2 |

各ファイルの構成（共通）:
1. 英語の原文（架空）
2. 修正前（機械翻訳風の日本語・作例）
3. 修正後の日本語（【要確認 H-xx】の印つき）
4. 対照表（ID・修正前・修正後・逆翻訳・種類・重要度・英語の理由・日本語のメモ）。書式は [localization-ops.md §4.3](../localization-ops.md) に合わせた
5. 文字数
6. 人間（日本語ネイティブ）の確認が必要な箇所（H-01〜）
7. 用語集

## 2. 権利についての確認

- 英語の原文、作品名、キャラクター名、地名、機能名、日本語の文章は、すべてこのタスクで新しく書いた架空のもの。実在の作品・企業のストアページの文章は参照・引用していない。
- 作品名がほかと重ならないかを、2026-10-29にWeb検索で確かめた結果:

| 名前 | 結果 | 出典 |
|---|---|---|
| Mosswick Vaults | 同じ名前のゲーム・製品は見つからなかった | Web検索（"Mosswick Vaults" game） |
| Ninefold Bellworks | 同じ名前は見つからなかった（"The Bellworks" という名前のFINAL FANTASY XIVのファンの集まりはある） | Web検索（"Ninefold Bellworks"）、[bellworksffxiv.carrd.co](https://bellworksffxiv.carrd.co) |
| Murmlet | 同じ名前のアプリ・ゲームは見つからなかった | Web検索（"Murmlet" app OR game） |
| （不採用）Hushbloom | 同じ名前は見つからなかったが、"Habit Bloom" "Bloomtick" など名前の近い習慣アプリが多いため使わなかった | [Habit Bloom（Product Hunt）](https://www.producthunt.com/products/habit-bloom/makers) |
| （不採用）Tallyroot | 同じ名前の家計管理アプリがあったため使わなかった | [AlternativeTo: Tallyroot](https://alternativeto.net/software/tallyroot/about/) |

- **【未確認】** 一般のWeb検索で見つからなかっただけで、商標の登録がないことは確かめていない。公開する前に、人間が商標のデータベース（J-PlatPat、USPTOなど）とSteam・App Storeの検索で確認する方が安全【推測】。
- 作中の「Pomodoro」（サンプル3）は一般の言葉として使ったが、商標として登録されているという情報がある【未確認】（sample3 の H-08）。気になる場合は別の機能名に替えられる。
- 「修正前」の日本語は、機械翻訳にありがちな問題を**AIが再現して書いた作例**で、特定の翻訳ツール（DeepL、Google翻訳など）の実際の出力ではない。公開するときに「○○の翻訳結果」と書かない。英語では例えば "Illustrative example. The 'Before' text was written to show common machine-translation problems; it is not the output of any specific tool." と注記する。

## 3. 作り方（手順との対応）

| 手順（[localization-ops.md](../localization-ops.md)） | このサンプルでの扱い |
|---|---|
| S1・S2 受注・整形 | 作業票の代わりに、各ファイルの冒頭に想定の条件（ストア・欄・パッケージ・文体）を書いた |
| S3 機械チェック | **実施できなかった。** この作業の環境ではスクリプトを動かせず、スクリプト自体も未作成（ops §7）。文字数は目視の値で、【未確認】と書いた |
| S4 AIでの指摘（P1・P2） | AIが用語集と指摘の一覧、修正後の日本語を作った（P1・P2の出力の形に合わせた） |
| S5・S6 人間の確認 | **未実施。** 各ファイルの §6 に、人間が判断すべき箇所を H-xx として挙げた |
| S7・S8 英語レポート | 対照表の "Reason (EN)" 列と逆翻訳を、P4の書き方に合わせて書いた。人間の確認は未実施 |

## 4. 公開前に人間がすること（チェックリスト）

- [ ] 3件の「修正後」を、原文と照らして全文読む（S5）。各ファイルの H-xx をすべて判断し、【要確認】の印を消す
- [ ] 原文を見ずに「修正後」だけを通し読みする（S6）。機械翻訳らしさ・不自然さが残っていないか
- [ ] 「修正前」が、見せ物として誇張しすぎていないか（実際の機械翻訳より明らかに悪すぎると、かえって信用を落とす【推測】）
- [ ] 英語の理由（Reason）と逆翻訳が、修正の内容と合っているか。言い過ぎがないか
- [ ] 文字数をスクリプトか `LEN()` で数え直し、§5 の表を数値で埋める
- [ ] 作品名の商標を確認する（§2）
- [ ] 公開の形式を決める（Fiverrのポートフォリオに画像で載せるか、PDFで添付するか）。**公開は承認を得てから**

## 5. CEOへの報告

- 3件とも、対照表の上位に Critical（人数・対応言語・数字・否定の抜け）を置いた。「機械翻訳の不自然さを直す」だけでなく「購入の判断を誤らせる誤りを見つける」ことが伝わる構成にした【推測】。
- 「修正前」が作例である以上、見本で示せるのは書き方と判断の質までで、実際の機械翻訳に対する見落としの少なさは示せない。[localization-ops.md §7](../localization-ops.md) の案（公開されている英語のページを実際に機械翻訳して手順を通す）を、社内の練習として別に行う方が、作業時間の実測にも役立つ【推測】。ただし他社の文章になるため、その結果は公開しない。
- 多くの H-xx は「本来は購入者に聞くこと」（固有名詞の訳、"150 cards" が枚数か種類か、など）。見本の中で「購入者への確認事項」として見せると、丁寧さが伝わる可能性がある【推測】。
