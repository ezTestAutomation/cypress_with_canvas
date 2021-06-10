describe('Dragtest', () => {

    beforeEach(() => {
        cy.viewport(1400, 800)
        var url = 'https://www.google.com/maps/place/Marina+Bay+Sands/@1.2848704,103.8612561,18.75z/data=!4m15!1m6!3m5!1s0x31da1904937e1633:0x62099677b59fca76!2sGardens+by+the+Bay!8m2!3d1.2815683!4d103.8636132!3m7!1s0x31da19ee4cc09203:0x26c9afefa555dd7!5m2!4m1!1i2!8m2!3d1.2846765!4d103.8610115'
        cy.visit(url)
        cy.wait(5000) //wait for map loading
    })

    it('should drag left, right', () => {
        var l1 = '1.2848704',
            l2 = '103.8612561'
        cy.url().should('include', l1)
        cy.url().should('include', l2)
        var selector = '#scene > div.widget-scene > canvas'
        var x = 800,
            y = 525 // simulate the position
        var delta = 10
        cy.dragLeft(selector, x, y, delta, true)
        cy.url().should('include', l1)
        cy.url().should('not.contain', l2)

        cy.dragRight(selector, x, y, delta, true)
        cy.url().should('include', l1)
        cy.url().should('include', l2)
            // drag(element, x, y, toX, toY, true)// drag it
    })

    it('should drag up, down', () => {
        var l1 = '1.2848704',
            l2 = '103.8612561'
        cy.url().should('include', l1)
        cy.url().should('include', l2)
        var selector = '#scene > div.widget-scene > canvas'
        var x = 800,
            y = 525 // simulate the position
        var delta = 10
        cy.dragUp(selector, x, y, delta, true)
        cy.url().should('not.contain', l1)
        cy.url().should('include.contain', l2)

        cy.dragDown(selector, x, y, delta, true)
        cy.url().should('include', l1)
        cy.url().should('include', l2)
    })

})

describe('should zoom', () => {

    beforeEach(() => {
        cy.viewport(1400, 800)
        var url = 'https://www.google.com/maps/place/Marina+Bay+Sands/@1.2848704,103.8612561,18.75z/data=!4m15!1m6!3m5!1s0x31da1904937e1633:0x62099677b59fca76!2sGardens+by+the+Bay!8m2!3d1.2815683!4d103.8636132!3m7!1s0x31da19ee4cc09203:0x26c9afefa555dd7!5m2!4m1!1i2!8m2!3d1.2846765!4d103.8610115'
        cy.visit(url)
        cy.wait(5000)
    })

    it('should zoom in, out', () => {
        var z = '18z'
        cy.url().should('include', z)
        var selector = '#scene > div.widget-scene > canvas'
        var delta = 1000
        cy.zoomIn(selector, delta)
        cy.url().should('not.contain', z)

        cy.zoomOut(selector, delta)
        cy.url().should('include', z)
    })
})

describe('Take screen shot then detect label', () => {

    beforeEach(() => {
        cy.viewport(1400, 800)
        var url = 'https://www.google.com/maps/place/Marina+Bay+Sands/@1.2848704,103.8612561,18.75z/data=!4m15!1m6!3m5!1s0x31da1904937e1633:0x62099677b59fca76!2sGardens+by+the+Bay!8m2!3d1.2815683!4d103.8636132!3m7!1s0x31da19ee4cc09203:0x26c9afefa555dd7!5m2!4m1!1i2!8m2!3d1.2846765!4d103.8610115'
        cy.visit(url)
    })

    it('Take screen shot then clicked to detect label', () => {
        cy.viewport(1400, 800)
        var now = new Date().getTime();
        cy.screenshot("" + now).wait(3000)
        var name = `${now}.png`
        cy.request('GET', 'http://localhost:4000/api/detectText?path=' + name)
            .then((response) => {
                expect(response.status).equal(200)
                var input = 'Fennel Café Active Garden'
                var selector = '#pane > div > div.widget-pane-content.cYB2Ge-oHo7ed > div > div > div.x3AX1-LfntMc-header-title > div.x3AX1-LfntMc-header-title-ma6Yeb-haAclf > div.x3AX1-LfntMc-header-title-ij8cu > div:nth-child(1) > h1 > span:nth-child(1)'
                cy.get(selector).should('not.contain', input)
                var canvas_selector = '#scene > div.widget-scene > canvas'
                cy.detectTextAndClick(canvas_selector, response.body, input).wait(2000)
                cy.get(selector).should('have.text', input)
            })
    })
})