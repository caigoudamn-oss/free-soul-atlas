import { Link } from '../lib/router'

const audience = [
  'International students / 国际学生',
  'Solo travelers / 独自旅行者',
  'Creative travelers / 创意旅行者',
  'Music / coffee / vintage lovers / 喜欢音乐、咖啡、古着的人',
  'People who dislike checklist tourism / 不喜欢打卡式旅游的人',
  'Travelers who want to understand local everyday culture / 想理解本地日常文化的旅行者',
]

const notList = [
  'Not a standard sightseeing tour / 不是标准景点团',
  'Not a shopping tour / 不是购物团',
  'Not a nightlife escort service / 不是夜生活陪同服务',
  'Not an official tourism authority / 不是官方旅游机构',
  'Not a guaranteed booking service / 不是保证预约服务',
  'Not a large group tour / 不是大型团体游',
]

const exampleRoutes = [
  {
    title: 'Slow Afternoon Route',
    text: 'Coffee, quiet streets, independent shops, seaside walk.',
    cn: '咖啡、小街道、独立小店和海边慢走。',
  },
  {
    title: 'Music & Night Culture Route',
    text: 'Record stores, small bars, livehouse / DJ-friendly spaces.',
    cn: '唱片店、小酒吧、livehouse 和适合音乐爱好者的空间。',
  },
  {
    title: 'Vintage & Local Taste Route',
    text: 'Vintage shops, small cafés, local neighborhoods.',
    cn: '古着店、小咖啡馆和更本地的街区气质。',
  },
]

const formats = [
  {
    title: 'Custom Local Route',
    text: 'A personalized route suggestion based on your interests, time, and travel style.',
    cn: '根据你的兴趣、时间和旅行方式定制一条本地路线建议。',
  },
  {
    title: 'Online Route Planning',
    text: 'A short online conversation to help you understand where to go, what to avoid, and how to plan your day.',
    cn: '通过一次简短线上沟通，帮你判断去哪、避开什么、怎么安排一天。',
  },
  {
    title: 'Small Local Walk',
    text: 'A limited beta walk with a local perspective. Usually suitable for 1–2 people or a very small group.',
    cn: '小范围测试中的本地慢逛，通常适合 1–2 人或非常小的小组。',
  },
]

const steps = [
  ['01', 'Tell us your travel date, interests, language preference, and available time.', '告诉我们你的旅行日期、兴趣、语言偏好和可用时间。'],
  ['02', 'We suggest a route or local walk format.', '我们会建议适合的路线或慢逛形式。'],
  ['03', 'We confirm meeting point, duration, cost, boundaries, and safety notes before anything starts.', '开始前会确认集合地点、时长、费用、服务边界和安全说明。'],
  ['04', 'You experience Dalian with a local perspective.', '你会从本地视角体验大连。'],
]

const safety = [
  ['Free Soul Atlas is an independent cultural project, not an official tourism authority or travel agency.', 'Free Soul Atlas 是一个独立文化项目，并非官方旅游机构或旅行社。'],
  ['Local walks are small and limited.', '本地慢逛为小规模、有限测试形式。'],
  ['No shopping pressure.', '不强制购物。'],
  ['No hidden fees.', '没有隐藏费用。'],
  ['Route, duration, cost, and meeting point are confirmed before the walk.', '路线、时长、费用和集合点会在出发前确认。'],
  ['No unsafe, private, or sensitive locations without permission.', '未经许可，不安排不安全、私人或敏感地点。'],
  ['Travelers are responsible for their own personal belongings, travel documents, insurance, and personal safety decisions.', '旅行者需自行保管个人物品、旅行证件，并对保险和个人安全判断负责。'],
  ['We may decline requests that feel unsafe, inappropriate, unclear, or outside our current ability.', '对于不安全、不合适、不清晰或超出当前能力范围的请求，我们可能会拒绝。'],
]

const inquiryItems = [
  'travel date / 旅行日期',
  'number of people / 人数',
  'interests / 兴趣方向',
  'preferred language / 偏好语言',
  'available time / 可用时间',
  'any safety or accessibility needs / 是否有安全或无障碍需求',
]

