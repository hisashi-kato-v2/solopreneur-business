# サンプル3: Murmlet: Focus Timer（架空のアプリ／App Store）

- 作成日: 2026-10-29（タスク T0008）
- 位置づけ: ポートフォリオ用の**架空**の見本。実在のアプリ・企業の文章は使っていない（[README](README.md) §2）
- ストア: App Store（iPhone）
- 欄: 名前、サブタイトル、プロモーションテキスト、キーワード、説明
- ジャンル・ターゲット: 勉強・作業用の集中タイマー（サブスクリプションあり）、学生と社会人
- 想定パッケージ: Standard
- 文体の指定（想定）: です・ます調（説明文）、箇条書きは体言止め。**→ H-01で人間が判断**
- 表記: 【要確認 H-xx】= 日本語ネイティブの人間が確認すべき箇所（§6に一覧）
- 注意: 「修正前」は、機械翻訳にありがちな問題を再現するためにAIが書いた**作例**で、特定の翻訳ツールの実際の出力ではない。「修正後」もAIの下書きで、**人間の確認（§6）が済むまでは公開に使わない**

---

## 1. 英語の原文（架空）

```text
[Name]
Murmlet: Focus Timer

[Subtitle]
Calm sessions, gentle nudges

[Promotional Text]
New in 3.0: Study Rooms! Join a quiet room with friends and focus together. Try Murmlet Plus free for 7 days.

[Keywords]
focus,timer,pomodoro,study,concentration,productivity,work,break,habit

[Description]
Murmlet is a focus timer that keeps you company. Set a session, put your phone down, and let Murmlet hum quietly in the background.

FEATURES
• Pomodoro-style timer with custom session and break lengths
• Study Rooms: focus with up to 8 friends in real time
• Weekly reports that show when you focus best
• Home Screen and Lock Screen widgets
• Works offline — no account required

MURMLET PLUS
Unlock unlimited Study Rooms, detailed reports and extra themes. Payment will be charged to your Apple ID account. Subscription renews automatically unless cancelled at least 24 hours before the end of the current period.
```

---

## 2. 修正前（機械翻訳風の日本語・作例）

```text
[名前]
ムームレット：焦点タイマー

[サブタイトル]
穏やかなセッション、穏やかなナッジ

[プロモーションテキスト]
3.0の新機能：勉強部屋！友達と静かな部屋に参加して、一緒に焦点を合わせてください。ムームレットプラスを7日間無料で試してください。

[キーワード]
フォーカス、タイマー、ポモドーロ、勉強、集中、生産性、仕事、休憩、習慣

[説明]
Murmletは、あなたに付き合うフォーカスタイマーです。セッションを設定し、あなたの電話を置き、ムームレットにバックグラウンドで静かにハミングさせてください。

特徴
• カスタムセッションとブレークの長さを持つポモドーロスタイルタイマー
• 勉強部屋：リアルタイムで最大8人の友達とフォーカス
• あなたが最もよく焦点を合わせる時を示す週間レポート
• ホームスクリーンとロックスクリーンのウィジェット
• オフラインで動作 — アカウントが必要です

MURMLET PLUS
無制限の勉強部屋、詳細なレポート、追加のテーマのロックを解除します。支払いはあなたのApple IDアカウントに請求されます。サブスクリプションは、現在の期間の終了の少なくとも24時間前にキャンセルされない限り、自動的に更新します。
```

---

## 3. 修正後の日本語（確認用。【要確認】の印は公開前に消す）

