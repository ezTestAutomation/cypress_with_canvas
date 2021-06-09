describe('Dragtest', () => {
    
  beforeEach(() =>{
      cy.viewport(1400,800)
      var url = 'https://www.google.com/maps/place/Marina+Bay+Sands/@1.2848704,103.8612561,18.75z/data=!4m15!1m6!3m5!1s0x31da1904937e1633:0x62099677b59fca76!2sGardens+by+the+Bay!8m2!3d1.2815683!4d103.8636132!3m7!1s0x31da19ee4cc09203:0x26c9afefa555dd7!5m2!4m1!1i2!8m2!3d1.2846765!4d103.8610115'
      cy.visit(url)
      cy.wait(5000) //wait for map loading
  })

  it('should drag left, right', ()=>{
      var l1 = '1.2848704', l2 = '103.8612561'
      cy.url().should('include', l1)
      cy.url().should('include', l2)
      var element = cy.get('#scene > div.widget-scene > canvas') // get the canvas
      var x = 800, y = 525 // simulate the position
      var delta = 10
      dragLeft(element, x, y, delta, true)
      cy.url().should('include', l1)
      cy.url().should('not.contain',l2)

      element = cy.get('#scene > div.widget-scene > canvas') // get the canvas
      dragRight(element, x, y, delta, true)
      cy.url().should('include', l1)
      cy.url().should('include',l2)
      // drag(element, x, y, toX, toY, true)// drag it
  })

  it('should drag up, down', ()=>{
    var l1 = '1.2848704', l2 = '103.8612561'
    cy.url().should('include', l1)
    cy.url().should('include', l2)
    var element = cy.get('#scene > div.widget-scene > canvas') // get the canvas
    var x = 800, y = 525 // simulate the position
    var delta = 10
    dragUp(element, x, y, delta, true)
    cy.url().should('not.contain', l1)
    cy.url().should('include.contain',l2)
    
    element = cy.get('#scene > div.widget-scene > canvas') // get the canvas
    dragDown(element, x, y, delta, true)
    cy.url().should('include', l1)
    cy.url().should('include',l2)
})

  const dragRight = (element, fromX, fromY, delta, force) => {
    var temp = element
    .trigger('mousedown', fromX, fromY, {button:0, bubbles:true, force:force})
    for(var i = 0; i< delta; i++){
      temp = temp.trigger('mousemove', fromX+i, fromY, {button:0, bubbles:true, force:force})
      temp.wait(1)
    }
    temp.trigger('mouseup', fromX + delta, fromY,{button:0, force:force})
  }

  const dragLeft = (element, fromX, fromY, delta, force) => {
    var temp = element
    .trigger('mousedown', fromX, fromY, {button:0, bubbles:true, force:force})
    for(var i = 0; i< delta; i++){
      temp = temp.trigger('mousemove', fromX-i, fromY, {button:0, bubbles:true, force:force})
      temp.wait(1)
    }
    temp.trigger('mouseup', fromX - delta, fromY,{button:0, force:force})
  }

  const dragUp = (element, fromX, fromY, delta, force) => {
    var temp = element
    .trigger('mousedown', fromX, fromY, {button:0, bubbles:true, force:force})
    for(var i = 0; i< delta; i++){
      temp = temp.trigger('mousemove', fromX, fromY-i, {button:0, bubbles:true, force:force})
      temp.wait(1)
    }
    temp.trigger('mouseup', fromX , fromY- delta,{button:0, force:force})
  }

  const dragDown = (element, fromX, fromY, delta, force) => {
    var temp = element
    .trigger('mousedown', fromX, fromY, {button:0, bubbles:true, force:force})
    for(var i = 0; i< delta; i++){
      temp = temp.trigger('mousemove', fromX, fromY+i, {button:0, bubbles:true, force:force})
      temp.wait(1)
    }
    temp.trigger('mouseup', fromX , fromY+ delta,{button:0, force:force})
  }

  // const drag = (element, fromX, fromY, toX, toY, force) => {
  //     return element
  //     .trigger('mousedown', fromX, fromY, {button:0, bubbles:true, force:force})
  //     .trigger('mousemove', toX, toY, {button:0, bubbles:true, force:force})
  //     .trigger('mouseup', fromX, fromY,{button:0, force:force})
  // }
  
})

