import { Link, useParams } from '../lib/router'
import Icon from '../components/Icon'
import PlaceCard from '../components/PlaceCard'
import VisualBlock from '../components/VisualBlock'
import { places } from '../data/places'

export default function PlaceDetail() {
  const { id } = useParams()
  const place = places.find((item) => item.id === id) || places[0]
  const related = places
    .filter((item) => item.id !== place.id && (item.type === place.type || item.moodTags.some((tag) => place.moodTags.includes(tag))))
    .slice(0, 3)

  return (
    <article className="detail-page">
      <div className="detail-nav">
        <Link to="/places"><Icon name="arrowLeft" /> Back to places</Link>
        <span>Free Soul Atlas — Dalian</span>
      </div>

      <header className="place-detail-hero">
        <VisualBlock tone={place.visualTone} label={place.type} meta={place.area} />
        <div className="detail-intro">
          <p className="eyebrow">{place.type} / {place.foreignerFriendly} foreigner-friendly</p>
          <h1>{place.name}</h1>
          <p>{place.shortDescription}</p>
          <div className="mini-tags">
            {place.moodTags.concat(place.freeSoulTags).slice(0, 6).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <section className="detail-layout">
        <div className="story-column">
          <section>
            <span>01</span>
            <h2>Why it feels soulful</h2>
            <p>{place.whySoulful}</p>
          </section>
          <section>
            <span>02</span>
            <h2>Local curator note</h2>
            <p>{place.curatorNote}</p>
          </section>
          <section className="two-column-note">
            <div>
              <h3>Good for</h3>
              <ul>{place.goodFor.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>Not for</h3>
              <ul>{place.notFor.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </section>
          <section>
            <span>03</span>
            <h2>Practical tips for foreigners</h2>
            <ul>{place.practicalTips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
          </section>
        </div>

        <aside className="fact-sheet">
          <div><small>Area</small><strong>{place.area}</strong></div>
          <div><small>Address</small><strong>{place.address}</strong></div>
          <div><small>Price range</small><strong>{place.priceRange}</strong></div>
          <div><small>Best time</small><strong>{place.bestTime}</strong></div>
          <div><small>Best for</small><strong>{place.bestFor.join(' / ')}</strong></div>
          <div><small>Language</small><strong>{place.languageNote}</strong></div>
          <div><small>Payment</small><strong>{place.paymentNote}</strong></div>
          <div><small>Reservation</small><strong>{place.reservationNote}</strong></div>
        </aside>
      </section>

      <section className="map-placeholder">
        <div>
          <p className="eyebrow">Map link placeholder</p>
          <h2><Icon name="mapPin" /> Location clue</h2>
          <p>{place.address}</p>
          <a href="#" onClick={(event) => event.preventDefault()}>Open map placeholder <Icon name="externalLink" /></a>
        </div>
        <div className="mini-map">
          <span />
          <span />
          <span />
          <b>DALIAN</b>
        </div>
      </section>

      <section className="nearby-section">
        <div className="section-title">
          <span>Nearby spots</span>
          <h2>Small things around it</h2>
        </div>
        <div className="nearby-list">
          {place.nearbySpots.map((spot) => <span key={spot}>{spot}</span>)}
        </div>
      </section>

      <section className="section-shell related">
        <div className="section-title">
          <span>Related</span>
          <h2>Keep browsing this mood</h2>
        </div>
        <div className="masonry-grid compact">
          {related.map((item, index) => <PlaceCard key={item.id} place={item} index={index} />)}
        </div>
      </section>
    </article>
  )
}