```text
[名前]
Murmlet：集中タイマー【要確認 H-02】

[サブタイトル]
落ち着いて集中、やさしくお知らせ【要確認 H-03】

[プロモーションテキスト]
バージョン3.0の新機能「スタディルーム」【要確認 H-04】が登場！友だちと静かなルームに集まって、一緒に集中できます。Murmlet Plusは7日間無料でお試しいただけます【要確認 H-05】。

[キーワード]
フォーカス,タイマー,ポモドーロ,勉強,集中,生産性,作業,休憩,習慣【要確認 H-06】

[説明]
Murmletは、そばで静かに寄り添う集中タイマーです。時間をセットしたら、スマホを置くだけ。Murmletがバックグラウンドで静かに見守ります【要確認 H-07】。

■主な機能
・集中と休憩の時間を自由に設定できる、ポモドーロ方式【要確認 H-08】のタイマー
・スタディルーム：最大8人の友だちと、リアルタイムで一緒に集中
・自分が一番集中できる時間帯がわかる、週ごとのレポート
・ホーム画面とロック画面のウィジェット
・オフラインでも使えて、アカウント登録は不要

■Murmlet Plus
スタディルームの無制限利用、詳しいレポート、追加のテーマが使えるようになります。
お支払いはApple ID【要確認 H-09】のアカウントに請求されます。サブスクリプションは、現在の期間が終了する24時間前までに解約しない限り、自動的に更新されます【要確認 H-10】。
```

---

## 4. 対照表（修正前・修正後・理由）

| ID | 欄 | 修正前 | 修正後 | 修正後の逆翻訳 (EN) | 種類 | 重要度 | Reason (EN) | メモ（JA）・人間の確認 |
|---|---|---|---|---|---|---|---|---|
| DS-05 | 説明 | オフラインで動作 — アカウントが必要です | オフラインでも使えて、アカウント登録は不要 | "Works offline, and no account sign-up is needed" | Mistranslation | **Critical** | The old text said "an account **is required**", the opposite of your original. This misstates a key selling point. | 否定の抜けは機械翻訳で見落としやすい |
| NM-01 | 名前 | ムームレット：焦点タイマー | Murmlet：集中タイマー | "Murmlet: Focus Timer" | Mistranslation, Inconsistency | Major | 焦点 means optical focus (like a camera lens), not concentration. The app name appeared in both Latin letters and katakana; unified to "Murmlet". | H-02 |
| ST-01 | サブタイトル | 穏やかなセッション、穏やかなナッジ | 落ち着いて集中、やさしくお知らせ | "Focus calmly, with gentle reminders" | Unnatural phrasing | Major | "Nudge" left in katakana (ナッジ) is not understood by most users, and the same word 穏やか was repeated. | H-03 |
| PT-01 | プロモーション | 3.0の新機能：勉強部屋！友達と静かな部屋に参加して、一緒に焦点を合わせてください。 | バージョン3.0の新機能「スタディルーム」が登場！友だちと静かなルームに集まって、一緒に集中できます。 | "New in version 3.0: Study Rooms! Gather in a quiet room with friends and focus together." | Unnatural phrasing, Mistranslation | Major | 焦点を合わせる again means optical focus. The feature name now reads as a name, in quotes. | H-04 |
| PT-02 | プロモーション | ムームレットプラスを7日間無料で試してください。 | Murmlet Plusは7日間無料でお試しいただけます。 | "You can try Murmlet Plus free for 7 days." | Inconsistency, Unnatural phrasing | Minor | Product name unified. The direct command ("Try it") was softened to the polite form usual in Japanese app copy. | H-05 |
| KW-01 | キーワード | フォーカス、タイマー、…、仕事、… | フォーカス,タイマー,…,作業,… | (same keywords) | Store conventions | Major | Japanese commas (、) were used as separators. Apple asks for commas; whether 、 works as a separator is not documented, and each 、 uses 3 bytes. Half-width commas without spaces are safer. | §5・H-06 |
| KW-02 | キーワード | 仕事 | 作業 | "work (tasks)" | Store conventions | Preference (Optional) | For a focus timer, 作業 (working on tasks) is closer to how users search than 仕事 (job). | 検索の傾向は【推測】。ASOの判断はしない |
| DS-01 | 説明 | Murmletは、あなたに付き合うフォーカスタイマーです。セッションを設定し、あなたの電話を置き、ムームレットにバックグラウンドで静かにハミングさせてください。 | Murmletは、そばで静かに寄り添う集中タイマーです。時間をセットしたら、スマホを置くだけ。Murmletがバックグラウンドで静かに見守ります。 | "Murmlet is a focus timer that quietly stays by your side. Set the time and just put your phone down. Murmlet quietly watches over you in the background." | Unnatural phrasing | Major | Repeated "your" (あなたの), "make it hum" (ハミングさせて) and 電話 for "phone" all read as machine translation. | H-07 |
| DS-02 | 説明 | カスタムセッションとブレークの長さを持つポモドーロスタイルタイマー | 集中と休憩の時間を自由に設定できる、ポモドーロ方式のタイマー | "A Pomodoro-method timer where you can freely set focus and break times" | Unnatural phrasing, Inconsistency | Major | "With custom ... lengths" was translated as "a timer that has lengths". "Break" appeared as both ブレーク and 休憩 (keywords). | H-08 |
| DS-03 | 説明 | あなたが最もよく焦点を合わせる時を示す週間レポート | 自分が一番集中できる時間帯がわかる、週ごとのレポート | "Weekly reports that show when you concentrate best" | Mistranslation, Unnatural phrasing | Major | Optical "focus" again, and "the time" was unclear; 時間帯 makes it "time of day". | - |
| DS-04 | 説明 | ホームスクリーンとロックスクリーンのウィジェット | ホーム画面とロック画面のウィジェット | "Home Screen and Lock Screen widgets" | Store conventions | Minor | Uses the Japanese names of these screens as shown on iPhone. | 画面の名前は【推測】。H-11 |
| DS-06 | 説明 | 特徴 / MURMLET PLUS（見出し）、• （箇条書き） | ■主な機能 / ■Murmlet Plus、・ | - | Store conventions | Preference (Optional) | ■ headings and ・ bullets are common in Japanese app descriptions. All-caps Latin headings stand out in Japanese text. | 慣習は【推測】 |
| DS-07 | 説明 | 無制限の勉強部屋、…のロックを解除します。 | スタディルームの無制限利用、…が使えるようになります。 | "You get unlimited Study Rooms, ... " | Unnatural phrasing, Inconsistency | Minor | "Unlock" was translated as "release the lock". Feature name unified with the promotional text. | - |
| DS-08 | 説明 | サブスクリプションは、現在の期間の終了の少なくとも24時間前にキャンセルされない限り、自動的に更新します。 | サブスクリプションは、現在の期間が終了する24時間前までに解約しない限り、自動的に更新されます。 | "The subscription renews automatically unless you cancel at least 24 hours before the current period ends." | Unnatural phrasing | Minor | The literal word order was hard to read, and 更新します ("renews [something]") was the wrong verb form. The meaning (24 hours, auto-renewal) is unchanged. | 法的な判断はしていない。H-10 |
| ALL-01 | 全体 | 友達 | 友だち | "friends" | Inconsistency | Minor | Unified spelling across fields. | どちらの表記でもよい。H-01 |

