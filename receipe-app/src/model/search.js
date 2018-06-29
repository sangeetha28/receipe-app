import axios from 'axios';

export default class search {

    constructor(query) {
         this.query = query;
     }


   async getReceipe() {
        try {
            const apiKey = '9ff39916eeff358ef6c6a80cd795f6ca';
            const corsProxy = 'https://cors-anywhere.herokuapp.com';
            const res = await axios.get(`${corsProxy}/http://food2fork.com/api/search?key=${apiKey}&q=${this.query}`);
            this.result = res.data.recipes;
        }
        catch (error) {
            console.log(error);
        }
    }

}