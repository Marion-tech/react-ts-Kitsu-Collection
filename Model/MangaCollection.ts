export class MangaCollection {
  public mangas: Manga[];

  constructor(mangas: Manga[]) {
    this.mangas = mangas;
  }

  sortByTitle(bool: boolean): Manga[] {
    return this.mangas.sort((a, b) =>
      bool ? a.titre.localeCompare(b.titre) : b.titre.localeCompare(a.titre)
    );
  }

  sortByYear(): Manga[] {
    return this.mangas.sort((a, b) => (a.anneesortie > b.anneesortie ? 1 : -1));
  }

  addManga(manga: Manga) {
    this.mangas.push(manga);
    console.log('Ajout de : ', manga);
  }

  deleteMangaByTitle(title: string) {
    let indexToDelete = this.mangas.findIndex((manga) => manga.titre === title);
    this.mangas.splice(indexToDelete, 1);
  }

  countManga(): number {
    return this.mangas.length;
  }
}

export interface Manga {
  id: number;
  titre: string;
  anneesortie: Date;
  description: string;
}
