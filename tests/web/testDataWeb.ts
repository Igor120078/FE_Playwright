import { DataFactory } from '../../src/dataGenerator/factory/dataFactory'
import { Country } from '../../src/dto/country'

export default [
  {
    fullName: 'David Svoboda',

    phoneNumber: DataFactory.phoneNumberCZ()
      .setCountryPrefix()
      .usePrefixSeparator(false)
      .useBrackets(false)
      .useLeadingPlusSign(true)
      .finishPrefixConfiguration()
      .setOperatorIdentifier(Country.CZ)
      .setSeparator('', [])
      .generate(),

    zipCode: DataFactory.zipCode().generate(),
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
    phoneNumber: DataFactory.phoneNumberCZ()
      .setCountryPrefix()
      .usePrefixSeparator(false)
      .useBrackets(false)
      .useLeadingPlusSign(true)
      .finishPrefixConfiguration()
      .setOperatorIdentifier(Country.CZ)
      .setSeparator('', [])
      .generate(),
    zipCode: DataFactory.zipCode().generate(),
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
    phoneNumber: DataFactory.phoneNumberCZ()
      .setCountryPrefix()
      .usePrefixSeparator(false)
      .useBrackets(false)
      .useLeadingPlusSign(true)
      .finishPrefixConfiguration()
      .setOperatorIdentifier(Country.CZ)
      .setSeparator('', [])
      .generate(),
    zipCode: DataFactory.zipCode().generate(),
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
    fullName: 'David Svoboda',
    phoneNumber: DataFactory.phoneNumberCZ()
      .setCountryPrefix()
      .usePrefixSeparator(false)
      .useBrackets(false)
      .useLeadingPlusSign(true)
      .finishPrefixConfiguration()
      .setOperatorIdentifier(Country.CZ)
      .setSeparator('', [])
      .generate(),
    zipCode: DataFactory.zipCode().generate(),
    email: 'david_svoboda@email.cz',
    floorSquare: '150',
    heatLoss: '8',
    consumption: '7',
    regionName: 'Středočeský kraj',
    address: 'Slunečná 53, 25101 Herink',
    meetAsap: false,
    knowConsumption: false,
    knowHeatLoss: false,
  },
]