**集計（作例）:** Critical 1 / Major 7 / Minor 5 / Preference 2

---

## 5. 文字数（目視で数えた値。公開前にスクリプトで数え直す）

| 欄 | 上限 | 修正前 | 修正後 | 状態 |
|---|---|---|---|---|
| 名前 | 30 | 13文字 | 14文字 | OK（目視） |
| サブタイトル | 30 | 17文字 | 16文字 | OK（目視） |
| プロモーションテキスト | 170 | 170未満（目視） | 170未満（目視） | 要計測 |
| キーワード | 100（*1） | 35文字 / 105バイト | 35文字 / 89バイト | **バイトで数える場合、修正前は上限を超える**（*1） |
| 説明 | 4,000（*2） | 4,000未満（目視） | 4,000未満（目視） | 要計測 |

- *1 Appleは「100文字」と案内。第三者は「100バイト」とし、日本語（1文字3バイト）は少なく入る可能性がある。どちらが正しいかは【未確認】（[localization-service.md §2.1](../localization-service.md)）。修正前は「、」（3バイト）を8個使っていたため、バイトで数えると105バイトになる計算。半角カンマ（1バイト）に変えると89バイト。
- 内訳: 9語のカタカナ・漢字が合計27文字（27×3=81バイト）＋区切り8個。修正前 27+8=35文字、81+8×3=105バイト。修正後 27+8=35文字、81+8×1=89バイト。**この数は目視で数えたもの【未確認】**で、スクリプトで確認する（AIには数えさせない原則）。
- *2 4,000文字は第三者の情報で【未確認】。
- 納品物では「App Store Connectで入力して上限内か確認してください」と案内する（[localization-ops.md §4.3](../localization-ops.md) の注記）。

