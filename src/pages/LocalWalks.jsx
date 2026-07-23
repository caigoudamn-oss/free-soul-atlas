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
  'Not a travel product / 不是旅游产品',
  'Not a sightseeing checklist / 不是景点清单',
  'Not a nightlife arrangement / 不是夜生活安排',
  'Not an official tourism authority / 不是官方旅游机构',
  'Not a travel agency / 不是旅行社',
  'Not an automatic acceptance channel / 不是自动受理通道',
  'Not a mass itinerary / 不是大型标准行程',
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
    title: 'Explore independently',
    text: 'Use the archive to notice landscapes, neighborhoods, spaces, and rhythms that reveal the character of a city.',
    cn: '通过城市档案，发现自然景观、街区、空间和日常节奏中体现城市性格的部分。',
  },
  {
    title: 'Plan with a local perspective',
    text: 'As each city archive grows, local perspectives may help shape slower and more meaningful ways to read the city.',
    cn: '随着每座城市档案逐渐完善，本地视角也可能帮助形成更慢、更有意义的城市理解方式。',
  },
  {
    title: 'Experience with a local',
    text: 'In the future, some cities may support small local walks or cultural experiences with people who truly understand the place.',
    cn: '未来，部分城市可能逐步开放由真正理解当地的人参与的小型本地慢逛或文化体验。',
  },
]

const steps = [
  ['01', 'First, each city archive needs enough places, observations, routes, and local context.', '首先，每座城市档案需要积累足够的地点、观察、路线和本地背景。'],
  ['02', 'Then, trusted local perspectives can help connect those fragments into readable city experiences.', '之后，可信赖的本地视角可以把这些碎片连接成更容易理解的城市体验。'],
  ['03', 'Some cities may later develop local walks, cultural exchanges, or small community activities.', '未来，部分城市可能发展出本地慢逛、文化交流或小型社区活动。'],
  ['04', 'For now, the archive comes first. Local experiences remain a future direction.', '现阶段，城市档案优先。城市体验仍然是未来方向。'],
]

const safety = [
  ['Free Soul Atlas is an independent cultural project, not an official tourism authority or travel agency.', 'Free Soul Atlas 是一个独立文化项目，并非官方旅游机构或旅行社。'],
  ['Local Walks are a future direction, not the current core product.', 'Local Walks 是未来方向，不是当前核心产品。'],
  ['The archive comes before any experience format.', '城市档案优先于任何体验形式。'],
  ['No unsafe, private, or sensitive locations without permission.', '未经许可，不安排不安全、私人或敏感地点。'],
  ['Any future city experience should remain small, careful, and based on real local knowledge.', '未来任何城市体验都应该保持小规模、谨慎，并建立在真实本地知识之上。'],
  ['Free Soul Atlas may decline ideas that feel unsafe, inappropriate, unclear, or outside the current archive stage.', '对于不安全、不合适、不清晰，或超出当前城市档案阶段的想法，Free Soul Atlas 可能不会推进。'],
]

const archivePrinciples = [
  ['01', 'Open contribution', 'Anyone can submit local knowledge, observations, corrections, and personal perspectives.', '任何人都可以提交本地知识、观察、修正和个人视角。'],
  ['02', 'Editorial review', 'Public content is reviewed and edited before publication.', '公开内容会在发布前经过审核和编辑。'],
  ['03', 'Local knowledge', 'We value knowledge shaped by real local life and long-term observation.', '我们重视来自真实本地生活和长期观察的知识。'],
  ['04', 'Continuous revision', 'Information can be updated, corrected, expanded, or removed when necessary.', '内容可以持续更新、修正、补充，必要时也可以移除。'],
  ['05', 'Independent perspective', 'We do not measure value only by popularity or quantity.', '我们不只用热度或收录数量判断内容价值。'],
  ['06', 'Respect and safety', 'Private, sensitive, unsafe, or unauthorized information should not be published.', '不应公开私人、敏感、不安全或未经授权的信息。'],
]

const interestItems = [
  'city you care about / 你关注的城市',
  'places or routes you know / 你了解的地点或路线',
  'local context you can share / 你可以分享的本地背景',
  'possible cultural walk ideas / 可能的城市慢逛想法',
  'language or accessibility notes / 语言或无障碍说明',
]

