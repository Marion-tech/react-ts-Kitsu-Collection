import React = require('react');
import { Manga, MangaCollection } from './Model/MangaCollection';

export class Collection extends React.Component<
  {},
  {
    collection: MangaCollection;
    page: number;
    pageSize: number;
    searchText: string;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      collection: null,
      page: 0,
      pageSize: 10,
      searchText: null, //?: handleChange(event.target.value),
    };
  }

  componentDidMount() {
    // Démarrage
    fetch(
      `https://kitsu.io/api/edge/anime?page[limit]=${
        this.state.pageSize
      }&page[offset]=${this.state.page * this.state.pageSize}`
    )
      .then((res) => res.json())
      .then((jsonResponse) => {
        let mangas: Manga[] = jsonResponse.data.map((data) => {
          return {
            id: data.id,
            titre: data.attributes?.canonicalTitle,
            anneesortie: new Date(data.attributes?.startDate),
            description: data.attributes?.description,
            img: data.attributes.posterImage.tiny,
            genre: data.relationships.genres.links.related,
          } as Manga;
        });
        let newCollection = new MangaCollection(mangas);
        this.setState({
          collection: newCollection,
        });
      });
  }

  getNew(page: number, query?: string): void {
    console.log(query);
    fetch(
      `https://kitsu.io/api/edge/anime?page[limit]=${
        this.state.pageSize
      }&page[offset]=${page * this.state.pageSize}&filter[text]=${
        query ?? this.state.searchText
      }`
    )
      .then((res) => res.json())
      .then((jsonResponse) => {
        let mangas: Manga[] = jsonResponse.data.map((data) => {
          return {
            id: data.id,
            titre: data.attributes.canonicalTitle,
            anneesortie: new Date(data.attributes.startDate),
            description: data.attributes.description,
            img: data.attributes.posterImage.tiny,

            genre: data.relationships.genres.links.related,
          } as Manga;
        });
        let newCollection = new MangaCollection(mangas);
        return newCollection;
      })
      .then((collection) => {
        this.setState({
          page: page,
          collection: collection,
          searchText: query ?? this.state.searchText,
        });
      });
  }

  onNext() {
    this.getNew(this.state.page + 1);
  }

  onPreviousMethod() {
    if (this.state.page > 0) {
      this.getNew(this.state.page - 1);
    }
  }

  handleChange(event) {
    let value = event.target.value.toLowerCase();
    this.setState({
      searchText: value,
    });
    //this.getNew(0, value);
  }

  render() {
    return (
      <div>
        <div>
          {this.state.searchText}
          <Search onChange={(event) => this.handleChange(event)} />
          <TableEntete />
          {this.state.collection?.mangas &&
            this.state.collection.mangas.map((manga) => (
              <div>
                <LineManga manga={manga} />
              </div>
            ))}
          <Footer
            onPrevious={() => this.onPreviousMethod()}
            onNext={() => this.onNext()}
            onCurrent={this.state.page}
          />
        </div>
      </div>
    );
  }
}

function TableEntete() {
  return (
    <div className="tabLine">
      <div className="img"></div>
      <div className="id">id</div>
      <div className="title">Titre</div>
      <div className="desc">Description</div>
      <div className="genre">Genre</div>
    </div>
  );
}

function LineManga(props) {
  // console.log('genre:', props.manga.genre);
  return (
    <div className="lineManga">
      <div id="img">
        <img src={props.manga.img} />
      </div>
      <div id="id">{props.manga.id}</div>
      <div id="title">{props.manga.titre}</div>
      <div id="desc">{props.manga.description}</div>
      <div id="desc">{props.manga.genre}</div>
    </div>
  );
}

function Footer(props) {
  return (
    <div className="footer">
      <button className="previous" type="button" onClick={props.onPrevious}>
        Previous
      </button>
      <p>{props.onCurrent}</p>
      <button className="next" type="button" onClick={props.onNext}>
        Next
      </button>
    </div>
  );
}

function Search(props) {
  console.log(props.handleChange);
  return (
    <form>
      <input type="text" placeholder="Search" onChange={props.onChange}></input>
    </form>
  );
}
