import {Video} from 'expo';
class film {
    constructor(Key, Name, LinkFilm, Image, Category, Rate, Director, Stars, Duration, ReleaseDate, Writes, Synopsis, Price, View) {
        this.Key,
        this.Name = Name;
        this.LinkFilm = LinkFilm;
        this.Image = Image;
        this.Category = Category;
        this.Rate = Rate;
        this.Director = Director;
        this.Stars = Stars;
        this.Duration = Duration;
        this.ReleaseDate = ReleaseDate;
        this.Writes = Writes;
        this.Synopsis = Synopsis;
        this.Price = Price;
        this.View = View;
    }
}

export default film;