---

## 6. 人間（日本語ネイティブ）の確認が必要な箇所

**全体:** 「修正後」はすべてAIの下書き。S5とS6を人間が行うまで、ポートフォリオに使わない。

| No. | 箇所 | 確認してほしいこと | AIの案と、迷った理由 |
|---|---|---|---|
| H-01 | 全体の文体・表記 | です・ます調＋体言止めの箇条書き、「友だち」の表記で良いか | アプリの説明文の慣習は【推測】 |
| H-02 | 名前 | アプリ名を英語のまま「Murmlet」にするか、カタカナ（マームレット等）にするか。区切りの「：」（全角）で良いか | 読み方が決まっていない架空の名前。本来は購入者に確認する |
| H-03 | サブタイトル | 「やさしくお知らせ」で "gentle nudges"（そっと促す通知）の意味が伝わるか。もっと短く、検索されやすい語を前に置くべきか | 30文字には余裕がある。前半に「集中」を置いた |
| H-04 | Study Rooms | 「スタディルーム」（カタカナ）か「勉強部屋」（和訳）か。「ルーム」の言い換えの統一 | 和訳は家の部屋の印象が強い。機能名として目立つカタカナを選んだ |
| H-05 | 7日間無料 | 無料体験の書き方として誤解がないか（自動で有料に切り替わることを書く必要があるか） | **法的な判断はしない**。原文の意味は変えていない。購入者に確認を促す項目 |
| H-06 | キーワード | 半角カンマ区切りで良いか。App Store Connectで実際に入力し、上限内か確認する | 日本語の区切りと数え方は【未確認】。語の選び方（ASO）は範囲外 |
| H-07 | "hum quietly" | 「静かに見守ります」で、原文の遊び心（アプリ名の murmur＝ささやく、に通じる）が伝わるか | 「ハミング」は不自然なので捨てた。ブランドの口調は購入者に確認したい |
| H-08 | Pomodoro | 「ポモドーロ方式」という書き方で良いか | 「Pomodoro Technique」は商標として登録されているという情報がある【未確認】。**法的な判断はしない**。購入者に確認を促す |
| H-09 | Apple ID | 原文どおり「Apple ID」で良いか | Appleが「Apple ID」の名前を「Appleアカウント」に変えたという情報がある【未確認】。原文の変更にあたるため、こちらでは変えず、購入者への確認事項にする |
| H-10 | 自動更新の文 | 意味（24時間前・自動更新）が原文と一致しているか | 法的な文に近い。**法的な判断はしない**（[localization-service.md §2.2](../localization-service.md)） |
| H-11 | ホーム画面・ロック画面 | iPhoneの日本語の画面での正式な呼び方と一致しているか | 【推測】で書いた。実機の画面で確認する |

---

## 7. 用語集（Standard以上の納品物の例）

| English | 日本語 | 種類 | メモ |
|---|---|---|---|
| Murmlet | Murmlet | 固有名詞（アプリ名） | カタカナにしない。H-02 |
| Murmlet Plus | Murmlet Plus | 固有名詞（有料プラン） | - |
| focus（動詞・名詞） | 集中（する） | 一般 | 「焦点」は使わない。キーワード欄の「フォーカス」は例外 |
| Study Rooms | スタディルーム | 機能 | H-04 |
| session | （集中の）時間 | 一般 | 「セッション」は使わない |
| break | 休憩 | 一般 | 「ブレーク」は使わない |
| Pomodoro-style | ポモドーロ方式 | 一般 | H-08 |
| widget | ウィジェット | 機能 | - |
| Home Screen / Lock Screen | ホーム画面 / ロック画面 | 機能 | H-11 |
