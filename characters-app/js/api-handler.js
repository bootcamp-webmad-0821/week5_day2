
class CharactersApiHandler {

    constructor() {

        this.app = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters = () => this.app.get('/characters')
    getOneCharacter = id => this.app.get(`/characters/${id}`)
    saveCharacter = characterInfo => this.app.post('/characters', characterInfo)
    editCharacter = (id, characterInfo) => this.app.put(`/characters/${id}`, characterInfo)
}