export default function LocalWalks() {
  return (
    <div className="page local-walks-page">
      <header className="page-hero local-walks-hero">
        <p className="eyebrow">Future Direction / Local Perspectives</p>
        <h1>Local Walks</h1>
        <p>
          A future way to experience cities through local perspectives.
          <br />
          未来的城市体验方式：通过本地视角理解一座城市。
        </p>
        <p>
          Local Walks is a future direction of Free Soul Atlas. As the archive grows, we hope to connect travelers with people who truly understand their cities.
          <br />
          Local Walks 是 Free Soul Atlas 未来的发展方向。随着城市档案不断完善，我们希望未来连接旅行者与真正理解城市的人。
        </p>
        <p>
          A city is more than a destination. It is made of landscapes, neighborhoods, people, memory, culture, and everyday life.
          <br />
          城市不只是目的地。它由自然景观、街区、人物、记忆、文化和日常生活共同构成。
        </p>
        <div className="cover-actions">
          <a className="button dark" href="mailto:freesoulatlas@outlook.com">Share interest / 保持联系</a>
          <Link className="button light" to="/">Back to Atlas</Link>
        </div>
      </header>

      <section className="walk-editorial-section">
        <div>
          <span>What this is</span>
          <h2>A future direction, not the current core.</h2>
        </div>
        <div>
          <p>
            Local Walks are not the center of Free Soul Atlas today. The archive is the foundation: places, stories, memories, and perspectives that help people understand a city.
            <br />
            Local Walks 不是 Free Soul Atlas 当前的中心。城市档案才是基础：地点、故事、记忆和个人视角，帮助人们理解一座城市。
          </p>
          <p>
            In the future, some archives may grow into local experiences shaped by people who know, notice, and care about their cities.
            <br />
            未来，部分城市档案可能逐渐发展成本地体验，由真正了解、观察并在意城市的人共同塑造。
          </p>
          <p>
            Free Soul Atlas starts from discovery, documentation, and understanding — not from packaged tourism.
            <br />
            Free Soul Atlas 从发现、记录和理解城市出发，而不是从打包旅游产品出发。
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
              Free Soul Atlas develops each city edition gradually. Local Walks may only become possible where enough local research, route testing, and trusted local knowledge have been established.
              <br />
              Free Soul Atlas 会逐步建立每一座城市的内容。只有当本地资料、路线测试和可信赖的当地经验足够成熟时，Local Walks 才可能成为一种未来形式。
            </p>
          </div>
        </div>
        <div className="walk-card-grid single-card-grid">
          <article className="walk-card city-beta-card">
            <span>Beta city</span>
            <h3>Dalian</h3>
            <p>Dalian is the first city currently being researched and tested. It is the starting point for the archive, not the whole identity of Free Soul Atlas.</p>
            <p>大连是当前第一个正在进行内容建设与路线测试的城市。它是城市档案的起点，但不是 Free Soul Atlas 的全部身份。</p>
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
            Free Soul Atlas is an open, community-built archive for understanding cities through local knowledge, independent perspectives, and careful ongoing correction.
            <br />
            Free Soul Atlas 是一个以本地知识、独立视角和持续修正为基础，由社区共同建设的开放城市档案。
          </p>
          <p>
            Anyone may contribute places, observations, corrections, route ideas, photographs, and local knowledge. Public content is reviewed, organized, and edited before publication.
            <br />
            任何人都可以贡献地点、观察、修正、路线想法、影像和本地知识。公开内容会在发布前经过审核、整理和编辑。
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
              Contribute a place, share a local observation, suggest a correction, or help us improve existing information.
              <br />
              贡献一个地点、分享一条本地观察、提出修正建议，或帮助我们完善已有信息。
            </p>
            <Link className="button dark" to="/submit">Contribute to the Atlas<br />参与共同建设</Link>
          </div>
        </div>
      </section>

      <section className="walk-card-section">
        <div className="section-title">
          <span>04 / Future possibilities</span>
          <h2>Open archive now, local experiences later.</h2>
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
          <span>05 / How this may grow</span>
          <h2>Archive first, experiences later.</h2>
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
          <h2>Careful, independent, and archive-led.</h2>
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
          <h2>Clear language over formal scripts.</h2>
        </div>
        <div>
          <p>
            English communication may be possible depending on the city and the local contributor. This is currently an archive-led project, and we focus on clear, practical, and honest communication rather than formal travel scripts.
            <br />
            是否可以使用英文沟通，会根据城市和当地参与者情况决定。项目目前仍以城市档案为核心，我们更关注清楚、实用和真实的交流，而不是正式旅行话术。
          </p>
          <p>
            Future routes or walks should only grow around topics and places that local contributors can explain clearly and responsibly.
            <br />
            未来的路线或慢逛，只应围绕本地参与者能够清楚、负责地介绍的地点和主题逐步形成。
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
            Free Soul Atlas is gradually building a cross-cultural, city-based community for local explorers, international students, independent travelers, creators, and people interested in nature, culture, architecture, local life, and independent spaces.
            <br />
            Free Soul Atlas 正在逐步建立一个以城市为单位的跨文化社群，连接本地探索者、国际学生、独立旅行者、创作者，以及关注自然、文化、建筑、本地生活和独立空间的人。
          </p>
          <p>
            Community is about people and relationships: local discussions, small gatherings, route sharing, cultural exchange, and new perspectives that can also support the archive.
            <br />
            社群关注人与关系：本地讨论、小型聚会、路线分享、文化交流，以及能继续支持城市档案的新视角。
          </p>
          <p className="walk-note">
            Community channels are being prepared.
            <br />
            社群渠道正在筹备中。
          </p>
        </div>
      </section>

      <section className="walk-interest">
        <p className="eyebrow">Interested in the future of Local Walks?</p>
        <h2>想参与未来的城市体验方向？</h2>
        <p>You can share / 你可以简单分享：</p>
        <div className="walk-list-grid">
          {interestItems.map((item) => <span key={item}>{item}</span>)}
        </div>
        <a className="button dark" href="mailto:freesoulatlas@outlook.com">Share interest / 保持联系<br />分享想法 / 联系我们</a>
      </section>
    </div>
  )
}
