import { Link } from '../lib/router'

const audience = [
  'International students / 国际学生',
  'Solo travelers / 独自旅行者',
  'Curious travelers with an independent cultural perspective / 具有独立文化视角和探索欲的旅行者',
  'People interested in nature, culture, architecture, local life, and independent spaces / 对自然、文化、建筑、本地生活和独立空间感兴趣的人',
  'People who dislike checklist tourism / 不喜欢打卡式旅游的人',
  'Travelers who want to understand the character of a place, not just its attractions / 想理解一个地方的性格，而不只是看景点的旅行者',
]

const notList = [
  'Not a standard sightseeing tour / 不是标准景点团',
  'Not a shopping tour / 不是购物团',
  'Not a nightlife escort service / 不是夜生活陪同服务',
  'Not an official tourism authority / 不是官方旅游机构',
  'Not a travel agency / 不是旅行社',
  'Not a guaranteed booking service / 不是保证预约服务',
  'Not a large group tour / 不是大型团体游',
]

const exampleRoutes = [
  {
    title: 'Landscape & Nature',
    text: 'Coasts, mountains, rivers, parks, quiet paths, and the relationship between a city and its natural environment.',
    cn: '海岸、山地、河流、公园、安静步道，以及一座城市与自然环境之间的关系。',
  },
  {
    title: 'Neighborhood & Everyday Life',
    text: 'Local neighborhoods, streets, architecture, public spaces, markets, food, and everyday city life.',
    cn: '本地街区、街道、建筑、公共空间、市场、食物和真实城市日常。',
  },
  {
    title: 'Independent Culture',
    text: 'Independent spaces, creative communities, music, art, cafés, bookstores, studios, and local cultural scenes.',
    cn: '独立空间、创意社群、音乐、艺术、咖啡馆、书店、工作室和本地文化场景。',
  },
]

const formats = [
  {
    title: 'Custom Local Route',
    text: 'A personalized route suggestion based on your interests, available time, and the city you are visiting.',
    cn: '根据你的兴趣、可用时间和所访问的城市，提供个性化路线建议。',
  },
  {
    title: 'Online Route Planning',
    text: 'A short online conversation to help you understand the city, choose areas, avoid unsuitable routes, and plan your time.',
    cn: '通过一次简短线上沟通，帮你理解城市、选择区域、避开不合适的路线并安排时间。',
  },
  {
    title: 'Small Local Walk',
    text: 'A limited, city-based beta walk with a local perspective. Availability depends on the city, route readiness, language, safety, and local contributors.',
    cn: '以本地视角进行的小规模城市慢逛。是否开放取决于城市内容成熟度、路线准备、语言、安全和本地参与者情况。',
  },
]

const steps = [
  ['01', 'Tell us which city you are visiting, your travel date, interests, language preference, and available time.', '告诉我们你要访问的城市、旅行日期、兴趣、语言偏好和可用时间。'],
  ['02', 'We check whether that city currently has enough local content, route readiness, and available contributors.', '我们会确认该城市是否已经具备足够的本地内容、成熟路线和可参与的本地成员。'],
  ['03', 'If suitable, we suggest a route, online planning session, or small local walk.', '如果条件合适，我们会建议路线方案、线上规划或小型本地慢逛。'],
  ['04', 'We confirm the scope, duration, meeting point, cost, boundaries, and safety notes before anything begins.', '开始前会确认服务范围、时长、集合点、费用、边界和安全说明。'],
]

const safety = [
  ['Free Soul Atlas is an independent cultural project, not an official tourism authority or travel agency.', 'Free Soul Atlas 是一个独立文化项目，并非官方旅游机构或旅行社。'],
  ['Local walks are small and limited.', '本地慢逛为小规模、有限形式。'],
  ['No shopping pressure.', '不强制购物。'],
  ['No hidden fees.', '没有隐藏费用。'],
  ['Route, duration, cost, scope, and meeting point are confirmed before the walk.', '路线、时长、费用、服务范围和集合点会在出发前确认。'],
  ['No unsafe, private, or sensitive locations without permission.', '未经许可，不安排不安全、私人或敏感地点。'],
  ['Travelers are responsible for their personal belongings, travel documents, insurance, and personal safety decisions.', '旅行者需自行保管个人物品、旅行证件，并对保险和个人安全判断负责。'],
  ['We may decline requests that feel unsafe, inappropriate, unclear, unavailable in that city, or outside our current ability.', '对于不安全、不合适、不清晰、该城市暂不可提供，或超出当前能力范围的请求，我们可能会拒绝。'],
]

