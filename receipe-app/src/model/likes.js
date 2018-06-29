
export default class likes {
    constructor(){
        this.likes=[];
    }

    addLikes(id,title,author,image)
    {
        const like = {
            id,
            title,
            author,
            image,
        }
       this.likes.push(like);
       this.persistData();
       return like;
    }

    removeLikes(id) {
        const index = this.likes.findIndex(e => e.id === id);
        this.likes.splice(index,1);
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(e => e.id === id) !== -1;
    }

    getNoOfLikes() {
       return this.likes.length;
    }

    persistData()
    {
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }

    readLocalStorage()
    {
        //will convert the datastructure back to Array
       const storage = JSON.parse(localStorage.getItem('likes'));
       if(storage) this.likes = storage;
    }

}