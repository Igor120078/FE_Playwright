export class TestDataObjects {
  private testData = [
    {
      fullName: 'David Svoboda',
      phoneNumber: '+420605756378',
      zipCode: '14900',
      email: 'david_svoboda@email.cz',
      floorSquare: '160',
      heatLoss: '8',
      consumption: '8',
      regionName: 'Středočeský kraj',
      address: 'Slunečná 53, 25101 Herink',
      meetAsap: false,
      knowConsumption: false,
      knowHeatLoss: false,
    },
    {
      fullName: 'Karel Beneš',
      phoneNumber: '+420731740767',
      zipCode: '25101',
      email: 'karel_benes@seznam.cz',
      floorSquare: '200',
      heatLoss: '10',
      consumption: '12',
      regionName: 'Jihočeský kraj',
      address: 'Polní 247, 25101 Čestlice',
      meetAsap: true,
      knowConsumption: true,
      knowHeatLoss: true,
    },
    {
      fullName: 'Pavel Novák',
      phoneNumber: '+420731859624',
      zipCode: '62500',
      email: 'pavel_novak@post.cz',
      floorSquare: '180',
      heatLoss: '9',
      consumption: '10',
      regionName: 'Liberecký kraj',
      address: 'Luční 1240, 27343 Buštěhrad',
      meetAsap: false,
      knowConsumption: false,
      knowHeatLoss: false,
    },
    {
      fullName: 'Marek Pokorný',
      phoneNumber: '+420732708530',
      zipCode: '46311',
      email: 'marek_pokorny@email.cz',
      floorSquare: '150',
      heatLoss: '8',
      consumption: '7',
      regionName: 'Středočeský kraj',
      address: 'Vilová II 242, 252 42 Vestec',
      meetAsap: false,
      knowConsumption: false,
      knowHeatLoss: false,
    },
  ]

  getTestData() {
    let i = Math.floor(Math.random() * this.testData.length)
    return this.testData[i]
  }
}
