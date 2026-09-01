# zh voice -- Chinese copy as design material

The one content gap 81,000 words of the old skill did not cover: how
Chinese product copy should sound. Loaded whenever a surface carries
zh text. `kit/check.sh --zh` catches the mechanical half (punctuation,
spacing, exclamation marks); this file is the judgment half.

## The failure, dissected

Shipped on a calendar app:

> 跨月连续排布：月份之间只有一条粗线，没有断行。

Four faults in fourteen characters. It is **说明书腔** -- a caption that
explains the layout to the person looking at it, the writer narrating
the page instead of serving the task. It is **colon-and-clause**
prose, the register of a spec, on a surface a person reads at 7 a.m.
It **names the mechanism** (排布, 断行) in the designer's vocabulary,
not the reader's. And it says nothing the reader can act on. The
reader's question was "what is this week", not "how are months
separated".

What belonged there: nothing, or `八月` set as a running head. If a
sentence had to exist: `月份之间不换页，往下翻就是下个月。` -- the reader's
verb (翻), the reader's noun (下个月), no colon.

## Register

Four registers exist; a product surface uses the second.

| Register | Sounds like | Where |
|---|---|---|
| 公文 official | 关于……的通知；请予以配合 | government, legal copy, never UI |
| 产品 product | 保存成功。已同步到 3 台设备。 | every operate and read surface |
| 营销 marketing | 全新升级！极致体验，一触即达 | the reflex; not even on persuade surfaces |
| 口语 spoken | 搞定了～ | consumer chat products with a named persona, and only there |

The product register: short declarative sentences, the reader's
vocabulary, facts with numbers, verbs the reader performs. It is
**plain** (平实), not cold; warmth comes from precision and from
anticipating the next question, not from `～` and `！`.

## The rules that read as authored

- **Buttons are verbs, 2-4 characters, naming the outcome**: `保存`,
  `新建项目`, `发送邀请`, `删除 3 项`. Not `确定` / `提交` / `点击这里` as
  defaults. Destructive: the verb plus the object (`删除这条记录`), never
  a bare `确定`.
- **Labels are nouns, 2-4 characters**: `到期日`, `负责人`, `最近更新`.
  Not sentences, not questions.
- **Sentence length**: one idea per sentence, 8-20 characters in UI,
  under 35 in prose. A `：` introducing a list is fine; a `：`
  introducing an explanation is the spec register.
- **你 not 您** on a product surface, unless the product's relationship
  is formal (banking, government, elder-facing). Never mix.
- **Numbers as facts**: `已用 4.2 GB，共 15 GB`; `3 分钟前更新`; `还剩
  12 天`. Never `很多`, `一些`, `即将`, when the number is known.
- **Time is absolute** where a decision depends on it: `8 月 24 日
  14:02` beats `刚刚` after the first minute.
- **No exclamation marks** on product surfaces; one on a persuade
  surface, at most. No `～`. No emoji as punctuation.
- **No triads**: `快速、简单、安全` is the marketing tell in either
  language.
- **No translationese** (翻译腔): `进行了保存` -> `已保存`; `对于这个文件而言`
  -> `这个文件`; `被成功地创建` -> `已创建`; `请注意，……` -> say the thing;
  chains of `的` (`我们的团队的新的功能`) -> cut to one; `一个` before a
  countable noun where Chinese would not count it.
- **Passive is rare**; the actor is the system or the reader:
  `系统已删除` / `你已删除`, not `已被删除`.
- **Error messages say what happened, since when, what to do**, in that
  order: `没有连上服务器。上次同步 14:01。重试`. Not `错误：网络异常，请稍后再试`.
- **Empty states name what will be here and the one verb**: `还没有项目。
  新建一个，或从 GitHub 导入。` Not `暂无数据`.
- **Confirmation says the consequence, not the question**: `删除后无法恢复。
  删除` / `取消`, not `确定要删除吗？`.
- **Success is brief and specific**: `已保存` ; `已发送给 3 人` ; then gone.
- **Loading names the thing**: `正在读取 8 月的记录……`, not `加载中`.

## Punctuation and typography, quick

Full-width `，。！？：；、` in zh text; `“”` (mainland) or `「」`
(Traditional, literary), one set per product; `……` and `——` doubled;
a half-width space between CJK and Latin or digits (`使用 CSS`, `2026
年`), none around full-width punctuation; Arabic digits for dates,
counts, prices; `%` and units after a space-less digit for percent,
after a space for units (`30%`, `5 km`). Titles are not Title Case and
are not followed by a colon. Ellipsis is never three periods.

## Simplified, Traditional, and the rest

Simplified (zh-Hans) and Traditional (zh-Hant) differ in glyphs,
vocabulary (`软件 / 軟體`, `视频 / 影片`, `默认 / 預設`), quotes, and
register (Taiwan product copy runs warmer; Hong Kong mixes English
freely). A machine conversion of characters is not a translation; a
Traditional audience reads converted Simplified copy as exactly that.
Ship one properly or ship only the one you can.

## Good and bad, side by side

| Bad | Why | Good |
|---|---|---|
| 跨月连续排布：月份之间只有一条粗线，没有断行。 | describes the layout | (nothing) or `八月` |
| 您的操作已成功执行！ | official + marketing + exclamation | `已保存` |
| 加载中… | names nothing; three-dot ellipsis | `正在读取 8 月的记录……` |
| 暂无数据 | dead end | `还没有记录。添加第一条` |
| 确定要删除吗？ [确定] [取消] | question, bare 确定 | `删除后无法恢复。` [删除这条记录] [取消] |
| 错误：网络异常，请稍后再试 | no fact, no time, no verb | `没有连上服务器。上次同步 14:01。` [重试] |
| 点击这里查看更多信息 | click-here; 信息 is filler | `查看全部 24 条` |
| 全新升级，极致体验，一触即达 | triad; the reflex | `新版本：日历可以离线用了。` |
| 我们的团队的新的功能 | 的 chain | `新功能` |
| 文件被成功地上传了 | passive, adverb | `已上传` |
| 2026年8月24日 | no 盘古之白 | `2026 年 8 月 24 日` |
| 今天宜出行, 忌动土. | half-width punctuation | `今天宜出行，忌动土。` |

## The test

Read every string aloud as the person using the product, at the
moment they see it. If the sentence explains the page, cut it. If it
could be said to anyone about anything, it is not copy yet. If it
contains a number the reader wanted, it is probably right.
