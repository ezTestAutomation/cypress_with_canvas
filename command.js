// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('dragLeft', (selector, fromX, fromY, delta, force) => {
    var element = cy.get(selector)
    var temp = element.trigger('mousedown', fromX, fromY, { button: 0, bubbles: true, force: force })
    for (var i = 0; i < delta; i++) {
        temp = temp.trigger('mousemove', fromX - i, fromY, { button: 0, bubbles: true, force: force })
        temp.wait(1)
    }
    temp.trigger('mouseup', fromX - delta, fromY, { button: 0, force: force })
    return temp
})

Cypress.Commands.add('dragRight', (selector, fromX, fromY, delta, force) => {
    var element = cy.get(selector)
    var temp = element.trigger('mousedown', fromX, fromY, { button: 0, bubbles: true, force: force })
    for (var i = 0; i < delta; i++) {
        temp = temp.trigger('mousemove', fromX + i, fromY, { button: 0, bubbles: true, force: force })
        temp.wait(1)
    }
    temp.trigger('mouseup', fromX + delta, fromY, { button: 0, force: force })
    return temp
})

Cypress.Commands.add('dragUp', (selector, fromX, fromY, delta, force) => {
    var element = cy.get(selector)
    var temp = element.trigger('mousedown', fromX, fromY, { button: 0, bubbles: true, force: force })
    for (var i = 0; i < delta; i++) {
        temp = temp.trigger('mousemove', fromX, fromY - i, { button: 0, bubbles: true, force: force })
        temp.wait(1)
    }
    temp.trigger('mouseup', fromX, fromY - delta, { button: 0, force: force })
    return temp
})

Cypress.Commands.add('dragDown', (selector, fromX, fromY, delta, force) => {
    var element = cy.get(selector)
    var temp = element.trigger('mousedown', fromX, fromY, { button: 0, bubbles: true, force: force })
    for (var i = 0; i < delta; i++) {
        temp = temp.trigger('mousemove', fromX, fromY + i, { button: 0, bubbles: true, force: force })
        temp.wait(1)
    }
    temp.trigger('mouseup', fromX, fromY + delta, { button: 0, force: force })
    return temp
})

Cypress.Commands.add('zoomIn', (selector, delta) => {
    var element = cy.get(selector)
    return element.trigger("wheel", { deltaY: delta * -1, bubbles: true })
})

Cypress.Commands.add('zoomOut', (selector, delta) => {
    var element = cy.get(selector)
    return element.trigger("wheel", { deltaY: delta, bubbles: true })
})

Cypress.Commands.add('detectTextAndClick', (selector, responseBody, inputText) => {

    var temp = eval(responseBody)
    var input_split = inputText.split(' ')
    var result = []
    for (var i = 0; i < temp.length; i++) {
        var e = temp[i];
        if (e.label === input_split[0]) {
            var count = 0
            for (var j = 0; j < input_split.length; j++) {
                if (temp[i + j].label === input_split[j]) {
                    result.push(temp[i + j])
                    count++
                }
            }
            if (count === input_split.length)
                break
            result = []
        }
    }
    var x, y
    if (result.length != 0) {
        var delta = 5
        x = result[0].bounds[0].x + delta
        y = result[0].bounds[0].y + delta
    }

    return cy.get(selector).click(x, y)

})