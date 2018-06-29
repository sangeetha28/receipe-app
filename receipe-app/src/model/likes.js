
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
       return like;
    }


    removeLikes(id) {
        const index = this.likes.findIndex(e => e.id === id);
        this.likes.splice(index,1);

    }

    isLiked(id) {
        return this.likes.findIndex(e => e.id === id) !== -1;
    }

    getNoOfLikes() {
       return this.likes.length;
    }

}