export default function LocalWalks() {
  return (
    <div className="page local-walks-page">
      <header className="page-hero local-walks-hero">
        <p className="eyebrow">Dalian / Local Cultural Walks</p>
        <h1>Dalian Local Walks</h1>
        <p>
          See Dalian through local eyes — independent spaces, slow routes, music, coffee, vintage, and everyday corners.
          <br />
          通过本地人的眼睛看大连：独立空间、慢路线、音乐、咖啡、古着和日常角落。
        </p>
        <p>
          For travelers who want something slower, smaller, and more personal than a standard tourist checklist.
          <br />
          给那些想要比标准景点清单更慢、更小、更个人化体验的旅行者。
        </p>
        <div className="cover-actions">
          <a className="button dark" href="mailto:freesoulatlas@outlook.com">Contact us / Send inquiry</a>
          <Link className="button light" to="/">Back to Atlas</Link>
        </div>
      </header>

      <section className="walk-editorial-section">
        <div>
          <span>What this is</span>
          <h2>A local cultural walk, not a checklist.</h2>
        </div>
        <div>
          <p>
            This is not a standard tourist tour. It is a local cultural walk for travelers who want to understand the city through independent spaces, small streets, music, coffee, vintage shops, and real everyday atmosphere.
          </p>
          <p>
            这不是标准景点打卡团，而是给想通过本地空间、小街道、音乐、咖啡、古着和日常氛围理解城市的旅行者准备的本地文化慢逛。
          </p>
          <p>
            Free Soul Atlas starts from places and routes, not from packaged tourism.
            <br />
            Free Soul Atlas 从地点和路线出发，而不是从打包旅游产品出发。
          </p>
        </div>
      </section>

      <section className="walk-list-section">
        <div className="section-title">
          <span>01 / Who it is for</span>
          <h2>For slower travelers.</h2>
        </div>
        <div className="walk-list-grid">
          {audience.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="walk-list-section">
        <div className="section-title">
          <span>02 / What it is not</span>
          <h2>Clear boundaries.</h2>
        </div>
        <div className="walk-list-grid boundary-grid">
          {notList.map((item) => <span key={item}>{item}</span>)}
        </div>
        <p className="walk-note">We focus on small, slow, culture-oriented routes. / 我们关注小型、慢节奏、文化导向的路线。</p>
      </section>

      <section className="walk-card-section">
        <div className="section-title">
          <span>03 / Example routes</span>
          <h2>Possible directions.</h2>
        </div>
        <div className="walk-card-grid">
          {exampleRoutes.map((route, index) => (
            <article key={route.title} className="walk-card">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{route.title}</h3>
              <p>{route.text}</p>
              <p>{route.cn}</p>
            </article>
          ))}
        </div>
        <p className="walk-note">
          Routes are examples. Final route will be adjusted based on time, weather, interests, language, safety, and opening hours.
          <br />
          路线只是示例，最终路线会根据时间、天气、兴趣、语言、安全和营业情况调整。
        </p>
      </section>

      <section className="walk-card-section">
        <div className="section-title">
          <span>04 / Possible formats</span>
          <h2>Inquiry first, no automatic booking.</h2>
        </div>
        <div className="walk-card-grid">
          {formats.map((format) => (
            <article key={format.title} className="walk-card quiet">
              <h3>{format.title}</h3>
              <p>{format.text}</p>
              <p>{format.cn}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="walk-steps">
        <div className="section-title">
          <span>05 / How it works</span>
          <h2>Small steps, clear expectations.</h2>
        </div>
        {steps.map(([number, text, cn]) => (
          <article key={number}>
            <span>{number}</span>
            <p>{text}<br />{cn}</p>
          </article>
        ))}
      </section>

      <section className="walk-editorial-section">
        <div>
          <span>Trust & Safety</span>
          <h2>Limited, independent, and clearly discussed first.</h2>
        </div>
        <div className="safety-list">
          {safety.map(([text, cn]) => (
            <p key={text}>{text}<br />{cn}</p>
          ))}
        </div>
      </section>

      <section className="walk-editorial-section">
        <div>
          <span>Language</span>
          <h2>Clear communication over formal speeches.</h2>
        </div>
        <div>
          <p>
            English communication is available, but this is currently a beta project. We focus on clear, practical communication rather than formal guide-style speeches.
            <br />
            可以进行英文沟通，但项目目前仍处于测试阶段。我们更关注清楚、实用的交流，而不是正式导游式讲解。
          </p>
          <p>
            Routes will be designed around topics we can explain clearly and honestly.
            <br />
            路线会围绕我们能够清楚、真实表达的内容来设计。
          </p>
        </div>
      </section>

      <section className="walk-editorial-section">
        <div>
          <span>Beta notice</span>
          <h2>Limited availability.</h2>
        </div>
        <div>
          <p>
            Local walks are currently available on a limited beta basis. We may accept only a small number of travelers while testing routes, language flow, safety boundaries, and the overall experience.
            <br />
            本地慢逛目前处于小范围测试阶段。我们可能只接受少量旅行者，用于测试路线、语言沟通、安全边界和整体体验。
          </p>
          <p>
            Submitting an inquiry does not guarantee acceptance.
            <br />
            提交咨询不代表一定会被接受。
          </p>
        </div>
      </section>

      <section className="walk-inquiry">
        <p className="eyebrow">Interested in a local walk?</p>
        <h2>Send a simple inquiry.</h2>
        <p>Please include / 请在邮件里简单说明：</p>
        <div className="walk-list-grid">
          {inquiryItems.map((item) => <span key={item}>{item}</span>)}
        </div>
        <a className="button dark" href="mailto:freesoulatlas@outlook.com">Contact us / Send inquiry<br />联系我们 / 发送咨询</a>
      </section>
    </div>
  )
}