const archivePrinciples = [
  ['01', 'Open contribution', 'Anyone can submit local knowledge, observations, corrections, and recommendations.', '任何人都可以提交本地知识、观察、修正和推荐。'],
  ['02', 'Editorial review', 'Public content is reviewed and edited before publication.', '公开内容会在发布前经过审核和编辑。'],
  ['03', 'Local knowledge', 'We value knowledge shaped by real local life and long-term observation.', '我们重视来自真实本地生活和长期观察的知识。'],
  ['04', 'Continuous revision', 'Information can be updated, corrected, expanded, or removed when necessary.', '内容可以持续更新、修正、补充，必要时也可以移除。'],
  ['05', 'Independent perspective', 'We do not measure value only by popularity or quantity.', '我们不只用热度或收录数量判断内容价值。'],
  ['06', 'Respect and safety', 'Private, sensitive, unsafe, or unauthorized information should not be published.', '不应公开私人、敏感、不安全或未经授权的信息。'],
]

const inquiryItems = [
  'city / 城市',
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
        <p className="eyebrow">Free Soul Atlas / Local Cultural Walks</p>
        <h1>Local Walks</h1>
        <p>
          See cities through local eyes — their landscapes, neighborhoods, culture, independent spaces, and everyday rhythms.
          <br />
          通过本地人的眼睛理解城市：自然景观、街区、文化、独立空间和真实日常节奏。
        </p>
        <p>
          For travelers who want something slower, smaller, and more personal than a standard tourist checklist.
          <br />
          给那些想要比标准景点清单更慢、更小、更个人化体验的旅行者。
        </p>
        <p>
          A city is more than a destination. It is made of landscapes, neighborhoods, people, memory, culture, and everyday life.
          <br />
          城市不只是目的地。它由自然景观、街区、人物、记忆、文化和日常生活共同构成。
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
            This is not a standard tourist tour.
          </p>
          <p>
            Free Soul Atlas Local Walks are small, city-based cultural experiences for travelers who want to understand a place through its landscapes, neighborhoods, architecture, independent spaces, local culture, and everyday life.
            <br />
            这不是标准景点打卡团。
          </p>
          <p>
            Free Soul Atlas Local Walks 是以城市为单位的小型本地文化体验，面向希望通过自然景观、街区、建筑、独立空间、本地文化和日常生活理解一个地方的旅行者。
          </p>
          <p>
            Each walk is shaped by the character of the city, the interests of the traveler, and the knowledge of local contributors.
            <br />
            每次慢逛都会根据城市自身的性格、旅行者的兴趣，以及本地参与者的经验进行调整。
          </p>
          <p>
            Free Soul Atlas starts from places, people, and routes — not from packaged tourism.
            <br />
            Free Soul Atlas 从地点、人物和路线出发，而不是从标准化旅游产品出发。
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
        <p className="walk-note">We focus on small, slow, culture-oriented, and city-specific experiences. / 我们关注小型、慢节奏、文化导向，并且尊重每座城市自身特点的体验。</p>
      </section>

      <section className="walk-card-section">
        <div className="section-title">
          <span>03 / Example route directions</span>
          <h2>Route directions, not fixed products.</h2>
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
          These are route directions, not fixed products. Each city will develop its own routes based on local geography, culture, contributors, opening hours, and safety conditions.
          <br />
          这些是路线方向，而不是固定产品。每座城市都会根据本地地理、文化、参与者、营业情况和安全条件形成自己的路线。
        </p>
      </section>

      <section className="walk-card-section">
        <div className="section-title">
          <span>Cities</span>
          <h2>Built city by city.</h2>
        </div>
        <div className="walk-editorial-section nested-walk-section">
          <div>
            <p>一座城市一座城市地建立。</p>
          </div>
          <div>
            <p>
              Free Soul Atlas develops each city edition gradually. Local Walks are only available where enough local research, route testing, and trusted local knowledge have been established.
              <br />
              Free Soul Atlas 会逐步建立每一座城市的内容。只有当本地资料、路线测试和可信赖的当地经验足够成熟时，才会开放相应城市的 Local Walks。
            </p>
          </div>
        </div>
        <div className="walk-card-grid single-card-grid">
          <article className="walk-card city-beta-card">
            <span>Beta city</span>
            <h3>Dalian</h3>
            <p>Dalian is the first city currently being researched and tested. Local Walks may be available on a limited basis.</p>
            <p>大连是当前第一个正在进行内容建设与路线测试的城市，本地慢逛可能以有限测试形式开放。</p>
            <Link className="button light" to="/cities/dalian">View Dalian Edition</Link>
          </article>
        </div>
      </section>

      <section className="walk-editorial-section open-archive-section">
        <div>
          <span>Open City Archive</span>
          <h2>Built by people who know, notice, and care about a place.</h2>
        </div>
        <div>
          <p>
            由真正了解、观察并在意一座城市的人共同建设。
          </p>
          <p>
            Free Soul Atlas is an open, community-built archive for understanding cities through local knowledge and independent perspectives.
            <br />
            Free Soul Atlas 是一个以本地知识和独立视角为基础、由社区共同建设的开放城市档案。
          </p>
          <p>
            Local residents, travelers, international students, creators, researchers, and independent explorers are welcome to contribute places, observations, corrections, routes, photographs, and local knowledge.
            <br />
            我们欢迎本地居民、旅行者、国际学生、创作者、研究者和独立探索者，贡献地点、观察、修正、路线、影像和本地知识。
          </p>
          <p>
            The archive is never considered finished. Each city edition can continue to grow, change, and become more accurate through shared contributions.
            <br />
            城市档案不会被视为已经完成。每一座城市的内容都可以通过共同贡献持续生长、修正并变得更加准确。
          </p>
          <p>
            Anyone can contribute. Public content is reviewed, organized, and edited before publication.
            <br />
            任何人都可以参与贡献，公开内容会在发布前经过审核、整理和编辑。
          </p>
          <p>
            The goal is not to collect everything. It is to build a thoughtful, independent, and evolving understanding of each city.
            <br />
            我们的目标不是收集所有信息，而是共同建立一种有判断、有独立视角并且持续变化的城市理解。
          </p>
          <div className="archive-principles">
            {archivePrinciples.map(([number, title, text, cn]) => (
              <article key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}<br />{cn}</p>
              </article>
            ))}
          </div>
          <div className="archive-cta">
            <p>
              Recommend a place, share a local observation, suggest a correction, or help us improve existing information.
              <br />
              推荐一个地点、分享一条本地观察、提出修正建议，或帮助我们完善已有信息。
            </p>
            <Link className="button dark" to="/submit">Contribute to the Atlas<br />参与共同建设</Link>
          </div>
        </div>
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
            English communication may be available depending on the city and the local contributor. This is currently a beta project, and we focus on clear, practical, and honest communication rather than formal guide-style speeches.
            <br />
            是否可以使用英文沟通，会根据城市和当地参与者情况决定。项目目前仍处于测试阶段，我们更关注清楚、实用和真实的交流，而不是正式导游式讲解。
          </p>
          <p>
            Routes will only be offered around topics and places that local contributors can explain clearly and responsibly.
            <br />
            我们只会围绕本地参与者能够清楚、负责地介绍的地点和主题提供路线。
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
            Local Walks are currently available on a limited beta basis.
            <br />
            Local Walks 目前处于有限测试阶段。
          </p>
          <p>
            Availability depends on the city, route readiness, language, safety, and contributor availability.
            <br />
            是否能够提供服务，会根据城市、路线成熟度、语言、安全和本地参与者情况决定。
          </p>
          <p>
            Submitting an inquiry does not guarantee acceptance.
            <br />
            提交咨询不代表一定会被接受。
          </p>
        </div>
      </section>

      <section className="walk-editorial-section community-teaser">
        <div>
          <span>Beyond the walk</span>
          <h2>A community for people who see cities as culture, not just destinations.</h2>
        </div>
        <div>
          <p>
            一个为那些把城市视为文化，而不只是目的地的人建立的社群。
          </p>
          <p>
            Free Soul Atlas is gradually building a cross-cultural, city-based community connecting local explorers, international students, independent travelers, creators, and people interested in nature, culture, architecture, local life, and independent spaces.
            <br />
            Free Soul Atlas 正在逐步建立一个以城市为单位的跨文化社群，连接本地探索者、国际学生、独立旅行者、创作者，以及关注自然、文化、建筑、本地生活和独立空间的人。
          </p>
          <p>
            Each city may eventually develop its own contributors, local discussions, walks, gatherings, and shared cultural archive.
            <br />
            未来每座城市都可能逐步形成自己的内容贡献者、本地讨论、慢逛活动、小型聚会和共享城市文化档案。
          </p>
          <p>
            The community supports the archive by sharing local knowledge, observations, corrections, and new perspectives.
            <br />
            社群也会通过分享本地知识、观察、修正和新的视角，持续支持城市档案的建设。
          </p>
          <p className="walk-note">
            Community channels are being prepared.
            <br />
            社群渠道正在筹备中。
          </p>
        </div>
      </section>

      <section className="walk-inquiry">
        <p className="eyebrow">Interested in exploring a city with us?</p>
        <h2>想和我们一起理解一座城市？</h2>
        <p>Please include / 请在邮件里简单说明：</p>
        <div className="walk-list-grid">
          {inquiryItems.map((item) => <span key={item}>{item}</span>)}
        </div>
        <a className="button dark" href="mailto:freesoulatlas@outlook.com">Contact us / Send inquiry<br />联系我们 / 发送咨询</a>
      </section>
    </div>
  )
}