describe('should zoom', () =>{

  // const zoom = (element, delta) =>{
  //     return element.trigger("mousewheel", 
  //         { wheelDelta: delta, bubbles: true})
  // }
  const zoom = (element, delta) =>{
     return element.trigger("wheel", { deltaY: delta, bubbles: true})
  }

  beforeEach(() =>{
      cy.viewport(1400,800)
      var url = 'https://www.google.com/maps/place/Marina+Bay+Sands/@1.2848704,103.8612561,18.75z/data=!4m15!1m6!3m5!1s0x31da1904937e1633:0x62099677b59fca76!2sGardens+by+the+Bay!8m2!3d1.2815683!4d103.8636132!3m7!1s0x31da19ee4cc09203:0x26c9afefa555dd7!5m2!4m1!1i2!8m2!3d1.2846765!4d103.8610115'
      cy.visit(url)
      cy.wait(5000)
  })

  it('should zoom in, out', () =>{
    var z = '18z'
    cy.url().should('include', z)
    var element = cy.get('#scene > div.widget-scene > canvas')
    var delta = 1000
    //zoom in
    zoom(element, delta * -1)
    cy.url().should('not.contain', z)

    //zoom out
    element = cy.get('#scene > div.widget-scene > canvas')
    zoom(element, delta)
    cy.url().should('include', z)
  })
})

describe('Take screen shot then detect label', () =>{
  
const detectTextLocation = (responseBody, inputText) =>{
  var temp = eval(responseBody)
  var input_split = inputText.split(' ')
  var result = []
  for(var i = 0 ; i < temp.length; i ++){
    var e = temp[i];
    if(e.label === input_split[0]){
      var count = 0
      for(var j = 0; j < input_split.length; j++){
        if(temp[i + j].label === input_split[j]){
          result.push(temp[i + j])
          count++
        }
      }
      if(count === input_split.length)
        break
      result = []
    }
  }
  var x, y
  if(result.length != 0){
    var delta = 5
    x = result[0].bounds[0].x + delta
    y = result[0].bounds[0].y + delta
  }
  return {'x':x, 'y':y}
}

  beforeEach(() =>{
    cy.viewport(1400,800)
    var url = 'https://www.google.com/maps/place/Marina+Bay+Sands/@1.2848704,103.8612561,18.75z/data=!4m15!1m6!3m5!1s0x31da1904937e1633:0x62099677b59fca76!2sGardens+by+the+Bay!8m2!3d1.2815683!4d103.8636132!3m7!1s0x31da19ee4cc09203:0x26c9afefa555dd7!5m2!4m1!1i2!8m2!3d1.2846765!4d103.8610115'
    cy.visit(url)
})

it('Take screen shot then clicked to detect label', ()=>{
  cy.viewport(1400,800)
  var now = new Date().getTime();
  cy.screenshot(""+now).wait(3000)
  var name = `${now}.png`
  cy.request('GET','http://localhost:4000/api/detectText?path='+name)
    .then((response) =>{
      expect(response.status).equal(200)
      var input = 'Fennel Café Active Garden'
      var position = detectTextLocation(response.body, input)

      var selector = '#pane > div > div.widget-pane-content.cYB2Ge-oHo7ed > div > div > div.x3AX1-LfntMc-header-title > div.x3AX1-LfntMc-header-title-ma6Yeb-haAclf > div.x3AX1-LfntMc-header-title-ij8cu > div:nth-child(1) > h1 > span:nth-child(1)'
      cy.get(selector).should('not.contain',input)
      cy.wait(5000)
      cy.get('#scene > div.widget-scene > canvas')
      .click(position.x, position.y)
        .wait(2000)
      cy.get(selector).should('have.text', input)
    })
})
})