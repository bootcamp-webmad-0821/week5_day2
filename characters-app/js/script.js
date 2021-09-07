const apiHandler = new CharactersApiHandler()

// Get all characters on first load
printCharacters()

function printCharacters() {

    apiHandler
        .getAllCharacters()
        .then(response => {
            let text = ''
            response.data.reverse().forEach(elm => text += `<li><strong>${elm.name}</strong> (ID ${elm.id})<br>Profesión: ${elm.occupation}<br>Arma: ${elm.weapon}</li>`)
            document.querySelector('#characters').innerHTML = text
        })
        .catch(err => console.log('ERROR', err))
}



document.querySelector('#newCharacterForm').onsubmit = e => {
    e.preventDefault()

    const inputs = document.querySelectorAll('#newCharacterForm input')

    const character = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value
    }

    apiHandler
        .saveCharacter(character)
        .then(() => {
            document.querySelector('#newCharacterForm').reset()
            printCharacters()
        })
        .catch(err => console.error('ERROR', err))
}


document.querySelector('#getCharecterInfo').onsubmit = e => {

    e.preventDefault()

    const valueId = document.querySelector('#getCharecterInfo input').value

    apiHandler
        .getOneCharacter(valueId)
        .then(response => {

            const inputs = document.querySelectorAll('#editCharacterForm input')
            const { name, occupation, weapon, id } = response.data

            inputs[0].value = name
            inputs[1].value = occupation
            inputs[2].value = weapon
            inputs[3].value = id

            document.querySelector('#getCharecterInfo').reset()
        })
        .catch(err => console.error('ERROR', err))
}




document.querySelector('#editCharacterForm').onsubmit = e => {

    e.preventDefault()

    const inputs = document.querySelectorAll('#editCharacterForm input')

    const characterId = inputs[3].value

    const character = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value
    }

    apiHandler
        .editCharacter(characterId, character)
        .then(() => {
            printCharacters()
            document.querySelector('#editCharacterForm').reset()
        })
        .catch(err => console.error('ERROR', err))

}